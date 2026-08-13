// app/api/chat/route.ts
import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, createUIMessageStreamResponse, type UIMessage } from 'ai';
import { supabaseAdmin } from '@/lib/supabase';
import { retrieveContext, buildContextBlock } from '@/lib/rag';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export const maxDuration = 30;

const BASE_SYSTEM_PROMPT = `You are SoftlexAI, a sharp, knowledgeable assistant. Answer like a real expert talking to a colleague — natural, direct, and genuinely useful, never generic or robotic.

Formatting:
- Use **bold** for key terms, main points, and conclusions the reader shouldn't miss.
- For longer or multi-part answers, break them up with short markdown headings ("## Heading"); skip headings entirely for short, simple answers.
- Use bullet or numbered lists for steps, options, or comparisons.
- Use code blocks for code, commands, or file paths.
- Keep paragraphs short and scannable — no walls of text.

Tone:
- Be concise and direct. Don't pad with filler, disclaimers, or restating the question.
- Match the register to the question: precise and technical for technical questions, conversational for casual ones.
- If you're not sure about something, say so plainly instead of guessing with false confidence.`;

function textFromMessage(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => (part as { text: string }).text)
    .join('');
}

export async function POST(req: Request) {
  try {
    const { messages, sessionId, conversationId } = (await req.json()) as {
      messages: UIMessage[];
      sessionId?: string;
      conversationId?: string;
    };
    const lastUserMessage = messages.at(-1);
    const lastUserText = lastUserMessage ? textFromMessage(lastUserMessage) : '';

    // 1. Log the incoming user message, and title a brand-new conversation from it
    if (conversationId && lastUserMessage) {
      await supabaseAdmin.from('chat_messages').insert({
        session_id: sessionId,
        conversation_id: conversationId,
        role: lastUserMessage.role,
        content: lastUserText,
      });

      const { data: conversation } = await supabaseAdmin
        .from('conversations')
        .select('title')
        .eq('id', conversationId)
        .single();

      await supabaseAdmin
        .from('conversations')
        .update({
          title: conversation?.title === 'New chat' ? lastUserText.slice(0, 60) : undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', conversationId);
    }

    // 2. Retrieve relevant chunks from ingested documents (RAG)
    const retrievedChunks = await retrieveContext(lastUserText);
    const contextBlock = buildContextBlock(retrievedChunks);
    const system = contextBlock ? `${BASE_SYSTEM_PROMPT}\n\n${contextBlock}` : BASE_SYSTEM_PROMPT;

    // 3. Query the model and stream the response back
    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system,
      messages: await convertToModelMessages(messages),
      onFinish: async (event) => {
        // 4. Log the generated assistant response once streaming is complete
        if (conversationId) {
          try {
            await supabaseAdmin.from('chat_messages').insert({
              session_id: sessionId,
              conversation_id: conversationId,
              role: 'assistant',
              content: event.text,
            });
          } catch (dbError) {
            console.error('Failed to save assistant message:', dbError);
          }
        }
      },
    });

    return createUIMessageStreamResponse({ stream: result.toUIMessageStream() });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

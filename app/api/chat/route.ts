// app/api/chat/route.ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, convertToModelMessages, createUIMessageStreamResponse, type UIMessage } from 'ai';
import { supabaseAdmin } from '@/lib/supabase';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || '',
});

export const maxDuration = 30;

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
    const lastUserMessage = messages[messages.length - 1];

    // 1. Log the incoming user message, and title a brand-new conversation from it
    if (conversationId && lastUserMessage) {
      const text = textFromMessage(lastUserMessage);

      await supabaseAdmin.from('chat_messages').insert({
        session_id: sessionId,
        conversation_id: conversationId,
        role: lastUserMessage.role,
        content: text,
      });

      const { data: conversation } = await supabaseAdmin
        .from('conversations')
        .select('title')
        .eq('id', conversationId)
        .single();

      await supabaseAdmin
        .from('conversations')
        .update({
          title: conversation && conversation.title === 'New chat' ? text.slice(0, 60) : undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', conversationId);
    }

    // 2. Query the model and stream the response back
    const result = streamText({
      model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
      messages: await convertToModelMessages(messages),
      onFinish: async (event) => {
        // 3. Log the generated assistant response once streaming is complete
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

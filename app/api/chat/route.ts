// app/api/chat/route.ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { supabaseAdmin } from '@/lib/supabase';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || '',
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();
    const lastUserMessage = messages[messages.length - 1];

    // 1. Log the incoming user message to Supabase
    if (sessionId && lastUserMessage) {
      await supabaseAdmin.from('chat_messages').insert({
        session_id: sessionId,
        role: lastUserMessage.role,
        content: lastUserMessage.content,
      });
    }

    // 2. Query the model and stream the text back
    const result = streamText({
      model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
      messages,
      onFinish: async (event) => {
        // 3. Log the generated assistant response once streaming is complete
        if (sessionId) {
          await supabaseAdmin.from('chat_messages').insert({
            session_id: sessionId,
            role: 'assistant',
            content: event.text,
          });
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
    });
  }
}
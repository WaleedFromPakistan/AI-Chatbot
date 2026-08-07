// app/api/conversations/[id]/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [{ data: conversation, error: convError }, { data: messages, error: msgError }] = await Promise.all([
    supabaseAdmin.from('conversations').select('id, title, updated_at').eq('id', id).single(),
    supabaseAdmin
      .from('chat_messages')
      .select('id, role, content, created_at')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true }),
  ]);

  if (convError || !conversation) {
    return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
  }
  if (msgError) {
    console.error('Failed to load messages:', msgError);
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
  }

  return NextResponse.json({
    conversation,
    messages: (messages ?? []).map((m) => ({
      id: String(m.id),
      role: m.role as 'user' | 'assistant',
      parts: [{ type: 'text' as const, text: m.content as string }],
    })),
  });
}

// app/api/conversations/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get('sessionId');
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('conversations')
    .select('id, title, updated_at')
    .eq('session_id', sessionId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Failed to list conversations:', error);
    return NextResponse.json({ error: 'Failed to list conversations' }, { status: 500 });
  }

  return NextResponse.json({ conversations: data });
}

export async function POST(req: Request) {
  const { sessionId } = (await req.json()) as { sessionId?: string };
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('conversations')
    .insert({ session_id: sessionId, title: 'New chat' })
    .select('id, title, updated_at')
    .single();

  if (error) {
    console.error('Failed to create conversation:', error);
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
  }

  return NextResponse.json({ conversation: data });
}

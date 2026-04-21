export interface Env {
  GROQ_API_KEY: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    if (url.pathname === '/transcribe' && request.method === 'POST') {
      return handleTranscribe(request, env);
    }

    return new Response('Not Found', { status: 404, headers: CORS_HEADERS });
  },
};

async function handleTranscribe(request: Request, env: Env): Promise<Response> {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('file');

    if (!audioFile || !(audioFile instanceof File)) {
      return jsonResponse({ error: 'Missing audio file' }, 400);
    }

    const groqForm = new FormData();
    groqForm.append('file', audioFile);
    groqForm.append('model', 'whisper-large-v3-turbo');
    groqForm.append('language', 'zh');
    groqForm.append('response_format', 'json');

    const groqRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
      },
      body: groqForm,
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      const errMsg = (data as any)?.error?.message ?? 'Groq API error';
      return jsonResponse({ error: errMsg }, groqRes.status);
    }

    return jsonResponse(data, 200);
  } catch (err: any) {
    return jsonResponse({ error: err?.message ?? 'Internal server error' }, 500);
  }
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
    },
  });
}

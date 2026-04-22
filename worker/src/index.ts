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
    const incoming = await request.formData();
    const audioFile = incoming.get('file');

    if (!audioFile || !(audioFile instanceof File)) {
      return jsonResponse({ error: 'Missing audio file' }, 400);
    }

    // 重新组装发给 Groq 的 FormData，不手动设 Content-Type（让 fetch 自动带 boundary）
    const groqForm = new FormData();
    groqForm.append('file', audioFile, audioFile.name);
    groqForm.append('model', 'whisper-large-v3-turbo');
    groqForm.append('language', 'zh');
    groqForm.append('response_format', 'json');

    const groqRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
        // 不设 Content-Type，让 fetch 自动填写带 boundary 的 multipart/form-data
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

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
    // 直接读取原始二进制，绕过 formData() 解析 WebM 时可能损坏数据的问题
    const audioBuffer = await request.arrayBuffer();

    if (audioBuffer.byteLength === 0) {
      return jsonResponse({ error: 'Audio file is empty' }, 400);
    }

    // Content-Type 由前端设置（如 audio/webm），裁掉 codec 参数
    const rawMime = request.headers.get('Content-Type') || 'audio/webm';
    const baseMime = rawMime.split(';')[0].trim();

    const fileBlob = new Blob([audioBuffer], { type: baseMime });

    const groqForm = new FormData();
    groqForm.append('file', fileBlob, 'audio.webm');
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

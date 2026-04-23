const ASR_URL = 'https://penglisha-sensevoice-api.hf.space/api/v1/asr';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === 'POST' && new URL(request.url).pathname === '/transcribe') {
      try {
        const contentType = request.headers.get('Content-Type') || '';

        const asrResponse = await fetch(ASR_URL, {
          method: 'POST',
          headers: {
            'Content-Type': contentType,  // 原样透传，保留 boundary
          },
          body: request.body,             // 原样透传
        });

        const result = await asrResponse.json();
        if (!asrResponse.ok) {
          console.error('ASR error', asrResponse.status, JSON.stringify(result));
        }
        return new Response(JSON.stringify(result), {
          status: asrResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Env {}

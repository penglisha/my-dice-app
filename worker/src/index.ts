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
        // 直接透传 body 和 Content-Type（含 boundary），不做任何解析
        const contentType = request.headers.get('Content-Type') || '';

        const groqResponse = await fetch(
          'https://api.groq.com/openai/v1/audio/transcriptions',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.GROQ_API_KEY}`,
              'Content-Type': contentType,   // 原样透传，保留 boundary
            },
            body: request.body,              // 原样透传，不重新构建
          }
        );

        const result = await groqResponse.json();
        // 把 Groq 的原始状态码和错误一起返回，方便排查
        if (!groqResponse.ok) {
          console.error('Groq error', groqResponse.status, JSON.stringify(result));
        }
        return new Response(JSON.stringify(result), {
          status: groqResponse.status,
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

interface Env {
  GROQ_API_KEY: string;
}

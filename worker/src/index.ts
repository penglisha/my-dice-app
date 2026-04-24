export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/transcribe') {
      try {
        // 先把 body 完整读取为 ArrayBuffer，再转发
        const bodyBuffer = await request.arrayBuffer();
        const contentType = request.headers.get('Content-Type') || '';
    
        const hfResponse = await fetch(
          `${env.HF_SPACE_URL}/api/v1/asr`,
          {
            method: 'POST',
            headers: {
              'Content-Type': contentType,
            },
            body: bodyBuffer,  // 用 ArrayBuffer 而不是 request.body
          }
        );
    
        const result = await hfResponse.json() as { text?: string; error?: string };
    
        if (!hfResponse.ok) {
          return new Response(
            JSON.stringify({ error: result.error || 'HF Space 返回错误' }),
            { status: hfResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
    
        return new Response(
          JSON.stringify({ text: result.text || '' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    
      } catch (err) {
        return new Response(
          JSON.stringify({ error: String(err) }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response('Not Found', { status: 404 });
  },

  // 每20分钟 ping HF Space，防止免费版休眠
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
    await fetch(`${env.HF_SPACE_URL}/`).catch(() => {});
  },
};

interface Env {
  HF_SPACE_URL: string;
}

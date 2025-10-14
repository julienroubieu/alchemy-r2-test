import type { worker } from "../alchemy.run.ts";

function getHtmlPage(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Streaming Counter</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
    #counter { font-size: 18px; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>Streaming Counter</h1>
  <div id="counter">Starting...</div>
  <script>
    const eventSource = new EventSource(window.location.href + '?stream=1');
    eventSource.onmessage = function(event) {
      document.getElementById('counter').innerHTML = event.data;
    };
    eventSource.onerror = function() {
      eventSource.close();
    };
  </script>
</body>
</html>`;
}

function createCounterStream(maxCount: number = 60): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      for (let counter = 1; counter <= maxCount; counter++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const message = `data: Elapsed: ${counter}s\n\n`;
        controller.enqueue(encoder.encode(message));
      }
      controller.close();
    },
  });
}

function createHtmlResponse(html: string): Response {
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

function createSSEResponse(stream: ReadableStream): Response {
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

export default {
  async fetch(request: Request, env: typeof worker.Env, ctx: ExecutionContext): Promise<Response> {
    // Init remote R2 connection.
    await env.BUCKET.get("test.txt");

    const url = new URL(request.url);

    // Handle SSE stream request
    if (url.searchParams.has('stream')) {
      const stream = createCounterStream(60);
      return createSSEResponse(stream);
    }

    // Return HTML page
    const html = getHtmlPage();
    return createHtmlResponse(html);
  },
};

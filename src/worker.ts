import type { worker } from "../alchemy.run.ts";

export default {
  async fetch(request: Request, env: typeof worker.Env, ctx: ExecutionContext): Promise<Response> {
    const test = await env.BUCKET.get("test.txt");
    if (test) {
      const text = await test.text();
      return new Response(`Hello World, data from R2: ${text}`);
    }
    await env.BUCKET.put("test.txt", "Just testing");
    return new Response(`Created test.txt, reload to read it`);
  },
};

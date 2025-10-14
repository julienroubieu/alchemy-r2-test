import type { worker } from "../alchemy.run.ts";

export default {
  async fetch(request: Request, env: typeof worker.Env, ctx: ExecutionContext): Promise<Response> {
    await env.BUCKET.get("test.txt");
    return new Response("Connected to remote R2, wait ~30s to see the WS error in your terminal.");
  },
};

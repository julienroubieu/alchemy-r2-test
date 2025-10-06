/// <reference types="@types/node" />

import alchemy from "alchemy";
import { R2Bucket, Worker } from "alchemy/cloudflare";

const app = await alchemy("r2-test");

const bucket = await R2Bucket("test-bucket", {
  jurisdiction: "eu",
  dev: {
    remote: true,
  }
});
export const worker = await Worker("worker", {
  entrypoint: "src/worker.ts",
  bindings: {
    BUCKET: bucket,
  }
});

console.log(worker.url);

await app.finalize();

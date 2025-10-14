# r2-test

Minimal reproduction for a possible alchemy bug.

In local dev mode, establishing a remote connection to R2 causes a WS close error, killing the dev server.

```
Exiting...
/Users/me/dev/alchemy-r2-test/node_modules/ws/lib/sender.js:187
      throw new TypeError('First argument must be a valid error code number');
      ^

TypeError: First argument must be a valid error code number
    at Sender.close (/Users/me/dev/alchemy-r2-test/node_modules/ws/lib/sender.js:187:13)
    at WebSocket.close (/Users/me/dev/alchemy-r2-test/node_modules/ws/lib/websocket.js:315:18)
    at WebSocket.<anonymous> (/Users/me/dev/alchemy-r2-test/node_modules/alchemy/src/util/http.ts:74:49)
    at WebSocket.emit (node:events:508:28)
    at WebSocket.emitClose (/Users/me/dev/alchemy-r2-test/node_modules/ws/lib/websocket.js:272:10)
    at TLSSocket.socketOnClose (/Users/me/dev/alchemy-r2-test/node_modules/ws/lib/websocket.js:1341:15)
    at TLSSocket.emit (node:events:520:35)
    at node:net:346:12
    at TCP.done (node:_tls_wrap:649:7)

Node.js v24.6.0
```

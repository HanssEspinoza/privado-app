import { envs } from "./config";
import { Server } from "./server";

(() => {
  main();
})();

export function main() {
  new Server({
    port: envs.PORT,
  }).start();
}

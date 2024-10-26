import { envs } from "./config";
import { AppRoutes } from "./routes";
import { Server } from "./server";

(() => {
  main();
})();

export function main() {
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}

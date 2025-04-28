import "dotenv/config";
import { createApp } from "app";
import { sql } from "db/postgres";
import shutdown from "utils/shutdown";

async function init() {
  const port = Number(process.env.PORT) || 5000;
  const url = process.env.BASE_URL || "localhost";

  try {
    const app = createApp();

    const server = app.listen(port, () => {
      console.log(`Servidor escutando a porta http://${url}:${port}`);
    });

    const exitHandler = shutdown(server, sql, {
      coredump: false,
      timeout: 500,
    });

    process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
    process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
    process.on("SIGTERM", exitHandler(0, "SIGTERM"));
    process.on("SIGINT", exitHandler(0, "SIGINT"));
  } catch (error) {
    console.error(error);
  }
}

init();

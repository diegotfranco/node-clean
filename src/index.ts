import "dotenv/config";
import express from "express";

async function init() {
  const port = Number(process.env.PORT) || 5000;
  const url = process.env.BASE_URL || "localhost";

  try {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(port, () => {
      console.log(`Servidor escutando a porta http://${url}:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

init();

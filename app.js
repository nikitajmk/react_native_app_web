import "dotenv/config";
import Fastify from "fastify";
import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { buildAdminRouter } from "./src/config/setup.js";

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  const app = Fastify();

  await buildAdminRouter(app);
  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `Zippek Started on http://localhost:${PORT}${admin.options.rootPath}`
      );
    }
  });
};
start();

// database password
// ecomphoto2024
// 6NY1yTZSL9GZIG2v

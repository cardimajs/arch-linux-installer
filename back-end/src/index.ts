import fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";

import { preInstallUseCase } from "./use-cases/pre-install";
import { getHddInfoUseCase } from "./use-cases/get-hdd-indo";

const server = fastify();

server.register(fastifyStatic, {
  root: path.join(__dirname, "front"),
});

server.get("/hdd-info", async (request, reply) => {
  const response = await getHddInfoUseCase();
  return response;
});

server.get("/pre-install", async (request, reply) => {
  await preInstallUseCase();
  return {
    status: "done",
  };
});

const start = async () => {
  try {
    await server.listen(3000);
    console.log("Server running on port 3000");
  } catch (err) {
    process.exit(1);
  }
};

start();

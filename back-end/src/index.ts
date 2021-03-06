import fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";

import { preInstallUseCase } from "./use-cases/pre-install";
import { getHddInfoUseCase } from "./use-cases/get-hdd-indo";
import { eraseDiskAndInstallBtrfs } from "./use-cases/erase-disk-and-install-btrfs";
import { installArchUseCase } from "./use-cases/install-arch";
import { checkRequirementsUseCase } from "./use-cases/check-requirements";

const server = fastify();

server.register(fastifyStatic, {
  root: path.join(__dirname, "front"),
});

server.get("/requirements", async (request, reply) => {
  const data = await checkRequirementsUseCase();
  return data;
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

server.get<{ Params: { disk: string } }>(
  "/erase-disk-and-btrfs/:disk",
  async (request, reply) => {
    const disk = `/dev/${request.params.disk}`;

    await eraseDiskAndInstallBtrfs({
      disk,
      folderPath: "/mnt",
      isNvme: true,
    });
    return {
      status: "done",
    };
  }
);

server.get<{ Params: { path: string } }>(
  "/install-arch/:folder",
  async (request, reply) => {
    await installArchUseCase({});
    return {
      status: "done",
    };
  }
);

const start = async () => {
  try {
    await server.listen(5000, "::");
    console.log("Server running on port 5000");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();

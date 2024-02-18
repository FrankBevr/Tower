import { TaskExecutor } from "@golem-sdk/golem-js";
import { program } from "commander";
import { fileURLToPath } from "url";

const DIR_NAME = fileURLToPath(new URL(".", import.meta.url));

async function main(subnetTag: string, driver?: string, network?: string, maxParallelTasks?: number) {
  const executor = await TaskExecutor.create({
    subnetTag,
    payment: { driver, network },
    package: "golem/blender:latest",
    maxParallelTasks,
  });

  try {
    executor.onActivityReady(async (ctx) => {
      console.log("Uploading the scene to the provider %s", ctx.provider.name);
      await ctx.uploadFile(`${DIR_NAME}/cube.blend`, "/golem/work/cube.blend");
      await ctx.uploadFile(`${DIR_NAME}/exporter.py`, "/golem/work/exporter.py");
      await ctx.uploadFile(`${DIR_NAME}/tower.blend`, "/golem/work/tower.blend");
      await ctx.uploadFile(`${DIR_NAME}/tower_exporter.py`, "/golem/work/tower_exporter.py");
      console.log("Upload of the scene to the provider %s finished", ctx.provider.name);
    });

    await executor.run(async (ctx) => {
      await ctx
        .beginBatch()
        .run("blender -b -P /golem/work/exporter.py -- /golem/work/cube.blend")
        .downloadFile("/golem/work/output.glb", "./cube.glb")
        .run("blender -b -P /golem/work/tower_exporter.py -- /golem/work/tower.blend")
        .downloadFile("/golem/work/output.glb", "./tower.glb")
        .end();
      console.log("Finished downloading cube.glb and tower.glb");
    })
  } catch (error) {
    console.error("Computation failed:", error);
  } finally {
    await executor.shutdown();
  }
}

program
  .option("--subnet-tag <subnet>", "set subnet name, for example 'public'")
  .option("--payment-driver, --driver <driver>", "payment driver name, for example 'erc20'")
  .option("--payment-network, --network <network>", "network name, for example 'goerli'")
  .option("-t, --max-parallel-tasks <maxParallelTasks>", "max parallel tasks");
program.parse();
const options = program.opts();
main(options.subnetTag, options.driver, options.network, options.maxParallelTasks);

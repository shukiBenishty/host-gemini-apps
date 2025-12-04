// scripts/sync-ui.mjs
import path from "path";
import { fileURLToPath } from "url";
import { cp } from "fs/promises";
import { rename } from "fs/promises";

async function copyDirOverwrite(srcDir, destDir) {
  await cp(srcDir, destDir, {
    recursive: true,
    force: true,
    errorOnExist: false
  });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST_MOBILE_SRC = path.resolve(__dirname, "../mobile-ui");
const MOBILE_DST = path.resolve(__dirname, "../mobile-ui-module");


async function main() {
  await copyDirOverwrite(HOST_MOBILE_SRC, MOBILE_DST);
  
  await rename(
    path.join(MOBILE_DST, "manifest.json"),
    path.join(MOBILE_DST, "public/manifest.json")
  );

  console.log("✅ UI synced into mobile-ui-module");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

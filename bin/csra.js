#!/usr/bin/env node

import { execSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const argv = process.argv.slice(2)

let currentModulePath = fileURLToPath(import.meta.url);
let projectDir = dirname(currentModulePath);
currentModulePath = currentModulePath.replace(/\\/g, "/");
projectDir = projectDir.replace(/\\/g, "/");

projectDir = projectDir.replace(/\/bin$/, "");

let command = `node ${projectDir}/index.js ${argv.join(' ')}`;

console.log("command", command);

async function run() {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error("error", error);
  }
}

run();

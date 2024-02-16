#!/usr/bin/env node

import { program } from "commander";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";
import readline from "readline";
import fs from "fs";

const cmdReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const currentModulePath = fileURLToPath(import.meta.url);
let projectDir = dirname(currentModulePath);
projectDir = projectDir.replace(/\\/g, "/");

program
    .version("0.0.1")
    .description(
        "This is a program to build an entire express project with the provided commands. The project provides controllers, services, repositories and API consumption."
    );

program.option("-n, --name <name>", "Give a name.").option("-p, --path <path>", "Give the destination path.");

program
    .command("make")
    .description("This command creates a new csra project with the provided name.")
    .action(() => {
        let { name } = program.opts();
        if (!name) {
            console.warn("You must provide a name for the project. Use the -n or --name option.");
            console.log("Project not built successfully!");
            return;
        }
        make(name);
    });

program
    .command("makeEntity")
    .description("This command creates a new entity with the provided name.")
    .action(async () => {
        let { name, path } = program.opts();
        if (!name) {
            console.warn("You must provide a name for the entity. Use the -n or --name option.");
            console.log("Entity not built successfully!");
            return;
        }
        if (!path) {
            console.warn("You must provide a path for the entity. Use the -p or --path option.");
            console.log("Entity not built successfully!");
            return;
        }
        makeModel(path, name);
    });

program.parse(process.argv);

// Functions

function make(name) {
    fs.mkdir(name, (err) => {
        if (err) {
            console.error(`Error creating directory: ${err}`);
            console.log("Project not built successfully!");
            process.exit(1);
        } 
    });

    console.log(`${projectDir}/${name}`);

    const npmInitCommand = `npm init --directory=${projectDir}/${name}`;
    const childProcess = exec(npmInitCommand);

    childProcess.stdout.on("data", (data) => {
        console.log(`Standard output: ${data}`);
    });

    childProcess.stderr.on("data", (data) => {
        console.error(`Error output: ${data}`);
    });

    childProcess.on("close", (code) => {
        console.log(`npm init command completed with exit code ${code}`);
    });
}

function makeModel(path, name) {
    console.log("Building a new entity...");

    path = path.replace(/\\/g, "/");
    path = path.replace("./", "");
    const dirPath = `${projectDir}/${path}`;

    fs.stat(dirPath, (err, stats) => {
        if (err) {
            console.error("Path doesn't exists.");
            console.log("Entity not built successfully!");
            process.exit(1);
        } else {
            if (stats.isFile()) {
                console.warn("Path must be a directory, not a file.");
                console.log("Entity not built successfully!");
                process.exit(1);
            }

            const entityName = name.toLowerCase();
            const enntityNameFistLetterUpper = entityName[0].toUpperCase() + entityName.slice(1);

            let ModelController = fs.readFileSync(`${projectDir}/src/app/domains/model/modelController.js`, "utf-8");
            let ModelService = fs.readFileSync(`${projectDir}/src/app/domains/model/modelService.js`, "utf-8");
            let ModelRepository = fs.readFileSync(`${projectDir}/src/app/domains/model/modelRepository.js`, "utf-8");
            let ModelApiConsumer = fs.readFileSync(`${projectDir}/src/app/domains/model/modelApiConsumer.js`, "utf-8");
            let modelRoutes = fs.readFileSync(`${projectDir}/src/app/domains/model/modelRoutes.js`, "utf-8");

            ModelController = ModelController.replace(/Model/g, enntityNameFistLetterUpper);
            ModelController = ModelController.replace(/model/g, entityName.toLowerCase());

            ModelService = ModelService.replace(/Model/g, enntityNameFistLetterUpper);
            ModelService = ModelService.replace(/model/g, entityName.toLowerCase());

            ModelRepository = ModelRepository.replace(/Model/g, enntityNameFistLetterUpper);
            ModelRepository = ModelRepository.replace(/model/g, entityName.toLowerCase());

            ModelApiConsumer = ModelApiConsumer.replace(/Model/g, enntityNameFistLetterUpper);
            ModelApiConsumer = ModelApiConsumer.replace(/model/g, entityName.toLowerCase());

            modelRoutes = modelRoutes.replace(/Model/g, enntityNameFistLetterUpper);
            modelRoutes = modelRoutes.replace(/model/g, entityName.toLowerCase());

            const models = {
                ModelController,
                ModelService,
                ModelRepository,
                ModelApiConsumer,
                modelRoutes,
            };

            const entityDir = `${dirPath}/${entityName}`;
            console.log("EntityDir:", entityDir);

            if (!fs.existsSync(entityDir)) {
                fs.mkdirSync(entityDir);
                createModelFiles(entityDir, entityName, models);
                console.log("Entity built successfully!");
                process.exit(0);
            } else {
                cmdReadline.question("The entity already exists. Do you want to overwrite it? (y/n) ", (answer) => {
                    if (answer === "y") {
                        createModelFiles(entityDir, entityName, models);
                        console.log("Entity built successfully!");
                        cmdReadline.close();
                    } else {
                        console.log("Process aborted!");
                        cmdReadline.close();
                        process.exit(1);
                    }
                });
            }
        }
    });
}

function createModelFiles(entityDir, entityName, model) {
    const { ModelController, ModelService, ModelRepository, ModelApiConsumer, modelRoutes } = model;

    fs.writeFileSync(`${entityDir}/${entityName}Controller.js`, ModelController);
    fs.writeFileSync(`${entityDir}/${entityName}Service.js`, ModelService);
    fs.writeFileSync(`${entityDir}/${entityName}Repository.js`, ModelRepository);
    fs.writeFileSync(`${entityDir}/${entityName}ApiConsumer.js`, ModelApiConsumer);
    fs.writeFileSync(`${entityDir}/${entityName}Routes.js`, modelRoutes);
}

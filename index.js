#!/usr/bin/env node

import { program } from "commander";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";
import readline from "readline";
import fsExtra from "fs-extra";
import fs from "fs";

const yesAnswer = ["y", "Y", "yes", "Yes"];
const noAnswer = ["n", "N", "no", "No"];

const cmdReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let currentModulePath = fileURLToPath(import.meta.url);
let currentWorkingDirectory = process.cwd();
let projectDir = dirname(currentModulePath);
currentModulePath = currentModulePath.replace(/\\/g, "/");
currentWorkingDirectory = currentWorkingDirectory.replace(/\\/g, "/");
projectDir = projectDir.replace(/\\/g, "/");

console.log("Current module path: ", currentModulePath);
console.log("Current working directory: ", currentWorkingDirectory);
console.log("Project directory: ", projectDir);

program
    .version("0.0.1")
    .description(
        "This is a program to build an entire express project with the provided commands. The project provides controllers, services, repositories and API consumption."
    );

program
    .option("-n, --name <name>", "Give a name.")
    .option("-p, --path <path>", "Give the destination path.")
    .option("-t, --type <type>", "Give the type of the feature.");

program
    .command("make")
    .description("This command creates a new csra project with the provided name.")
    .action(() => {
        let { name } = program.opts();
        if (!name) {
            console.warn("You must provide a name for the project. Use the -n or --name option.");
            console.log("Project not built successfully!");
            process.exit(0);
        }
        make(name);
    });

program
    .command("makeEntity")
    .description("This command creates a new entity with the provided name.")
    .action(async () => {
        let { name } = program.opts();
        if (!name) {
            console.warn("You must provide a name for the entity. Use the -n or --name option.");
            console.log("Entity not built successfully!");
            process.exit(0);
        }

        makeModel({ path: null, name });
    });

const featureTypes = ["jwtAuth"];

program
    .command("insert")
    .description("This command inserts many optional features into the API.")
    .action(async () => {
        let { type } = program.opts();
        if (!type) {
            console.warn("You must provide the feature type. Use the -t or --type option.");
            console.log("Entity not built successfully!");
            process.exit(0);
        }
        if (!featureTypes.includes(type)) {
            console.warn("Invalid feature type.");
            console.log(`Available feature types: \n${featureTypes.join("\n")}`);
            console.log("Entity not built successfully!");
            process.exit(0);
        }
        insertFeature({ type });
    });

program.parse(process.argv);

// Functions

function insertFeature({ type }) {
    switch (type) {
        case "jwtAuth":
            insertJwtAuth();
            break;
        default:
            console.warn("Invalid feature type.");
            console.log(`Available feature types: \n${featureTypes.join("\n")}`);
            console.log("Entity not built successfully!");
            process.exit(0);
    }
}

function insertJwtAuth() {
    console.log("Inserting feature...");

    //Check if the project has the jwtAuth feature
    const jwtAuthDir = `${currentWorkingDirectory}/src/app/domains/login`;
    if (fs.existsSync(jwtAuthDir)) {
        console.warn("The jwtAuth feature already exists.");
        cmdReadline.question("Do you want to overwrite it? (y/n) ", (answer) => {
            if (noAnswer.includes(answer)) {
                console.log("Process aborted!");
                cmdReadline.close();
                process.exit(0);
            }
            cmdReadline.question(
                "This will overwrite the jwtAuth feature files and all code you may have written. Do you want to continue? (y/n) ",
                async (answer) => {
                    if (noAnswer.includes(answer)) {
                        console.log("Process aborted!");
                        cmdReadline.close();
                        process.exit(0);
                    }
                    fs.rmdirSync(jwtAuthDir, { recursive: true });
                    const jwtAuthClassPath = `${projectDir}/src/app/shared/classes/JwtAuth.js`;
                    const AuthMiddlewarePath = `${projectDir}/src/app/shared/middlewares/AuthMiddleware.js`;
                    if (fs.existsSync(jwtAuthClassPath)) {
                        try {
                            fs.unlinkSync(jwtAuthClassPath);
                        } catch (error) {
                            console.error(`Error deleting file: ${error.message}`);
                        }
                    }
                    if (fs.existsSync(AuthMiddlewarePath)) {
                        try {
                            fs.unlinkSync(AuthMiddlewarePath);
                        } catch (error) {
                            console.error(`Error deleting file: ${error.message}`);
                        }
                    }
                    insertJwtAuthFiles();
                    cmdReadline.close();
                    process.exit(0);
                }
            );
        });
    } else {
        insertJwtAuthFiles();
        cmdReadline.close();
        process.exit(0);
    }
}

function insertJwtAuthFiles() {
    const sourceDirectory = `${projectDir}/optionals/auth/jwt/login`;
    const destinationDirectory = `${currentWorkingDirectory}/src/app/domains/login`;

    try {
        fsExtra.copySync(sourceDirectory, destinationDirectory);
    } catch (error) {
        fs.rmdirSync(`${destinationDirectory}`, { recursive: true });
        console.error(`Error copying files: ${err}`);
        console.log("Project not built successfully!");
        process.exit(0);
    }

    const jwtAuthClassFile = `${projectDir}/optionals/auth/jwt/JwtAuth.js`;
    const AuthMiddlewareFile = `${projectDir}/optionals/auth/jwt/AuthMiddleware.js`;

    const jwtAuthClassDestination = `${currentWorkingDirectory}/src/app/shared/classes/JwtAuth.js`;
    const AuthMiddlewareDestination = `${currentWorkingDirectory}/src/app/shared/middlewares/AuthMiddleware.js`;

    try {
        fsExtra.copyFileSync(jwtAuthClassFile, jwtAuthClassDestination);
    } catch (error) {
        fs.rmdirSync(`${destinationDirectory}`, { recursive: true });
        console.error(`Error copying files: ${err}`);
        console.log("Project not built successfully!");
        process.exit(0);
    }

    try {
        fsExtra.copyFileSync(AuthMiddlewareFile, AuthMiddlewareDestination);
    } catch (error) {
        fs.rmdirSync(`${destinationDirectory}`, { recursive: true });
        fs.unlinkSync(jwtAuthClassDestination);
        console.error(`Error copying files: ${err}`);
        console.log("Project not built successfully!");
        process.exit(0);
    }
    if (createModelRoute({ name: "login" })) {
        console.log("Route built successfully!");
    } else {
        console.log("Route not built successfully!");
    }

    const command = `npm install jsonwebtoken`;

    console.log("Installing dependencies...");
    try {
        execSync(command, { cwd: `${currentWorkingDirectory}`, stdio: "inherit" });
        console.log("Dependencies installed successfully.");
    } catch (error) {
        console.error(`Error installing dependencies: ${error.message}`);
    }

    console.log("jwtAuth feature inserted successfully!");
    cmdReadline.close();
    process.exit(0);
}

function make(name) {
    if (fs.existsSync(`${currentWorkingDirectory}/${name}`)) {
        cmdReadline.question("The project already exists. Do you want to overwrite it? (y/n) ", (answer) => {
            if (!yesAnswer.includes(answer)) {
                console.log("Process aborted!");
                cmdReadline.close();
                process.exit(0);
            } else {
                fs.rmdirSync(`${currentWorkingDirectory}/${name}`, { recursive: true });
                createProject(name);
            }
        });
    } else {
        createProject(name);
    }
}

async function createProject(name) {
    fs.mkdir(name, (err) => {
        if (err) {
            console.error(`Error creating directory: ${err}`);
            console.log("Project not built successfully!");
            process.exit(0);
        }
    });

    let sourceDirectory = `${projectDir}/src`;
    let destinationDirectory = `${currentWorkingDirectory}/${name}/src`;

    await fsExtra.copy(sourceDirectory, destinationDirectory).catch((err) => {
        fs.rmdirSync(`${currentWorkingDirectory}/${name}`, { recursive: true });
        console.error(`Error copying files: ${err}`);
        console.log("Project not built successfully!");
        process.exit(0);
    });

    let sourceFile = `${projectDir}/.env`;
    destinationDirectory = `${currentWorkingDirectory}/${name}/.env`;

    await fsExtra.copy(sourceFile, destinationDirectory).catch((err) => {
        fs.rmdirSync(`${currentWorkingDirectory}/${name}`, { recursive: true });
        console.error(`Error copying files: ${err}`);
        console.log("Project not built successfully!");
        process.exit(0);
    });

    let command = "npm init";

    try {
        execSync(command, { cwd: `${currentWorkingDirectory}/${name}`, stdio: "inherit" });
        console.log("Project initialized successfully.");
    } catch (error) {
        console.error(`Error initializing project: ${error.message}`);
    }

    const dependencies = ["express", "dotenv", "express-async-errors", "cors"];
    const devDependencies = ["nodemon"];
    const dependenciesAsString = dependencies.join(" ");
    const devDependenciesAsString = devDependencies.join(" ");

    command = `npm install ${dependenciesAsString}`;

    console.log("Installing dependencies...");

    try {
        execSync(command, { cwd: `${currentWorkingDirectory}/${name}`, stdio: "inherit" });
        console.log("Dependencies installed successfully.");
    } catch (error) {
        console.error(`Error installing dependencies: ${error.message}`);
    }

    console.log("Installing dev dependencies...");

    command = `npm install ${devDependenciesAsString} --save-dev`;

    try {
        execSync(command, { cwd: `${currentWorkingDirectory}/${name}`, stdio: "inherit" });
        console.log("Dev dependencies installed successfully.");
    } catch (error) {
        console.error(`Error installing dev dependencies: ${error.message}`);
    }

    let packajeJson = fs.readFileSync(`${currentWorkingDirectory}/${name}/package.json`, "utf-8");

    packajeJson = JSON.parse(packajeJson);
    packajeJson.type = "module";
    delete packajeJson.test;
    packajeJson.scripts.dev = "nodemon ./src/app.js";
    packajeJson.scripts.start = "node ./src/app.js";
    packajeJson = JSON.stringify(packajeJson);

    fs.writeFileSync(`${currentWorkingDirectory}/${name}/package.json`, packajeJson);

    cmdReadline.close();
    process.exit(0);
}

function makeModel({ path, name }) {
    console.log("Building a new entity...");

    if (!path) {
        path = "./src/app/domains";
    }

    path = path.replace(/\\/g, "/");
    path = path.replace("./", "");
    const dirPath = `${currentWorkingDirectory}/${path}`;

    fs.stat(dirPath, (err, stats) => {
        if (err) {
            console.error("Path doesn't exists.");
            console.log("Entity not built successfully!");
            process.exit(0);
        } else {
            if (stats.isFile()) {
                console.warn("Path must be a directory, not a file.");
                console.log("Entity not built successfully!");
                process.exit(0);
            }

            const entityName = name.toLowerCase();
            const enntityNameFistLetterUpper = entityName[0].toUpperCase() + entityName.slice(1);

            let ModelController = fs.readFileSync(`${projectDir}/src/app/domains/model/ModelController.js`, "utf-8");
            let ModelService = fs.readFileSync(`${projectDir}/src/app/domains/model/ModelService.js`, "utf-8");
            let ModelRepository = fs.readFileSync(`${projectDir}/src/app/domains/model/ModelRepository.js`, "utf-8");
            let ModelApiConsumer = fs.readFileSync(`${projectDir}/src/app/domains/model/ModelApiConsumer.js`, "utf-8");
            let ModelRoutes = fs.readFileSync(`${projectDir}/src/app/domains/model/ModelRoutes.js`, "utf-8");

            ModelController = ModelController.replace(/Model/g, enntityNameFistLetterUpper);
            ModelController = ModelController.replace(/model/g, entityName.toLowerCase());

            ModelService = ModelService.replace(/Model/g, enntityNameFistLetterUpper);
            ModelService = ModelService.replace(/model/g, entityName.toLowerCase());

            ModelRepository = ModelRepository.replace(/Model/g, enntityNameFistLetterUpper);
            ModelRepository = ModelRepository.replace(/model/g, entityName.toLowerCase());

            ModelApiConsumer = ModelApiConsumer.replace(/Model/g, enntityNameFistLetterUpper);
            ModelApiConsumer = ModelApiConsumer.replace(/model/g, entityName.toLowerCase());

            ModelRoutes = ModelRoutes.replace(/Model/g, enntityNameFistLetterUpper);
            ModelRoutes = ModelRoutes.replace(/model/g, entityName.toLowerCase());

            const models = {
                ModelController,
                ModelService,
                ModelRepository,
                ModelApiConsumer,
                ModelRoutes,
            };

            const entityDir = `${dirPath}/${entityName}`;

            if (!fs.existsSync(entityDir)) {
                fs.mkdirSync(entityDir);
                console.log("Entity built successfully!");
                createModelFiles(entityDir, enntityNameFistLetterUpper, models);
            } else {
                cmdReadline.question("The entity already exists. Do you want to overwrite it? (y/n) ", (answer) => {
                    if (answer === "y") {
                        console.log("Entity built successfully!");
                        createModelFiles(entityDir, enntityNameFistLetterUpper, models);
                    } else {
                        console.log("Process aborted!");
                        cmdReadline.close();
                        process.exit(0);
                    }
                });
            }
        }
    });
}

function createModelFiles(entityDir, entityName, model) {
    const { ModelController, ModelService, ModelRepository, ModelApiConsumer, ModelRoutes } = model;

    fs.writeFileSync(`${entityDir}/${entityName}Controller.js`, ModelController);
    fs.writeFileSync(`${entityDir}/${entityName}Service.js`, ModelService);
    fs.writeFileSync(`${entityDir}/${entityName}Repository.js`, ModelRepository);
    fs.writeFileSync(`${entityDir}/${entityName}ApiConsumer.js`, ModelApiConsumer);
    fs.writeFileSync(`${entityDir}/${entityName}Routes.js`, ModelRoutes);

    cmdReadline.question("Do you want to create a route for this entity? (y/n) ", (answer) => {
        if (!noAnswer.includes(answer)) {
            const routeCreated = createModelRoute({ name: entityName });
            if (routeCreated) {
                console.log("Route built successfully!");
            } else {
                console.log("Route not built successfully!");
            }
        }
        cmdReadline.close();
        process.exit(0);
    });
}

function createModelRoute({ name }) {
    name = name.toLowerCase();
    let nameFirtsLetterUpper = name[0].toUpperCase() + name.slice(1);
    const path = `./domains/${name}/${nameFirtsLetterUpper}Routes.js`;
    let routesFile = fs.readFileSync(`${currentWorkingDirectory}/src/app/routes.js`, "utf-8");

    console.log(routesFile);
    //create route on last line
    let lines = routesFile.split("\n");
    const newRoute = `routes.use("/${name}", ${name}Routes);`;
    lines.push(newRoute);

    const importLine = `import { ${name}Routes } from "${path}";`;
    lines.unshift(importLine);

    routesFile = lines.join("\n");

    try {
        fs.writeFileSync(`${currentWorkingDirectory}/src/app/routes.js`, routesFile);
        return true;
    } catch (error) {
        console.error(`Error creating route: ${error.message}`);
        return false;
    }
}

function removeRoute({ name }) {
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        let nameFirtsLetterUpper = name[0].toUpperCase() + name.slice(1);
        const path = `./domains/${name}/${nameFirtsLetterUpper}Routes.js`;
        let routesFile = fs.readFileSync(`${currentWorkingDirectory}/src/app/routes.js`, "utf-8");

        let lines = routesFile.split("\n");

        let newLines = [];

        for (let i = 0; i < lines.length; i++) {
            if (!lines[i].includes(name)) {
                newLines.push(lines[i]);
            } else {
                console.log(lines[i])

            }
        }

        const newRoute = `routes.use("/${name}", ${name}Routes);`;
        newLines.push(newRoute);

        const importLine = `import { ${name}Routes } from "${path}";`;
        newLines.unshift(importLine);

        routesFile = newLines.join("\n");

        try {
            fs.writeFileSync(`${currentWorkingDirectory}/src/app/routes.js`, routesFile);
            resolve(true);
        } catch (error) {
            console.error(`Error removing route: ${error.message}`);
            reject(false);
        }
    });
}

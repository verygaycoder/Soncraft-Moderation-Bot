// ** IMPORTS ** // 

import { readdirSync } from "fs";
import { Collection } from "discord.js";
import { resolve } from "path";

// ** Main Code ** //

async function load(client, commandDir) {

if(!client || !commandDir) throw new Error("You need to include the client and directory as paramaters to load a command!");

if(client.commands === undefined) {
    client.commands = new Collection(); // Creates command collection
    client.rootCMDDir = commandDir; // Saves root directory for later
}

const files = readdirSync(resolve(commandDir)); // Reads command files from the directory

files.forEach(async file => { // Loops over files found
    
    if(!file.endsWith("js")) { // If the file dosent end in .js (Meaning it is a folder)

        const dirFiles = readdirSync(resolve(`${commandDir}/${file}`));
        dirFiles.forEach(async dirFile => {

            const fileImports = await import(resolve(`${client.rootCMDDir}/${file}/${dirFile}`)); // Imports the command file
            if(!fileImports || !fileImports.default) return; // If the command has no default exports, return
        
            if(!fileImports.default.name) fileImports.default.name = dirFile.slice(0, -3); // If a command name is not set, use the file name
        
            return client.commands.set(fileImports.default.name, fileImports.default); // Adds this command to the collection

        })
        
        return;

    }
    const fileImports = await import(resolve(`${client.rootCMDDir}/${file}`)); // Imports the command file
    if(!fileImports || !fileImports.default) return; // If the command has no default exports, return

    if(!fileImports.default.name) fileImports.default.name = file.slice(0, -3); // If a command name is not set, use the file name

    client.commands.set(fileImports.default.name, fileImports.default); // Adds this command to the collection

})

client.rootCMDDir = undefined;

};

export default load;
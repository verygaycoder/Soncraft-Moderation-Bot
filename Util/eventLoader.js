// ** IMPORTS ** // 

import { readdirSync } from "fs";
import { Collection } from "discord.js";
import { resolve } from "path";

// ** Main Code ** //

async function load(client, eventDir) {

if(!client || !eventDir) throw new Error("You need to include the client and directory as paramaters to load an event!");

if(!client.events) {
    client.events = new Collection(); // Creates command collection
    client.rootEVENTDir = eventDir; // Saves root directory for later
}

const files = readdirSync(resolve(eventDir)); // Reads event files from the directory

files.forEach(async file => { // Loops over files found
    
    if(!file.endsWith("js")) return;

    const fileImports = await import(resolve(`${client.rootEVENTDir}/${file}`)); // Imports the event file
    if(!fileImports || !fileImports.default) return; // If the event has no default exports, return

    if(!fileImports.default.name) fileImports.default.name = file.slice(0, -3); // If a event name is not set, use the file name

    client.on(fileImports.default.name, (...args) => fileImports.default.execute(...args, client))

})

client.rootEVENTDir = undefined;

};

export default load;
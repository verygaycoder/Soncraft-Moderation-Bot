// ** IMPORTS ** // 

import { Client, Constants, Intents } from "discord.js";
import commandLoader from "./Util/commandLoader.js";
import eventLoader from "./Util/eventLoader.js";
const config = await import("./config.js");

// ** Main Code ** //

const client = new Client({intents: Object.values(Intents.FLAGS), partials: Object.values(Constants.PartialTypes)}); // Initialises a new discord.js client
client.config = config.default;

commandLoader(client, "commands") // Loads commands from the specified folder
eventLoader(client, "events") // Loads events from the specified folder

client.login(client.config.token) // Logs in to your bot using the specified token
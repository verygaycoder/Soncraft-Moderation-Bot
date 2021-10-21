// ** IMPORTS ** //

// ** Main Code ** //

export default {
    name: "",
    description: "Shows you the latency of me and the API",
    aliases: ["p"],
    permissions: [],
    guildOnly: false,
    ownerOnly: false,
    botOwnerOnly: false,
    execute: async (message, args, client) => {

        message.reply('I wanna play tennis instead...').then (async (msg) =>{
            msg.edit(`🏓 Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
          })

    }
}
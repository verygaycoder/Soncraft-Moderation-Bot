// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';

// ** Main Code ** //

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export default {
    name: "help",
    description: "Gives you a list of my commands",
    usage: "<command>",
    aliases: [],
    permissions: [],
    guildOnly: false,
    ownerOnly: false,
    botOwnerOnly: false,
    execute: async (message, args, client) => {

        let embed;
        const prefix = client.config.prefix;
        const commands = client.commands.map(cmd => {return {name: capitalizeFirstLetter(cmd.name), content:`Name: ${capitalizeFirstLetter(cmd.name)} \nDescription: ${cmd.description ? cmd.description : "No description!"} \nUsage: ${prefix}${cmd.name} ${cmd.usage ? cmd.usage : ""} \n${cmd.aliases.length ? `Aliases: ${cmd.aliases.map(a => a).join(", ")}\n` : ""} \nPermissions: ${cmd.permissions.length ? `${cmd.permissions.map(a => a).join(",")}` : "None required!"} \nCan be used in DM: ${cmd.guildOnly ? "No" : "Yes"} \nServer Owner Only: ${cmd.ownerOnly ? "Yes" : "No"} \nBot Owner Only: ${cmd.botOwnerOnly ? "Yes" : "No"}`}});

        embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('Here\'s a list of my commands!')
        .addField(`Use ${prefix}help <command> to see more info about a specific command!`, `\`\`\`${commands.map(c => c.name).join("\n")}\`\`\``)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(!args.length) return message.reply({embeds: [embed]});

        let cmd = commands.find(c => c.name.toLowerCase() == args[0]);

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('That isn\'t one of my commands!')
        .setDescription(`Use the help command like this \`${prefix}help\` to get a list of available commands`)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(!cmd) return message.reply({embeds: [embed]});

        embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`Info for ${cmd.name}`)
        .setDescription(`\`\`\`${cmd.content}\`\`\``)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        return message.reply({embeds: [embed]});

    }
}
// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';

// ** Main Code ** //

export default {
    name: "ban",
    description: "Bans a member from the server",
    usage: "<user> {reason}",
    aliases: ["b", "banish"],
    permissions: ["BAN_MEMBERS"],
    guildOnly: true,
    ownerOnly: false,
    botOwnerOnly: false,
    execute: async (message, args, client) => {

        const userID = message.mentions.users.first()?.id || args[0];
        let embed;

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('That isn\'t a user!')
        .setDescription("Try tagging the user or using their ID")
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(!userID) return message.reply({embeds: [embed]});

        const user = await client.users.fetch(userID, {force: true});
        args.shift();

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('I couldn\'t find that user!')
        .setDescription("Try tagging the user or using their ID")
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(!user) return message.reply({embeds: [embed]});

        let reason = args.length ? args.join(" ") : "No reason specified!";

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`You have been banned from ${message.guild.name}`)
        .addField("Reason", reason)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();
        
        user.send({embeds: [embed]}).catch(() => {});

        message.guild.members.ban(userID, {reason: reason, days: 7})
        .then(() => {
            embed = new MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setTitle(`${user} has been banned!`)
            .addField("Reason", reason)
            .setFooter(client.user.tag, client.user.avatarURL())
            .setTimestamp();
            
            message.reply({embeds: [embed]});

            embed.addField("Banned By", `${message.author}`)
            client.config.logChannel.send({embeds: [embed]})
        })
        .catch(e => {
            let err = e.toString().includes("Permissions") ? "I don't have permission to ban this member!" : `Error: ${e}`;
            embed = new MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setTitle('I couldn\'t ban that member!')
            .setDescription(err)
            .setFooter(client.user.tag, client.user.avatarURL())
            .setTimestamp();
            
            return message.reply({embeds: [embed]})
        });
    }
}
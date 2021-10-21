// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';

// ** Main Code ** //

export default {
    name: "kick",
    description: "Kicks a member from the server",
    usage: "<user> {reason}",
    aliases: ["b", "begone"],
    permissions: ["KICK_MEMBERS"],
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

        const member = await message.guild.members.fetch(userID, {force: true});
        args.shift();

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('I couldn\'t find that member!')
        .setDescription("Try tagging the member or using their ID")
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(!member) return message.reply({embeds: [embed]});

        let reason = args.length ? args.join(" ") : "No reason specified!";

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`You have been kicked from ${message.guild.name}`)
        .addField("Reason", reason)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();
        
        member.user.send({embeds: [embed]}).catch(() => {});

        member.kick(reason)
        .then(() => {
            embed = new MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setTitle(`${member.user.tag} has been kicked!`)
            .addField("Reason", reason)
            .setFooter(client.user.tag, client.user.avatarURL())
            .setTimestamp();
            
            message.reply({embeds: [embed]});
            embed.addField("Kicked By", `${message.author}`)
            client.config.logChannel.send({embeds: [embed]})
        })
        .catch(e => {
            let err = e.toString().includes("Permissions") ? "I don't have permission to kick this member!" : `Error: ${e}`;
            embed = new MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setTitle('I couldn\'t kick that member!')
            .setDescription(err)
            .setFooter(client.user.tag, client.user.avatarURL())
            .setTimestamp();
            
            return message.reply({embeds: [embed]})
        });
    }
}
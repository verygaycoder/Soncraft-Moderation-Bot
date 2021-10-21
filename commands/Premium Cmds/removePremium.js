// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';

// ** Main Code ** //

export default {
    name: "",
    description: "Removes a member from the premium role. Note: This does not remove their premium elsewhere",
    usage: "<member || member ID>",
    aliases: ["rp"],
    permissions: [],
    guildOnly: true,
    ownerOnly: true,
    botOwnerOnly: false,
    execute: async (message, args, client) => {

        let embed;
        const memberID = message.mentions.users.first()?.id || args[0];
        const member = message.guild.members.cache.find(m => m.id === memberID);

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('I couldn\'t find that member!')
        .setDescription(`You can tag a member or use their ID`)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(!memberID || !member) return message.reply({embeds: [embed]});

        const premiumRole = message.guild.roles.cache.find(r => r.id === "892908333902745692");

        member.roles.remove(premiumRole.id);

        embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('Success!')
        .setDescription(`Ive removed the <@&${premiumRole.id}> role from ${member.user}!`)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        return message.reply({embeds: [embed]});

    }
}
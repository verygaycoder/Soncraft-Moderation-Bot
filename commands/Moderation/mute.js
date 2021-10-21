// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';

// ** Main Code ** //

export default {
    name: "",
    description: "Mutes a user permenantly or for a specified amount of time",
    usage: "<member || member ID> <number> <s | m | h | d>",
    aliases: ["m"],
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

        const mutedRole = message.guild.roles.cache.get('895762400618360892');
        let time = args[0];

        if(time && !member.roles.cache.has(mutedRole.id)) {
            let baseNum = time.match(/\d+/g);
            let measurement = time.match(/[a-zA-Z]+/g);

            if((baseNum || baseNum[0]) || (measurement || measurement[0])) {
            if(["s", "m", "h", "d"].includes(measurement[0])){

            if(measurement[0] === "s") time = baseNum[0] *1000;
            if(measurement[0] === "m") time = baseNum[0] * 60 * 1000;
            if(measurement[0] === "h") time = baseNum[0] * 60 * 60 * 1000;
            if(measurement[0] === "d") time = baseNum[0] * 60 *60 * 1000;
            } else {
                time = undefined;
            }
        }else {
            time = undefined;
        }
        }

        member.roles.cache.has(mutedRole.id) ? member.roles.remove(mutedRole.id) : member.roles.add(mutedRole.id);

        if(time) {
            setTimeout(() => {
                member.roles.remove(mutedRole.id)
            }, time)
        }

        embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`Successfully ${member.roles.cache.has(mutedRole.id) ? "unmuted" : "muted"}!`)
        .setDescription(member.roles.cache.has(mutedRole.id) ? "Role removed!" : time ? `They will be unmuted in ${args[0]}` : `They will be muted until you use this command again`)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        message.reply({embeds: [embed]});
        embed.addField("Muted By", `${message.author}`)
        client.config.logChannel.send({embeds: [embed]})

    }
}
// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

// ** Main Code ** //

export default {
    name: "",
    description: "Checks if a member has permium status",
    usage: "{member}",
    aliases: ["pc"],
    permissions: ["MANAGE_ROLES"],
    guildOnly: true,
    ownerOnly: false,
    botOwnerOnly: false,
    execute: async (message, args, client) => {

        let embed;
        const memberID = message.mentions.users.first()?.id || args[0] || message.author.id;
        const member = await client.users.fetch(memberID);

        let pStatus = await fetch("https://api.soncraft.app/api/user/checkIfPremium", {
            method: "POST",
            body: JSON.stringify({discordID: memberID}),
            headers: { "Content-Type": "application/json" }
          })
          .catch(() => {});

        pStatus = await pStatus.json();

          embed = new MessageEmbed()
          .setColor("BLUE")
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setTitle('Premium Status')
          .setDescription(`${member.user.tag} ${pStatus ? "does" : "does not"} have Premium!`)
          .setFooter(client.user.tag, client.user.avatarURL())
          .setTimestamp();
  
        return message.reply({embeds: [embed]});


    }
}
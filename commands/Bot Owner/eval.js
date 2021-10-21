// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';

// ** Main Code ** //

export default {
    name: "eval",
    description: "Runs javascript code you input",
    usage: "<code>",
    aliases: ["e"],
    permissions: [],
    guildOnly: false,
    ownerOnly: false,
    botOwnerOnly: true,
    execute: async (message, args, client) => {

        const embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('Evaluating...')
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp()

        const msg = await message.channel.send({embeds: [embed]})
        try {
            const data = eval(args.join(' ').replace(/```/g, ''))

            const embed = new MessageEmbed()
                .setColor("PURPLE")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setTitle('Eval Command')
                .addField(`Input`, `\`\`\`js\n${args.join(' ')}\n\`\`\``)
                .addField(`Output`, `\`\`\`js\n${JSON.stringify(await data, null, 2)}\n\`\`\``)
                .setFooter(client.user.tag, client.user.avatarURL())
                .setTimestamp();
            await msg.edit({embeds: [embed]});
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id)
            msg.awaitReactions({filter, max: 1 })
                .then((collected) => {
                    collected.map((emojis) => {
                        switch (emojis._emoji.name) {
                            case '✅':
                                if(message.guild) msg.reactions.removeAll()
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })

        } catch (error) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setTitle('An Error occured')
                .setDescription(`\`\`\`js\n${error.message}\n\`\`\``)
                .setFooter(client.user.tag, client.user.avatarURL())
                .setTimestamp()
            return await msg.edit({embeds: [embed]});
        }

    }
}
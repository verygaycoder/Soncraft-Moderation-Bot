// ** IMPORTS ** //

// ** Main Code ** //

export default {
    name: "",
    execute: async (reaction, user, client) => {

        const message = reaction.message;
        const guild = await client.guilds.fetch(reaction.message.guildId);
        const member = guild.members.cache.find(m => m.user.id === user.id)

        if(message.id === "895748223954722846") {
            const verifiedRole = guild.roles.cache.find(r => r.id == "891829469285847050");

            if(!verifiedRole) return;

            member.roles.remove(verifiedRole.id)

        }

    }
}
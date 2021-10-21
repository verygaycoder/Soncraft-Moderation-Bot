// ** IMPORTS ** //

// ** Main Code ** //

export default {
    name: "",
    execute: async (client) => {
        console.log(`[Client] Logged in as ${client.user.tag}`)
        client.state = false;
        client.config.logChannel = await client.channels.fetch(client.config.logChannel);

        const guild = await client.guilds.fetch("437027290082312192");
        const member = await guild.members.fetch("842130350461419531")
        const mutedRole = guild.roles.cache.get('895762400618360892');
        member.roles.remove(mutedRole.id)
    }
}
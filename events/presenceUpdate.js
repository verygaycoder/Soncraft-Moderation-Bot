// ** IMPORTS ** //

import fetch from "node-fetch";

// ** Main Code ** //

export default {
    name: "",
    execute: async (oldP, newP, client) => {

    // ** Premium Code ** //

    const now = new Date();
    let state = client.state;

    if(now.getDay() == 7 && !state) { // On Sunday
        client.state = true;

        const members = await newP.guild.members.fetch(); // Fetch all guild members
        
        members.forEach(async member => { // Loop through members

            let pStatus = await fetch("https://api.soncraft.app/api/user/checkIfPremium", { // Check if member is premium
                method: "POST",
                body: JSON.stringify({discordID: member.user.id}),
                headers: { "Content-Type": "application/json" }
              })
              .catch(() => {});
              pStatus = await pStatus.json();

              const premiumRole = newP.guild.roles.cache.find(r => r.id === "892908333902745692");

              if(pStatus && !member.roles.cache.find(r => r.id === "892908333902745692")) {
                member.roles.add(premiumRole.id, "Member has premium status!");
            }

        });

    };


    }
}
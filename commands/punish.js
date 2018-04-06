
const Discord = require("discord.js");
const ms = require("ms");
const fs = module.require("fs");

module.exports.run = async (bot, message, args, con) => {
    //Creating the muted role
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.author.send("Couldn't find user");
    if (tomute.hasPermission("MANAGE_ROLES")) return message.author.send("This player can't be muted!");
    let muterole = message.guild.roles.find(`name`, "Muted");
    let memberrole = message.guild.roles.find(`name`, "Members");
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#660805",
                permissions: []
            })
            message.guild.channel.forEach(channel, id)
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        } catch (e) {
            console.log(e.stack);
        }
    }



    //Assinging the mute time
    let mutetime = args[1];
    let mutereason = args[2];
    if (!mutetime) return message.author.send("No time specified");
    if (!mutereason) return message.author.send("No reason specified!");
    let muteEmbed = new Discord.RichEmbed().setDescription("Mutes").addField("New Mute!", `<@${tomute.id}>, You have been muted! :mute:`).setColor("#db5f06").addField("Time", `${ms(ms(mutetime))} (m/minute s/second h/hour)`).addField("Reason", `${mutereason}`).addField("muted by", `${message.author}`).addField("Muted on", message.createdAt).setFooter("Shroud-Bots", "https://i.imgur.com/yF1akXa.png")
    let mutechannel = message.guild.channels.find(`name`, "muted");
    if (!mutechannel) return message.channel.send("Couldn't find muted channel.");
    let mutevoice = message.guild.channels.find(`name`, "mutees");
    if (!mutevoice) return message.channel.send("No mutees voice channel for user to be moved to!")
    await (tomute.addRole(muterole.id));
    await (tomute.removeRole(memberrole.id));
    await (tomute.setVoiceChannel(mutevoice));

	message.delete().catch(O_o => {});
	mutechannel.send(`${tomute}, You have recieved a mute!`)
    mutechannel.send(muteEmbed)

    setTimeout(function() {
        tomute.removeRole(muterole.id);
        tomute.addRole(memberrole.id);
    }, ms(mutetime));
}
module.exports.help = {
    name: "punish"
}
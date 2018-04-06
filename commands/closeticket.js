const Discord = require("discord.js");
const ticket = require("./createticket.js");

module.exports.run = async(bot, message, args) => {
    let logchannel = message.guild.channels.find(`name`, "ticket-log")

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Insufficient permission!");
    message.channel.delete().then(deleted => {
        let logEmbed = new Discord.RichEmbed()
    .addField("Ticket closed", `${deleted.name} has been closed!`)
    .setColor("#019957")
    .addField("Closed by", `${message.author}`)
    .setFooter("Shroud-Bots", "https://i.imgur.com/yF1akXa.png")


    logchannel.send(logEmbed)
    })

}

module.exports.help = {
    name: "close"
}
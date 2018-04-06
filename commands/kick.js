const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Insufficient permission!");
    if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
        .addField("New Kick!", "Stats are displayed below")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author}> with ID ${message.author.id}`)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "punish-log");
    if (!kickChannel) return message.channel.send("Can't find punish-log channel.");
    message.delete().catch(O_o => {});
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;

    }


module.exports.help = {
    name: "kick"
}
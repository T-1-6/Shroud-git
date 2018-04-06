const Discord = require("discord.js");
const fs = require("fs");
let ticketnumber = JSON.parse(fs.readFileSync("./ticketnumber.json", "utf8"));


module.exports.run = async(bot, message, args) => {
    let logchannel = message.guild.channels.find(`name`, "ticket-log")
    let ticketcreator = message.author
    let ticketname = "ticket-" + ticketnumber
    let ticketcategory = message.guild.channels.find(`name`, "tickets")
    let memberrole = message.guild.roles.find(`name`, "Members");
    let supportrole = message.guild.roles.find(`name`, "Support");

    if(!ticketnumber) ticketnumber = {
        number: 0
    }


    if (!ticketcategory) {
        message.guild.createChannel("tickets", "category")

    }


    
    ticketnumber ++;

    fs.writeFile("./ticketnumber.json", JSON.stringify(ticketnumber), (err) => {
        if (err) console.log(err);
        return;
    });

    message.guild.createChannel(ticketname, "text", [{

        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'CREATE_INSTANT_INVITE'],
        deny: ['ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'CHANGE_NICKNAME'],
        id: ticketcreator,
    }, {
        deny: ['ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'CHANGE_NICKNAME', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'CREATE_INSTANT_INVITE', 'EMBED_LINKS', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS'],
        id: memberrole,
    }, {
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'CREATE_INSTANT_INVITE', 'MANAGE_MESSAGES'],
        deny: ['ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'SEND_TTS_MESSAGES', 'ATTACH_FILES', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'CHANGE_NICKNAME'],
        id: supportrole, 
    }]).then(newChannel => {
        newChannel.setParent(ticketcategory)
        let createEmbed = new Discord.RichEmbed()
        .setColor("#0e9156")
        .addField("New Ticket!", `Your ticket has been created at ${newChannel}`)

        let logEmbed = new Discord.RichEmbed()
        .setColor("#0e9156")
        .addField("New Ticket!", `A ticket has been opened by ${ticketcreator} at ${newChannel.name}`)
        logchannel.send(logEmbed);
        message.channel.send(createEmbed);



});

}

module.exports.help = {
    name: "ticket"
}
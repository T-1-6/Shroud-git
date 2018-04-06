const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

const swearwords = ["fuck", "cunt", "nigga"]

const bot = new Discord.Client({
    disableEveryone: true
});
bot.commands = new Discord.Collection();


fs.readdir("./commands", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

})


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    

    bot.user.setActivity("Amis code", {
        type: "WATCHING"
    });

});

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined the server`);

    let welcomechannel = member.guild.channels.find(`name`, "member-log");

    let welcomeEmbed = new Discord.RichEmbed()
        .addField("New join!", `${member} Has joined the server!`)
        .setColor("#0104b5")
        .setFooter("Shroud-Bots", "https://i.imgur.com/VBn9pfU.png")
    welcomechannel.send(welcomeEmbed);

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} left the server`);

    let leavechannel = member.guild.channels.find(`name`, "member-log");

    let leaveEmbed = new Discord.RichEmbed()
    .addField("Member left!", `${member} has left the server :(`)
    .setColor("#840202")
    .setFooter("Shroud-Bots", "https://i.imgur.com/VBn9pfU.png")
    leavechannel.send(leaveEmbed);
});

    let autorole = member.guild.roles.find(`name`, `Members`);
    console.log(`${member} has recieved the Member role!`)

    member.addRole(autorole)
});


bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.content.includes(swearwords)) {
        message.delete();
    }
    

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length))
    if (cmd.startsWith("~")) commandfile.run(bot, message, args); 



});

bot.login(botconfig.token);
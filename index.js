const { token } = require('./config.json');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`)
});

client.on('messageCreate', async (message) => {
    try {
    if (message.author.bot) return;
    if (message.channel.id === 'Put desired channel ID here.') return;
    if (message.content === undefined) return;
    if (message.content.startsWith('!')) return;
        
    await axios(`http://api.brainshop.ai/get?bid=(BID HERE)&key=(KEY HERE)&uid=${message.author.id}&msg=${message.content}`).then(r => {
    let data = r.data
    message.reply(data.cnt)
    })
    } catch (e) {
        message.reply({content: "Something went wrong. Try again later."})
        console.log(e)
    }
});

client.login(token)

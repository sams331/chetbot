const { token } = require('./config.json');
const {Client, Events, GatewayIntentBits} = require('discord.js');
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
    if (message.channel.id === '1094922165620584510') return;
    if (message.content === undefined) return;
    if (message.content.startsWith('!')) return;
        
    let getOutput = async () => {
        let response = await axios.get(`http://api.brainshop.ai/get?bid=123456&key=abcdefg&uid=${message.author.id}&msg=${message.content}`) // the site is an example. Please use a valid Brainshop API site for it to work.
        let output = response.data
        return output
    }
    let outputValue = await getOutput()
    console.log(outputValue)
    
    await message.channel.sendTyping()
    
    message.reply({content: `${outputValue.cnt}`})
    } catch (e) {
        message.reply({content: "Something went wrong. Try again later."})
        console.log(e)
    }
});

client.login(token)

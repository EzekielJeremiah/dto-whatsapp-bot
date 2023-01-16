const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, List } = require('whatsapp-web.js');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
  });

client.initialize();

client.on('message', async (message) => {
    console.log(message.body);

    if(message.body.startsWith("!AIchat")) {
        runCompletion(message.body.substring(1)).then(result => message.reply(result));
    }

    if (message.body === '!list') {
        message.reply('╔══《✧》══╗DTO Bot╔══《✧》══╗ \n 《✧》!tagall \n 《✧》!owner \n 《✧》!sticker \n 《✧》!AIchat \n ');
    }
    
    if (message.body === '!AIchat') {
        message.reply('╔══《✧》══╗DTO Bot╔══《✧》══╗ \n --!AIchat question')
    }

    if (message.body === '!owner') {
        message.reply('detechoracle xxxxxxx @2348127982163')
    }

    if (message.body === '!sticker') {
        var sticker = require('sticker.js');
        sticker.convert(msg, value, args, user, client, MessageMedia);
    }

    // if(message.body === '!tagall') {
    //     const chat = await message.getChat();
        
    //     let text = "";
    //     let mentions = [];

    //     for(let participant of chat.participants) {
    //         const contact = await client.getContactById(participant.id._serialized);
            
    //         mentions.push(contact);
    //         text += `@${participant.id.user} `;
    //     }

    //     await chat.sendMessage(text, { mentions });
    // }
});

async function runCompletion (message) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 200,
    });
    return completion.data.choices[0].text;
}
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function runCompletion (message) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 200,
    });
    return completion.data.choices[0].text;
}
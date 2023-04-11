const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const { nextTick } = require('process');

let aktif = false

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {

    setTimeout(() => {
        console.log('Muffuq Whatsapp Bot Ready!');
        aktif = true
    }, 2500);
});

let messagelist = []



client.on('message', async message => {
    if (aktif) {
        const contact = await message.getContact();
        const contactnumber = contact.number;

        const lastmessage = messagelist.some(s => s == contactnumber);

        if (contact.isGroup == false && lastmessage == false) {
                let yanit = ` Hello, I'm a personal assistant. The person you are trying to reach is currently unavailable. Your message will be returned as soon as possible. See you soon 👋 - Muffuq Bot`
                message.reply(yanit);
                console.log("Name: ", contact.name, "Message: ", message.body)
                messagelist.push(contact.number);
        }
        else {
            return
        }    }
});

client.initialize();
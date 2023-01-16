/* AsunaBot
description: convert to sticker*/

var pluginName = "sticker"
var pluginAuthor = "dtechoracle"
var pluginVersion = 1.0

module.exports = {

    convert: async function (msg, value, args, user, client, MessageMedia)  {

        var isQuote = msg.hasQuotedMsg
        if (!isQuote) return msg.reply("please quote a media")
        msg.react("⌛")
        if (value.length > 1) {
            sticker(value)
        } else {
            sticker("dtechoracle")
        }
        async function sticker(name) {
            try {
                const quotedMsg = await msg.getQuotedMessage();
                if (quotedMsg.hasMedia) {

                    try {
                        const encmedia = await quotedMsg.downloadMedia();
                        client.sendMessage(msg.from, encmedia, { quotedMessageId: msg.id._serialized, sendMediaAsSticker: true, stickerName: name, stickerAuthor: user.style + user.username, stickerCategories: ['😎', '😾', '🗿'] })
                    
                        msg.react("🖤")
                    } catch (err) {
                        msg.reply(user.style + " there was an error lol cryptic details:\n\n\n" + err.message)
                        msg.react("😞")
                    }

                } else {
                    msg.reply(user.style + " reply to a picture")
                }
            } catch (err) {
                msg.reply(user.style + " there was an error lol cryptic details:\n\n\n" + err.message)
                msg.react("😞")
            }
        }


        asuna.log(pluginName, pluginVersion, pluginAuthor, false)
    }
}
import { Wechaty } from "wechaty"
import { PuppetPadplus } from "wechaty-puppet-padplus"

const WECHATY_PUPPET_PADPRO_TOKEN = "puppet_padplus_64e7c99ae4e1019c"

const puppet = new PuppetPadplus ({
    token: WECHATY_PUPPET_PADPRO_TOKEN,
})

const bot = new Wechaty({
    puppet,
})

let busyIndicator    = false
const busyAnnouncement = `你好我很忙，请不要随意打扰我，谢谢`


bot
.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
.on('login',            user => console.log(`User ${user} logined`))


// message event
bot.on("message", async function(msg) {
    const sender = msg.from()
    const text = msg.text()
    const room = msg.room()


   console.log(sender.id)

    if (!sender) {
        return 
    }

    if (text === "#status") {
        await sender.say('我很忙: ' + busyIndicator)
        await sender.say('自动回复: ' + busyAnnouncement)
    } else if (text === "#free") {
        busyIndicator = false
        await sender.say("auto reply stopped")
    } else if (/^#busy/i.test(text)) {
        busyIndicator = true
        await sender.say("我很忙：" + "ON")
    } else {
    // 不来至个人的信息，不回复？
        console.log("this is called")
        if (!busyIndicator) {
            return
        }

        if (msg.self()) {
            return
        }

        // busy annoucement to contact
        console.log(room)
        if (!room) {
            await sender.say(busyAnnouncement)
            return
        }

        // mentioned in a room
        const contactList = await msg.mentionList()
        const contactIdList = contactList.map(c => c.id)
        if (contactList.includes(this.userSelf().id)) {
            await room.say(busyAnnoucement, sender)
        }
    }
})

bot.start()
.catch(e => console.error(e))
import { Wechaty } from "wechaty"
import { PuppetPadplus } from "wechaty-puppet-padplus"

const WECHATY_PUPPET_PADPRO_TOKEN = "puppet_padplus_64e7c99ae4e1019c"

const puppet = new PuppetPadplus ({
    token: WECHATY_PUPPET_PADPRO_TOKEN,
})

const bot = new Wechaty({
    puppet,
})

bot
.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
.on('login',            user => console.log(`User ${user} logined`))



// message event

let busyIndicator = false
let busyAnnoucement = "您好，请不要随便跟我说话"

bot.on("message", async function(msg) {
    log.info("Bot", "(message) %s", msg)

    const filehelper = bot.Contact.load(filehelper)

    const sender = msg.from()
    const receiver = msg.to()
    const text = msg.text()
    const room = msg.room()

    if (!sender || !receiver) {
        return 
    }

    if (receiver.id === "filehelper") {
        if (text === "#status") {
          await filehelper.say('我很忙: ' + busyIndicator)
          await filehelper.say('自动回复: ' + busyAnnouncement)
        } else if (text === "#free") {
            busyIndicator = false
            await filehelper.say("auto reply stopped")
        } else if (/^#busy/i.test(text)) {
            busyIndicator = true
            await filehelper.say("我很忙：" + "ON")

            const matches = text.matches(/^#busy (.+)$/i)
            if (!matches || !matches[1]) {
                await filehelper.say("auto reply message:" + busyAnnoucement)
            } else {
                await filehelper.say("set auto reply message:" + busyAnnoucement)
            }
        }
        return
    }

    // 不来至个人的信息，不回复？
    if (sender.type() !== bot.Contact.Type.Personal) {
        return
    }

    // 不忙不回复
    if (!busyIndicator) {
        return
    }

    if (msg.self()) {
        return
    }

    // busy annoucement to contact
    if (!room) {
        await msg.say(busyAnnoucement)
        return
    }

    // mentioned in a room
    const contactList = await msg.mention()
    const contactIdList = contactList.map(c => c.id)
    if (contactList.includes(this.userSelf().id)) {
        await msg.say(busyAnnoucement, sender)
    }
})

bot.start()
.catch(e => console.error(e))
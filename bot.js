import { Wechaty } from "wechaty"
import { PuppetPadplus } from "wechaty-puppet-padplus"
import { FileBox }  from 'wechaty'


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
        if (room.id === '18359517485@chatroom' || room.id === '20420585936@chatroom') {
            const contactList = await msg.mentionList()
            const mentionedIdList = contactList.map(c => c.id)
            if (mentionedIdList.includes('wxid_d5dstp278dkq12')) {
                if (text.includes("#corona")) {

                    await screenShot
                    await screenShot2
                    const pic = FileBox.fromFile('/Users/hanggao/wechatBot/tmp/out.png')
                    await msg.say("【今日日本疫情状况】")
                    await msg.say(pic, sender)
                    const pic2 = FileBox.fromFile('/Users/hanggao/wechatBot/tmp/out2.png')
                    await msg.say(pic2, sender)
                } 
                else {
                    await msg.say(busyAnnouncement, sender)
                }
            } else {
                console.log("not in this room")
            }
        } else {
            console.log(room.ownerId)
            console.log("wrong room")
        }
    }
})

bot.start()
.catch(e => console.error(e))



const fs = require("fs")
const screenshot = require("electron-screenshot-service")


const screenShot = new Promise((resolve, reject) => {
    console.log("screenshot 2")

    screenshot({
        url: "https://hazard.yahoo.co.jp/article/20200207",
        width: 1024,
        height: 2500,
        crop: {
            x: 100,
            y: 700,
            width: 800,
            height: 700,
        },
        delay: 3,
    })
    .then(function(img){
        fs.writeFile("/Users/hanggao/wechatBot/tmp/out.png", img.data, function(err){
            screenshot.close()
            return resolve(1)
        })
    })
})

const screenShot2 = new Promise((resolve, reject) => {
    console.log("screenshot 2")

    screenshot({
        url: "https://hazard.yahoo.co.jp/article/20200207",
        width: 1024,
        height: 2500,
        crop: {
            x: 100,
            y: 1450,
            width: 800,
            height: 1000,
        },
        delay: 3,
    })
    .then(function(img){
        fs.writeFile("/Users/hanggao/wechatBot/tmp/out2.png", img.data, function(err){
            screenshot.close()
            return resolve(1)
        })
    })
})
import { Wechaty } from "wechaty"
import { PuppetPadpro } from "wechaty-puppet-padpro"

const WECHATY_PUPPET_PADPRO_TOKEN = ""

const puppet = new PuppetPadpro ({
    token: WECHATY_PUPPET_PADPRO_TOKEN,
})

const bot = new Wechaty({
    puppet,
})

bot
.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
.on('login',            user => console.log(`User ${user} logined`))
.on('message',       message => console.log(`Message: ${message}`))
.start()
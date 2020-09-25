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
.on('message',       message => console.log(`Message: ${message}`))
.start()

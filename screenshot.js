const fs = require("fs")
const screenshot = require("electron-screenshot-service")


function getScreenShot() {
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
            return Promise.resolve(1)
        })
    })
}

getScreenShot()
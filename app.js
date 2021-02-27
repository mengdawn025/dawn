
var express = require('express')
var bodyParser=require('body-parser')
var fs = require('fs')
var router=require('./router')
var app = express()

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))
//一定要在路由之前
app.use(bodyParser.urlencoded({ extended:false}))
 
app.use(bodyParser.json())
//挂载路由
app.use(router)

// 相当于server.listen
app.listen(3000, function () {
    console.log('app is runing at port 3000.')
})
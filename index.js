const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// どこにアクセスさせるかの設定
// distフォルダ：コンパイルされたファイルが入る場所
app.use(express.static(__dirname + "/dist/"));

// SPAの時、ルーティングがうまくいかない時があるので以下の設定
// これをしていないと、https://~~~/aboutとかに行った時にリロードするとエラーがでる
// SPAだとaboutファイルを直で読み込んでいないから
// これでルート以外でリロードしてもindex.htmlを読み込んでちゃんとルーティングをしてくれる
// /.*/で全てのルートを指定。req(request), res(response)
app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html");
});

app.set('secret', 'abcd')
app.use(require('cors')())
app.use(express.json())

// Require Database
require('./plugins/db')(app)
// Router
require('./routes/router')(app)
require('./routes/user-router')(app)


app.listen(port, (req,res) => {
    console.log('app is running on 3000')
})

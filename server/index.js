const express = require('express')
const mongoose = require('mongoose')
const app = express()

// 跨域
app.use(require('cors')())
// 允许处理前端发来的json数据
app.use(express.json())

// 连接数据库
mongoose.connect('mongodb://localhost:27017/ArticDB1', {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 数据库模型
const Article = mongoose.model(
  'Article',
  new mongoose.Schema({
    papertime: {
      type: Date
    },
    title: {
      type: String
    },
    school: {
      type: String
    },
    papername: {
      type: String
    }
  })
)

app.get('/', async(req, res) => {
  res.send('index')
})

// 新增文章
app.post('/api/articles', async(req, res) => {
  console.log(req)
  const article = await Article.create(req.body)

  res.send(article)
})

// 文章列表
app.get('/api/articles', async(req, res) => {
  const articles = await Article.find()
  res.send(articles)
})

// 删除文章
app.delete('/api/articles/:id', async(req, res) => {
  await Article.findByIdAndDelete(req.params.id)

  res.send({
    stat: 'ok'
  })
})

// 文章详情
app.get('/api/articles/:id', async(req, res) => {
  const article = await Article.findById(req.params.id)

  res.send(article)
})

// 修改文章
app.put('/api/articles/:id', async(req, res) => {
  await Article.findByIdAndUpdate(req.params.id, req.body)

  res.send()
})

app.listen(3001, () => {
  console.log(`'http://localhost:3001/'`)
})

// const express = require('express')
// const cors = require('cors')

// const app = express()

// /** 解决跨域问题 */
// app.use(cors())

// /** 允许请求提交json格式数据 */
// app.use(express.json())

// /** 引入路由模块 */
// require('./router')(app)

// /** 引入数据库 */
// require('./db')(app)

// app.listen(3000, () => {
//   console.log('http://localhost:3001')
// })

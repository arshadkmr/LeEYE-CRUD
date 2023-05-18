if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express")
const app = express()
const userRoute = require("./routes/userRoute")
const mongoose = require("mongoose")
mongoose.connect(process.env.mongo)

const cors = require('cors')
app.use(cors())
app.use("/", userRoute)
app.use(express.static('public'))
app.use('/', express.static('public/'))


app.listen(3000, () => {
    console.log("listening on", 3000)
})
const mongoose = require('mongoose')
const colors = require('colors')

const connectDb=async()=>{
    try {
          await mongoose.connect(process.env.MONGO_URL)
          console.log(`Connnected To Database ${mongoose.connection.host}`)
    } catch (error) {
        console.log("DB Eroor",error, colors.bgRed
        )
    }
}
module.exports=connectDb

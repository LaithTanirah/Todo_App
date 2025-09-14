const mongoose = require('mongoose')

const connectionString = process.env.connectionString

mongoose.connect(connectionString).then(()=>{
    console.log(`DB Ready to use`)
}).catch((err)=>{
    console.log('DB error', err)
})
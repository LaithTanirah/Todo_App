const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(express.json())

app.use(cors())
const PORT = process.env.PORT

require('./models/db')

{

    const roleRouter = require('./routes/roles')
    app.use('/roles', roleRouter)

}
{

    const userRouter = require('./routes/users')
    app.use('/users', userRouter)

}
{

    const taskRouter = require('./routes/tasks')
    app.use('/tasks', taskRouter)

}

console.log("SERVER RUNNING")
app.listen(PORT, ()=>{
    console.log(`Server Running at PORT ${PORT}`)
})
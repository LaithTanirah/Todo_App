const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userScehma = mongoose.Schema({
    userName: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true,},
    role: {type: mongoose.Schema.Types.ObjectId, ref: "Role", default: "68bc9e73c92b258747552793"}

})


userScehma.pre('save', async function (){
    const salt = process.env.salt
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, Number(salt)) ;
})


module.exports = mongoose.model('User', userScehma)
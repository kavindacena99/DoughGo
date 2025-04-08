const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        firstname: { type:String, required:true },
        lastname: { type:String, required:true },
        businessname: { type:String, required:true, unique:true },
        email: { type:String, required:true, unique:true },
        password: { type:String, required:true }
    },
    { timestamps: true }
);

// hash password before saving
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// compare password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
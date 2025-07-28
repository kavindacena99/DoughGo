const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema(
    {
        firstname: { type:String, required:true },
        lastname: { type:String, required:true },
        phonenumber: { type:String, required:true},
        address: { type:String, required:true },
        email: { type:String, required:true },
        password: { type:String, required:true },
    },
    { timestamps: true }
);

// hash password before saving
customerSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// compare password
customerSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
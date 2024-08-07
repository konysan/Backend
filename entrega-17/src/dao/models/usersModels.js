const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }, 
    cart:{
        type:[
            {
                _id:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'Carts'
                }
            }
        ],
        default:[]
    },
    role: { type: String, default: 'usuario' } 
},
{
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;

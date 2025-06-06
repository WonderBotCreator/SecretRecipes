 import {mongoose, Schema, model, models } from "mongoose";

 const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String,

    image:{
        type: String,
    },

    imageID:{
        type: String,
    },

    recipes:[
        {
             type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ]
 })


 userSchema.set('toJSON',{
      transform: (document, returnedObject)=>{
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
          delete returnedObject.passwordHash
      }
   })
  
   const User = models.User || mongoose.model('User', userSchema)
  
   module.exports = User
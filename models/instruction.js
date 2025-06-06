import {mongoose, Schema, model, models } from "mongoose";

 const instructionSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },

    imageID:{
        type: String,
    },

    recipe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
 })

 instructionSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
 })

 const Instruction = models.Instruction || mongoose.model('Instruction', instructionSchema)

 module.exports = Instruction
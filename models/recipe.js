import {mongoose, Schema, model, models } from "mongoose";

 const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },

    imageID:{
        type: String,
    },
    description:{
        type: String,
    },

    portionNumber:{
        type: String
    },

    timeConsumption:{
        type: String
    },

    recipeType:{
        type: String
    },

    ingredients:[{
            name:{
                type:String
            },
            amount:{
                type:String
            }
        }   
    ],

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    instructions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instruction'
    }],

 })

 
  recipeSchema.set('toJSON',{
     transform: (document, returnedObject)=>{
         returnedObject.id = returnedObject._id.toString()
         delete returnedObject._id
         delete returnedObject.__v
     }
  })
 
  const Recipe = models.Recipe || mongoose.model('Recipe', recipeSchema)
 
  module.exports = Recipe


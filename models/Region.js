const mongoose = require('mongoose')

const regionSchema = new mongoose.Schema({
    num:{
        type:Number,
        required:true
    },
    location:{
        type: { type: String },
         coordinates: []
      }

},{
   timestamps:true
})
                       
const Region= mongoose.model('Region',regionSchema)

module.exports= Region;
const mongoose = require('mongoose')

const droneSchema = new mongoose.Schema({
    power: {
        type: Number,
        required: true,
        default: 100
    },
    regions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region' 
    }],
    location:{
        type: { type: String },
         coordinates: []
    }

},{
   timestamps:true
})

droneSchema.index({ location: "2dsphere" });
                       
const Drone= mongoose.model('Drone',droneSchema)

module.exports= Drone;
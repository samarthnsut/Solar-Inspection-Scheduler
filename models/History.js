const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  username:{
      type:String
  },
  request_time:{
      type:String
  },
  area:{
    type:String
  },
  inspecton_time:{
      type:String
  },
  notes:{
      type:String 
  }
},{
   timestamps:true
})
                    
const History= mongoose.model('History',historySchema)

module.exports= History;
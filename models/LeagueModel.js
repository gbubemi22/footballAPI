const mongoose = require('mongoose')

const LeagueSchema = new mongoose.Schema({
  leaguename:{
    type: String,
    required: [true, 'please provide a name'],
    trim: true,
    maxlength: [25, 'Name can not be more than 25 characters'], 
  },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: [60, 'Name can not be more than 60 characters'],
  },
     logo: {
      type: String, 
      required:true,
      default: '/public/uploads'
        
     }, 
  
}, {timestamps: true})

const League = mongoose.model('league', LeagueSchema);

module.exports = League

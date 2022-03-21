const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
  
  team:{
    type: String, required: true,
    required: [true, 'please provide a name'],
    trim: true,
    maxlength: [15, 'Name can not be more than 15 characters'],
  },
    nickname: {
      type: String,
      required: true,
      trim: true,
      maxlength: [15, 'Name can not be more than 15 characters'],
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "league",
      },
    
   
    }, {timestamps: true,}
    
// }, {timestamps: true,  toJSON: { virtuals: true }, toObject: { virtuals: true }}
);

// TeamSchema.virtual('league', {
//   ref: 'League',
//   localField: 'league_id',
//   foreignField: '_id',
//   justOne: true,
   
// });


const Team = mongoose.model('team', TeamSchema);
module.exports = Team;



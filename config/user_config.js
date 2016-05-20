var faux_rm = require('../db/user_db.js')

var user_call = {
  read: function(cb){
    faux_rm.read(function(res){
      cb(res);
    });
  },
  config_win: function(character){
    faux_rm.update_wins(character);
  },
  config_lose: function(character){
    faux_rm.update_losses(character);
  },
  config_score: function(character, score){
    faux_rm.update_high_score(character, score);
  }
}


module.exports = user_call;


//EXAMPLE CODE--------------------------
// user_call.read(function(data){
//   console.log(data);
// });

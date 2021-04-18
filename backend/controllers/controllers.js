// require models
var User = require('../models/userModel');

const create_account = function(req, res) {
  var new_user = new User(req.body);

  User.createUser(new_user, (err, result) => {

    if (err) {
      res.send(err);
    }

    res.json(new_user);
  });

};

const authenticate = function(req, res) {

  var user_credentials = new User(req.body);

  User.authenicateUser(user_credentials, (err, result) => {

    if (err) {
      res.send(err);
    }

    res.json(result);
  });

};


const create_event_with_rso = function(req, res) {

};


const create_event_without_rso = function(req, res) {

};


const add_review = function(req, res) {

};

const edit_review = function(req, res){
  
}


const add_user_to_rso = function(req, res) {
  var user = new RSOMember(req.body);

  RSOMember.addUser(user, (err, result) => {
    if (err){
      res.send(err);
    }

    res.json(result);
  })
};


const get_user_events = function(req, res) {

};


const get_public_events = function(req, res) {

};

const create_RSO = function(req, res) {
  var new_RSO = new RSO(req.body); 

  RSO.createRSO(new_RSO, (err, result) => {
    if(err){
      res.send(err);
    }
    else {
      res.json(result);
    }
  })
}


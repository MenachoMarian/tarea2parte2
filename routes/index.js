var express = require('express');
const user = require('../database/users');
const USER = user.model;
const USESCHEMA = user.schema;

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user', async(req, res, next) => {
  var params = req.body;
  params["registerDate"] = new Date();
  var user = new USER(params);
  var result = await user.save();
  res.status(200).json(result)
});

router.get("/user", async(req, res) => {
  var list = await USER.find({});
  res.status(200).json(list);
});

router.patch('/user', async(req, res, next) => {
  var params = req.body;
  var id = req.query.id;
  if(id == null){
    res.status(300).json({
       msn: "Introducir id del usuario que desea actualizar"
    });
    return;
  }
  params["updateDate"] = new Date();
  var result = await USER.findOneAndUpdate({_id: id},params);
  res.status(200).json(result)
});

router.delete("/user", async(req, res) => {
  var id = req.query.id;
  if(id == null){
    res.status(300).json({
       msn: "Introducir id del usuario que desea actualizar"
    });
    return;
  }
  var result = await USER.remove({_id: id})
  res.status(200).json(result);
});
module.exports = router;

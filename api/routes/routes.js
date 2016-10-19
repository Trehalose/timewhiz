var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var userCtrlAPI = require('../controllers/api-user-controller');
var brbCtrlAPI = require('../controllers/api-brb-controller');
var authCtrlAPI = require('../controllers/api-authentication-controller.js');
router.get('/users', userCtrlAPI.getAllUserBrbs);
router.get('/users/:username', auth, userCtrlAPI.getAUser);
router.get('/users/:username/brbs/today', auth, userCtrlAPI.getUser24HrBrbs);
router.get('/users/:username/brbs', auth, userCtrlAPI.getUserBrbs);
router.post('/register', authCtrlAPI.registerUser);
router.post('/login', authCtrlAPI.loginUser);
router.post('/brbs', auth, brbCtrlAPI.createBrb);
module.exports = router;

//************import required*************// 
const express = require('express');
const router = express.Router();
var postController = require("../controllers/post");
var registerloginController=require('../controllers/register-login');
var validator = require("../libs/middleware");
var token = require('../libs/verifytoken');


/**************Api routes****************/

router.post('/register',validator.validateAddUser,validator.checkValidationResult,registerloginController.register);
router.post('/login',validator.validateAuthUser,validator.checkValidationResult,registerloginController.login);
router.put('/profile',registerloginController.addData);
router.get('/showAll',registerloginController.findall);
router.delete('/delete/:id', registerloginController.delete);
router.put('/update/:id',registerloginController.update);

/****************API for posts**************/ 

router.post('/create',postController.createPost);
router.get('/list',postController.listing);
router.put('/updateCap/:id',postController.updateCap);
router.delete('/delpost/:id',postController.deletePost);
module.exports = router;



//************Api routes***********// 


module.exports = router;
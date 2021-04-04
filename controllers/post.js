var db =require('../config/config.db');
const multer = require('multer');


//***************Date Formate*************/ 


const date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let cdate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;



/************Create Post function************/ 


const storage = multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null,"./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({storage : storage}).single("picture");
exports.createPost=(req, res)=> {
    upload(req, res, function(err){
        if(err)
        console.log(err.message);
        else
        {
            user_id = req.body.user_id;
            caption = req.headers.caption;
            const filePath = req.file.filename;
            console.log("body",req.body)
            console.log("headers",req.headers)
            console.log("params",req.params)
            var sql = "INSERT INTO posts (picture,user_id,caption) VALUES ?";
            var values = [[filePath,user_id,caption]]
            console.log(filePath);
            console.log(user_id);
            db.query(sql ,[values],(err, results) => {
              if(err) 
              {
              console.log(err.message);
              res.status(400).json({
                status: "fails",
                err:err.message
              })}
              else{
                console.log("Data Successfully Uploaded")
                res.status(200).json({
                  status:"file upload Successfully",
                  data: results
                })            
              }   
            })
         }
      })
  }



/***********Listing(View) All post*********/ 


exports.listing = (req, res) => {
    db.query("SELECT posts.id, users.profile_picture, users.first_name, users.last_name, posts.caption,posts.picture FROM posts INNER JOIN users ON posts.user_id=users.id", (err,results) =>{
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            success: true,
            message: "Successfully View your data",
            data:results
        });
    });
}


/*************Update caption*************/ 


exports.updateCap = (req, res) => {
    // let sql ="UPDATE posts SET caption='" +req.body.caption +"' WHERE id=" + req.body.id;
    let sql ="UPDATE posts SET caption='" +req.body.caption +"', updated_on='"+cdate+"' WHERE id=" +
    req.params.id;
    db.query(sql, (err, results) => {
      if (err) console.log(err);
      else
        res.status(200).json({
          success: true,
          message: "success",
          data: results,
        });
    });
  };


/***********Delete post************/ 

exports.deletePost = (req, res) => {
    let sql = "DELETE FROM posts WHERE id=" + req.params.id;
    db.query(sql, (err, results) => {
      if (err) return console.log(err.message);
      else
        res.status(200).json({
          success: true,
          message: "successfull delete",
          data: results,
        });
    });
  };



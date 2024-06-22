//Get Login Page
function getUser(req,res,next){
    res.render('users',{
      title:"users -Hello Me",
    });
  }
  
  module.exports={
      getUser,
  }
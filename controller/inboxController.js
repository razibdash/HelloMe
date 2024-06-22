//Get Login Page
function getInbox(req,res,next){
    res.render('inbox',{
      title:"inbox -Hello Me",
    });
  }
  
  module.exports={
      getInbox,
  }
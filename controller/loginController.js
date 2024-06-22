//Get Login Page
function getLogin(req,res,next){
  res.render('index',{
    title:"Login -Hello Me",
  });
}

module.exports={
    getLogin,
}
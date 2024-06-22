const creatError=require('http-errors')
const notFoundHandler=(req,res,next)=>{

next(creatError(404,"Your requested content was not found!"));

}

//default error handler
function errorHandler(err,req,res,next){
    res.locals.error=process.env.NODE_ENV==="development"?err:{message:err.message};
    res.status(err.status || 500);

    if(res.locals.html){
        res.render("error",{
            title:"Error page"
        })
    }else{
        res.json(res.locals.error);
    }
    // res.render('error',{
    //     title:"Error Page"
    // });
}

module.exports={
    notFoundHandler,
    errorHandler
};
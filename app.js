//external imports...........
const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
const  mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');
const loginRouter=require('./router/loginRouter');
const usersRouter=require('./router/usersRouter');
const inboxRouter=require('./router/inboxRouter');

//internal imports...........
const {notFoundHandler,errorHandler}=require('./middlewares/common/eroorHandler');
const decorateHtmlResponse=require('./middlewares/common/decorateHtmlResponse');

//craate express app...........
const app=express();
dotenv.config();

//database connection..........
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=>{
    console.log("database connection successful");
})
.catch(err=>console.log(err));

//request parser........
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//set view engine.........
app.set('view engine','ejs');

//set static folder..........
app.use(express.static(path.join(__dirname,"public")));

//parse cookies...........
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup............
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);

//404 not found handler...........
app.use(notFoundHandler);

//common error handling...........
app.use(errorHandler);


app.listen(process.env.PORT,()=>{
    console.log(`app listening to port 3000`);
});


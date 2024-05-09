const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin");
const userRouter=require("./routes/user");
const cors = require('cors');
app.use(cors());
// const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use('/user',userRouter)
// app.use("/user", userRouter)
app.use((err,req,res,next)=>{
    res.json({msg:"something is wrong in server"})
})._router
app.get('/',(req,res)=>{
    res.send("<div> hii from vsing</div>")
})
const PORT = 3000||process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

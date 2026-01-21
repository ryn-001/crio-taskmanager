const mongoose = require('mongoose');

const connectDB = async (server) => {
    try{   

        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Database Connected");
            server.listen(process.env.PORT, () => {
                console.log("Server listening on PORT : " + process.env.PORT)
            })
        })

    }catch(err){
        console.log('An error occured ' + err.message);
    }
}

module.exports = {connectDB};
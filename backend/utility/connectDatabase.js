const mongoose = require('mongoose');

const connectDB = async (server,port) => {
    try{   

        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Database Connected");
            server.listen(port, () => {
                console.log("Server listening on PORT : " + port)
            })
        })

    }catch(err){
        console.log('An error occured ' + err.message);
    }
}

module.exports = {connectDB};
const mongoose = require('mongoose');
const app = require('./application');
const dotenv = require('dotenv')
dotenv.config()
// Mongo Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`connected to db: ${uri}`)
});

connection.on('error', function(err){
    console.log("Mongoose default connection has occured "+err+" error");
});
// This event is fired when the process is closed.
process.on('SIGINT', function() {
    connection.close(function() {
    console.log("Mongoose default connection is disconnected due to application termination");
    process.exit(0);
    });
})
const port = process.env.NODE_ENV === 'development' ? 5002 : 4000;
const server = app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
module.exports = server
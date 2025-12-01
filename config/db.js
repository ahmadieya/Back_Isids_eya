const mongoose = require('mongoose');
module.exports.connectToMongo = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MongoDb_URL)
    .then(
        () => { console.log("connect to db") }
    )
        .catch((err) => {
            console.log(err);
        });
}
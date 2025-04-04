const mongoose = require("mongoose")

const connection = async () => {
    await mongoose.connect("mongodb+srv://tusharsolanki458:ok4XPyqkIBU9Mqkh@tusharcluster.c8qzl.mongodb.net/new")

        .then(() => {
            console.log("Connection successfull");

        })

        .catch((error) => {
            console.log(error);
        }
        )
}

module.exports = connection;


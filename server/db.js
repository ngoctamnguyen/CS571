const { MongoClient } = require('mongodb');
const URL = 'mongodb://localhost:27017';

//const URL = 'mongodb+srv://tam:<Nntam@1234567890>@atlascluster.8k9wmv6.mongodb.net/?retryWrites=true&w=majority'

const mongo = new MongoClient(URL);
let db;
let COLLECTION_NAME = 'foody';
exports.connectDB = async () => {
    try {
        const client = await mongo.connect();
        console.log("Connected to MongoDB");
        db = client.db('foody');

    } catch (err) {
        console.log("DataBase error:", err);
    }
}
//for user profile================================================

exports.login = (email) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).findOne(
            { email: email }
        )
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

exports.getUser = (email) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).findOne({email: email})
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

exports.addUser = (user) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).insertOne(user)
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

exports.editUser = (email, password, fullname, phone, address) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).updateOne(
            { email: email },
            {
                $set: {
                    "password": password,
                    "fullname": fullname,
                    "phone": phone,
                    "address": address
                }
            }
        )
            .then(result => resolve(result))
            .catch(error => reject(error))
    })

}

//for food CRUD====================================

exports.addFood = (email, food) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).updateOne(
            { email: email },
            { $push: { "foods": food } })
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

exports.editFood = (email, foodId, foodname, origine, price, date, image) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).updateOne(
            { email: email, "foods._id": foodId },
            {
                $set: {
                    "foods.$.foodname": foodname,
                    "foods.$.origine": origine,
                    "foods.$.price": price,
                    "foods.$.date": date,
                    "foods.$.image": image
                }
            })
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

exports.getFoodByUser = (email) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).findOne({ email })
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}
exports.deleteFood = (email, foodId) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).updateOne(
            { email: email, 'foods._id': foodId },
            { $set: { 'foods.$.delete': true } }
        )
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

//for Notes=========================================

exports.addNote = (email, note) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).updateOne(
            { email: email },
            { $push: { 'notes': note } }
        )
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

exports.getAllNotes = (email) => {
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).findOne(
            { email: email }
        )
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}

exports.deleteNoteById = (email, id) => {
    console.log(email, id)
    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME).updateOne(
            { email: email, 'notes._id': id },
            { $set: { 'notes.$.delete': true } }
        )
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
}
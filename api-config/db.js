
const port = process.env.PORT || 5000
const { MongoClient } = require('mongodb');
require('dotenv').config()
app.use(cors())
app.use(express.json())
const { ObjectId } = require('mongodb');
// const _id = ObjectId("4eb6e7e7e9b7f4194e000001");


const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.rn4ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



module.exports = client 
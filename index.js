const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient } = require('mongodb');
app.use(express.json())
const { ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.rn4ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
  res.send('Hello World 2!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// const productRoute = require('./routes/products')
// app.use('/products', productRoute)
// const orderRoute = require('./routes/orders')
// app.use('/orders', orderRoute)



async function run() {

  try {
    // connection
    await client.connect()
    const db = client.db(process.env.DB_NAME);
    // const tourCollection = db.collection("tours");
    console.log("connnection successfull")

    // index 


    //**************************************************************************** ORDERS  */
    // collection name 
    const orderCollection = db.collection("orders");
    // store 
    app.post('/orders', async (req, res) => {
      console.log('inside post my-orders ')
      console.log(req.body, typeof req.body)
      const doc = req.body || {}
      // res.send()
      // return     
      if (doc) {
        const result = await orderCollection.insertOne(doc.data);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send({
          success: true,
          msg: `A document was inserted with the _id: ${result.insertedId}`
        })
      } else {
        res.send(
          {
            success: false,
            msg: `Failed to post`
          }
        )
      }
    })
    // ######## 
    // GET MY ORDERS
    // ######## 
    app.get('/orders/:email', async (req, res) => {
      const email = req.params.email
      console.log('inside find my-orders', email, typeof email)
      // res.send('Hello orders 2' + email)
      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      // const _id = ObjectId(id);
      // Query for a movie that has title "Annie Hall"
      const query = { email: email };

      const options = {
        skip: pageNumber * limit || 0,
        limit: limit || 0
      }
      const count = await orderCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      const cursor = orderCollection.find(query, options)

      const orderList = await cursor.toArray()
      if (pageNumber) {

      }
      else {

      }
      res.json({
        count: count,
        orderList: orderList,

      })
    })
    app.get('/my-orders/:email', async (req, res) => {


      const email = req.params.email
      console.log('inside find my-orders', email, typeof email)
      // res.send(id)
      // return;
      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      // const _id = ObjectId(id);
      // Query for a movie that has title "Annie Hall"
      const query = { email: email };

      const options = {
        skip: pageNumber * limit || 0,
        limit: limit || 0
      }
      const count = await orderCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      const cursor = orderCollection.find(query, options)

      const orderList = await cursor.toArray()
      if (pageNumber) {

      }
      else {

      }
      res.json({
        count: count,
        orderList: orderList,

      })
    })
    // ######## 
    // GET ALL ORDERS
    // ######## 
    app.get('/orders', async (req, res) => {

      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      const query = {}
      const options = {
        skip: pageNumber * limit || 0,
        limit: limit || 0
      }
      const count = await orderCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      const cursor = orderCollection.find(query, options)

      const orderList = await cursor.toArray()
      if (pageNumber) {

      }
      else {

      }
      res.json({
        count: count,
        orderList: orderList,

      })
    })

    // find servier 
    app.post('/product-details', async (req, res) => {
      console.log('inside product-details req ')
      console.log(req.body, typeof req.body)
      const doc = req.body || {}
      // res.send()
      // return     
      if (doc) {
        // const result = await tourCollection.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        const query = { _id: ObjectId(doc.id) }
        const options = {}
        const cursor = productCollection.find(query, options);
        const details = await cursor.toArray()
        res.send({
          success: true,
          msg: `Result Foound`,
          data: details
        })
      } else {
        res.send(
          {
            success: false,
            msg: `No serach value found`,
            data: []
          }
        )
      }


    })
    // find

    // delete 


    app.delete('/my-orders', async (req, res) => {
      console.log('inside delete req ')
      console.log(req.body, typeof req.body)
      const doc = req.body || {}

      // res.send(doc)
      // return   
      const _id = ObjectId(doc.id);
      // Query for a movie that has title "Annie Hall"
      const query = { _id: _id };
      const result = await orderCollection.deleteOne(query);
      console.log("check delete ", result)
      if (result.deletedCount === 1) {
        console.log("delete success")
        res.send({
          success: true,
          msg: "Successfully deleted one document.",
          id: doc.id
        })


      } else {
        res.send({
          success: false,
          msg: "Failed to delete",
          id: doc.id
        })
      }

    })
    // ######## 
    // UPDATE STATUS ORDERS
    app.get('/update-order-status/:orderid', async (req, res) => {
      const orderid = req.params.orderid
      console.log('inside find update find -orders', orderid, typeof orderid)
      // res.send(id)
      // return;
      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      const orderObjectId = ObjectId(orderid);
      console.log('object ', orderObjectId)
      // Query for a movie that has title "Annie Hall"
      // const query = { _id: orderObjectId };

      // const options = {
      //   skip: pageNumber * limit || 0,
      //   limit: limit || 0
      // }
      // const count = await orderCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      // const cursor = await orderCollection.findOne(query)
      const filter = { _id: orderObjectId };
      const options = {  };

      const updateDoc = {
        $set: {
          status: 'active'
        },
      };
      const result = await orderCollection.updateOne(filter, updateDoc, options);
      console.log(result)

      // const orderList =result 
      if (result.modifiedCount > 0) {
        res.json({
          success: true


        })
      }
      else {
        res.json({
          success: false

        })
      }

    })

    // UPDATE STATUS ORDERS


    // ######## 
    // delete ./
    //**************************************************************************** ORDERS  */



    //**************************************************************************** PRODUCTS  */
    // collection name 
    const productCollection = db.collection("products");
    // STORE  
    app.post('/products', async (req, res) => {
      console.log('inside post my-orders ')
      console.log(req.body, typeof req.body)
      const doc = req.body || {}
      // res.send()
      // return     
      if (doc) {
        const result = await productCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send({
          success: true,
          msg: `A document was inserted with the _id: ${result.insertedId}`
        })
      } else {
        res.send(
          {
            success: false,
            msg: `Failed to post`
          }
        )
      }
    })
    // ######## 
    // GET MY ORDERS
    // ######## 
    app.get('/products/:id', async (req, res) => {
      const id = req.params.id
      console.log('inside find my-orders', id, typeof id)
      // res.send(id)
      // return;
      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      // const _id = ObjectId(id);
      // Query for a movie that has title "Annie Hall"
      const query = { userId: id };

      const options = {
        skip: pageNumber * limit || 0,
        limit: limit || 0
      }
      const count = await productCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      const cursor = productCollection.find(query, options)

      const orderList = await cursor.toArray()
      if (pageNumber) {

      }
      else {

      }
      res.json({
        count: count,
        orderList: orderList,

      })
    })
    // ######## 
    // GET ALL ORDERS
    // ######## 
    app.get('/products', async (req, res) => {

      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      const query = {}
      const options = {
        skip: pageNumber * limit || 0,
        limit: limit || 0
      }
      const count = await productCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      const cursor = productCollection.find(query, options)

      const productList = await cursor.toArray()
      if (pageNumber) {

      }
      else {

      }
      res.json({
        count: count,
        productList: productList,

      })
    })



    // Heroku deploy
    // delete 


    app.delete('/products', async (req, res) => {
      console.log('inside delete req ')
      console.log(req.body, typeof req.body)
      const doc = req.body || {}

      // res.send(doc)
      // return   
      const _id = ObjectId(doc.id);
      // Query for a movie that has title "Annie Hall"
      const query = { _id: _id };
      const result = await productCollection.deleteOne(query);
      console.log("check delete ", result)
      if (result.deletedCount === 1) {
        console.log("delete success")
        res.send({
          success: true,
          msg: "Successfully deleted one document.",
          id: doc.id
        })


      } else {
        res.send({
          success: false,
          msg: "Failed to delete",
          id: doc.id
        })
      }

    })
    // ######## 
    // UPDATE STATUS ORDERS

    // UPDATE STATUS ORDERS


    // ######## 
    // delete ./
    //**************************************************************************** PRODUCTS  */



    //**************************************************************************** MAKE ADMIN  */
    const userRoleCollection = db.collection("user-role");
    app.post('/make-admin', async (req, res) => {
      console.log("make admin")
      console.log(req.body, typeof req.body)
      console.log(req.body.email, typeof req.body.email)

      // const
      const filter = { email: req.body.email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          email: req.body.email,
          role: "admin"
        },
      };
      const response = await userRoleCollection.updateOne(filter, updateDoc, options);
      console.log(response)

      let result = {}
      if (response.upsertedCount > 0) {
        result["success"] = true
      } else {
        result["success"] = false
      }

      res.send(result)
    })

    // find admin 

    app.post('/find-user-role', async (req, res) => {
      console.log("user role")
      console.log(req.body, typeof req.body)
      // console.log(req.body.email, typeof req.body.email)
      const query = { email: req?.body?.email };
      const options = {}
      const countUserRole = await userRoleCollection.countDocuments(query);
      const findUserRole = await userRoleCollection.findOne(query, options);

      let isAdmin = false
      console.log(findUserRole)
      console.log(countUserRole)
      if (findUserRole?.role === "admin") {
        isAdmin = true;
      }
      // const
      res.send({ isAdmin: isAdmin })
    })


    // find admin 


    //**************************************************************************** MAKE ADMIN  */


    //**************************************************************************** REVIEW USER  */
    const reviewsCollection = db.collection("reviews");
    // ######## 
    // GET ALL ORDERS
    // ######## 
    app.get('/reviews', async (req, res) => {

      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      const query = {}
      const options = {
        skip: pageNumber * limit || 0,
        limit: limit || 0
      }
      const count = await reviewsCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      const cursor = reviewsCollection.find(query, options)

      const productList = await cursor.toArray()
      if (pageNumber) {

      }
      else {

      }
      res.json({
        count: count,
        productList: productList,

      })
    })
    app.post('/r', async (req, res) => {
      console.log('inside reviews ')
      console.log(req.body, typeof req.body)
      const doc = req.body || {}
      // res.send()
      // return     
      if (doc) {
        const result = await reviewsCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send({
          success: true,
          msg: `A document was inserted with the _id: ${result.insertedId}`
        })
      } else {
        res.send(
          {
            success: false,
            msg: `Failed to post`
          }
        )
      }
    })
    //**************************************************************************** REVIEW USER  */






  }
  finally {
    console.log("connection alive")
    // client.close()
    // console.log("Connection closed ")
  }

}
run().catch(console.dir);
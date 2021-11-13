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
        const result = await orderCollection.insertOne(doc);
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
    app.get('/orders/:id', async (req, res) => {
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


    app.delete('/orders', async (req, res) => {
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
      console.log('inside find update find -orders', orderid, typeof id)
      // res.send(id)
      // return;
      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      const orderObjectId = ObjectId(orderid);
      console.log('object ', orderObjectId)
      // Query for a movie that has title "Annie Hall"
      const query = { _id: orderObjectId };

      // const options = {
      //   skip: pageNumber * limit || 0,
      //   limit: limit || 0
      // }
      const count = await orderCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      const cursor = await orderCollection.findOne(query)
      const filter = { _id: orderObjectId };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          orderStatus: 'active'
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





  }
  finally {
    console.log("connection alive")
    // client.close()
    // console.log("Connection closed ")
  }

}
run().catch(console.dir);
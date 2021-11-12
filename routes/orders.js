const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Product Data Data')
})
router.post('/', (req, res) => {
    res.send('New Product Create')
})
router.delete('/', (req, res) => {
    res.send('Product delete')
})


//**************************************************************************** ORDERS  */
// collection name 
const db = client.db(process.env.DB_NAME);
const orderCollection = db.collection("orders");
// store 
app.post('/', async (req, res) => {
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
app.get('/:id', async (req, res) => {
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
app.get('/', async (req, res) => {

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

// delete 


app.delete('/', async (req, res) => {
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




module.exports = router;
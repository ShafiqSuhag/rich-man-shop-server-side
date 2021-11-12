
    app.get('/products', async (req, res) => {

      const limit = parseInt(req.query.size)
      const pageNumber = parseInt(req.query.page)
      console.log("limit - pageNumber", limit, pageNumber)
      const query = {}
      const options = {
        skip: pageNumber * limit || 0,
        limit: limit || 0
      }
      const count = await productsCollection.estimatedDocumentCount();

      // const count = await cursor.count();
      const cursor = productsCollection.find(query, options)

      const tours = await cursor.toArray()
      if (pageNumber) {

      }
      else {

      }
      res.json({
        count: count,
        tours: tours,

      })
    })


    // store 
    app.post('/products', async (req, res) => {
      console.log('inside post req ')
      console.log(req.body, typeof req.body)
      const doc = req.body || {}
      // res.send()
      // return     
      if (doc) {
        const result = await productsCollection.insertOne(doc);
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
    // find servier 
    app.post('/product-details', async (req, res) => {
      console.log('inside tour-details req ')
      console.log(req.body, typeof req.body)
      const doc = req.body || {}
      // res.send()
      // return     
      if (doc) {
        // const result = await tourCollection.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        const query = { _id: ObjectId(doc.id) }
        const options = {}
        const cursor = productsCollection.find(query, options);
        const tourDetails = await cursor.toArray()
        res.send({
          success: true,
          msg: `Result Foound`,
          data: tourDetails
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
      const result = await productsCollection.deleteOne(query);
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
    // delete ./
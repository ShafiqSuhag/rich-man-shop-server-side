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




module.exports = router
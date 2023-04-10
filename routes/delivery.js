const express = require('express')
const router = express.Router()
const { getDeliveries, updateDelivery, deleteDelivery, getDeliveryById, createDelivery} = require('../controllers/delivery')

// GET all deliveries
router.get('/', getDeliveries);
  
  // POST a new delivery
router.post('/', createDelivery);

  //UPDATE a delivery by id
router.put("/:id", updateDelivery);


//DELETE a delivery
router.delete("/:id", deleteDelivery);


  // get delivery by ids
  router.get("/find/:id", getDeliveryById);

module.exports = router
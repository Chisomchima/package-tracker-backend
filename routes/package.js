const express = require('express')
const router = express.Router()
const {
  getPackages,
  updatePackage,
  createPackage,
  deletePackage,
  getPackagebyId,
} = require('../controllers/packages')


// GET all deliveries
router.get('/', getPackages);
  
  // POST a new delivery
router.post('/', createPackage);

  //UPDATE a delivery by id
router.put("/:id", updatePackage);


//DELETE a delivery
router.delete("/:id", deletePackage);


  // GET delivery by ids
  router.get("/find/:id", getPackagebyId);

module.exports = router
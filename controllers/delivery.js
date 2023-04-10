const Delivery = require('../models/Delivery')
const Package = require('../models/Package')

const getDeliveries =  async (req, res) => {
    try {
      const allDelivery = await Delivery.find();
      res.status(200).json(allDelivery);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

const createDelivery = async (req, res) => {
  try {
    // Extract necessary fields from req.body
    const { package_id,  pickup_time, start_time, end_time, location, status } = req.body;

    // Create a new delivery object
    const delivery = new Delivery({
     ...req.body
    });

    // Save the new delivery object
    await delivery.save();

    // Update the corresponding package with the new delivery
    const package = await Package.findByIdAndUpdate(package_id, { active_delivery_id: delivery._id }, { new: true });

    // Return the newly created delivery and the updated package
    res.status(201).json({ delivery: delivery, package: package });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateDelivery = async (req, res) => {
    try {
      const updatedDelivery = await Delivery.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDelivery);
    } catch (err) {
      res.status(500).json(err);
    }
  }

 const deleteDelivery = async (req, res) => {
    try {
      await Delivery.findByIdAndDelete(req.params.id);
      res.status(200).json("Delevery has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
}

const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate('package_id');
    res.status(200).json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  module.exports = { getDeliveries, createDelivery, updateDelivery, deleteDelivery, getDeliveryById }
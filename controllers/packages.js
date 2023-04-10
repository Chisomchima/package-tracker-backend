const Package = require("../models/Package");
const Delivery = require("../models/Delivery");

const getPackages = async (req, res) => {
  try {
    const allPackage = await Package.find();
    res.status(200).json(allPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createPackage = async (req, res) => {
  try {
    const {
      active_delivery_id,
      description,
      weight,
      width,
      depth,
      height,
      from_name,
      from_address,
      to_name,
      to_address,
      from_location,
      to_location,
    } = req.body;
    // create a new package with request body
    const newPackage = await Package.create({ ...req.body });
    await newPackage.save();
    // find the associated delivery by ID
    const delivery = await Delivery.findByIdAndUpdate(
      active_delivery_id,
      { package_id: newPackage._id },
      { new: true }
    );
    // update the active_delivery_id field in the associated delivery
    await delivery.save();

    // return the new package as response
    res.status(201).json({ package: newPackage, delivery: delivery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json("Delevery has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPackagebyId = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id)
      .populate('active_delivery_id')
      .exec();
    res.json(package);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPackages,
  updatePackage,
  createPackage,
  deletePackage,
  getPackagebyId,
};

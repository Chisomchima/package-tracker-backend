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
    const description = req.body.description;
    const weight = req.body.weight;
    const width = req.body.width;
    const depth = req.body.depth;
    const height = req.body.height;
    const fromName = req.body.from_name;
    const fromAddress = req.body.from_address;
    const toName = req.body.to_name;
    const toAddress = req.body.to_address;
    const fromLocation = req.body.from_location;
    const toLocation = req.body.to_location;

    const package = new Package({
      description: description,
      weight: weight,
      width: width,
      depth: depth,
      height: height,
      from_name: fromName,
      from_address: fromAddress,
      to_name: toName,
      to_address: toAddress,
      from_location: fromLocation,
      to_location: toLocation
    });

    await package.save();

    res.status(201).json(package);
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

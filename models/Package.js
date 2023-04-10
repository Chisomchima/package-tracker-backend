const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    active_delivery_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery'},
    description: { type: String, required: true},
    weight: {type: Number },
    width: {type: Number },
    depth: {type: Number },
    height: {type: Number },
    from_name: { type: String },
    from_address: { type: String },
    to_name: { type: String},
    to_address: { type: String },
    from_location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    },
    to_location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", PackageSchema);
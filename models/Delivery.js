const mongoose = require("mongoose");

const statusEnum = ["open", "picked-up", "in-transit", "delivered", "failed"];

const DeliverySchema = new mongoose.Schema(
  {
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package'},
    pickup_time: { type : Date },
    start_time: { type : Date },
    end_time: { type : Date},
    location: {
        lat: {type: Number},
        lng: {type: Number}
    },
    status: {
        type: String,
        enum: statusEnum,
        default: "open"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", DeliverySchema);
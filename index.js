const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
//Import the mongoose module
const mongoose = require("mongoose");
const deliveryRoute = require("./routes/delivery");
const packageRoute = require("./routes/package");
const Delivery = require("./models/Delivery");

dotenv.config();
const cors = require("cors");

app.use(cors({ origin: "*" }));

// set up DB
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// Socket.io config
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://package-tracker-frontend.vercel.app/*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //listen to the status changed event
  socket.on("status_changed", ({ deliveryId, status }) => {
    //check the updated fields
    //     When the status changes from open to picked-up, set
    // the pickup_time to current time
    // When the status changes from picked-up to in-transit,
    // set the start_time to current time
    // When the status changes from in-transit to delivered
    // or failed, set the end_time to current time
    let updateFields = { status: status };
    if (status === "picked-up") {
      updateFields.pickup_time = Date.now();
    } else if (status === "in-transit") {
      updateFields.start_time = Date.now();
    } else if (status === "delivered" || status === "failed") {
      updateFields.end_time = Date.now();
    }
    Delivery.findByIdAndUpdate(
      deliveryId,
      {
        $set: updateFields,
      },
      { new: true },
    )
      .then((updatedDelivery) => {
        //Broadcast the delivery update
        console.log(updatedDelivery, "updatedDelivery");
        socket.broadcast.emit("delivery_updated", updatedDelivery);
      })
      .catch((error) => {
        console.log(`Error updating delivery status: ${error.message}`);
      });
  });
  socket.on("location_changed", ({ deliveryId, location }) => {
    Delivery.findByIdAndUpdate(
      deliveryId,
      {
        $set: {location:location},
      },
      { new: true },
    )
      .then((updatedDelivery) => {
        //Broadcast the Loacation update
        console.log(updatedDelivery, "updatedDelivery");
        socket.broadcast.emit("location_updated", updatedDelivery);
      })
      .catch((error) => {
        console.log(`Error updating delivery status: ${error.message}`);
      });
  });
});

// middlewares
app.use(express.json());
app.use("/api/delivery", deliveryRoute);
app.use("/api/package", packageRoute);

// server connection
let PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

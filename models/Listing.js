const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://thearchitectsdiary.com/wp-content/uploads/2024/07/Flat-In-Pune-10.jpg",
        set: (v) => v === "" ? "https://thearchitectsdiary.com/wp-content/uploads/2024/07/Flat-In-Pune-10.jpg" : v,
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    shopDomain: String,
    bannerText: String,
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
        enum: ["active", "closed", "archive"],
        default: "archive"
    }
});

module.exports = mongoose.model("Banner", bannerSchema);

// models/Token.schema.js
const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    shopDomain: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    scope: { type: String, required: true },
    installedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

TokenSchema.pre("save", function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model("Token", TokenSchema);

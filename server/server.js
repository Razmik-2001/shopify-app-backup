const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/connectDB");
const indexRouter = require('./routes/indexRouter');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', indexRouter);

connectDB()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("DB Connection Error:", err.message));


app.use(express.static(path.join(__dirname, "../client/build")));

app.all(/.*/, (req, res) => {
    res.setHeader(
        "Content-Security-Policy",
        "frame-ancestors https://admin.shopify.com https://*.myshopify.com;"
    );
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log(`Server running on http://localhost:${process.env.PORT || 5000}`));
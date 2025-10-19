const qs = require("querystring");
const crypto = require("crypto");
const axios = require("axios");
const Token = require("../models/Token.schema");
require('dotenv').config();

class AuthController{
    static shopifyAuth(req, res) {
        const shop = req.query.shop;
        if (!shop) return res.status(400).send("Missing shop parameter");

        const redirectUri = `${process.env.FORWARDING_ADDRESS}/auth/callback`;
        const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SCOPES}&redirect_uri=${redirectUri}`;
        res.redirect(installUrl);
    }
    static shopifyAuthCallback = async (req, res)  => {
        const { shop, hmac, code } = req.query;
        if (!shop || !hmac || !code) return res.status(400).send("Missing parameters");

        const params = { ...req.query };
        delete params.hmac;
        delete params.signature;

        const message = qs.stringify(params);
        const generatedHmac = crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET)
            .update(message)
            .digest("hex");

        if (generatedHmac !== hmac) {
            console.log("HMAC validation failed");
            return res.status(400).send("HMAC validation failed");
        }

        try {
            const tokenResponse = await axios.post(
                `https://${shop}/admin/oauth/access_token`,
                {
                    client_id: process.env.SHOPIFY_API_KEY,
                    client_secret: process.env.SHOPIFY_API_SECRET,
                    code,
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            const { access_token, scope } = tokenResponse.data;

            await Token.findOneAndUpdate(
                { shopDomain: shop },
                { accessToken: access_token, scope, installedAt: new Date() },
                { upsert: true, new: true }
            );

            res.redirect(`https://${shop}/admin/apps/${process.env.APP_NAME}/dashboard?shop=${shop}`);
        } catch (error) {
            console.error("Error getting access token:", error.response?.data || error.message);
            res.status(500).send("Failed to get access token");
        }
    }
    static checkToken = async (req, res) => {
        const { shop } = req.query;
        if (!shop) return res.status(400).json({ error: "Missing shop parameter" });

        try {
            const existingShop = await Token.findOne({ shopDomain: shop });
            if (existingShop) {
                res.json({ exists: true, shop: existingShop.shopDomain });
            } else {
                res.json({ exists: false });
            }
        } catch (error) {
            console.error("Error checking token:", error.message);
            res.status(500).json({ error: "Server error" });
        }
    }
}
module.exports = AuthController;
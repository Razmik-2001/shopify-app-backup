const Banner = require("../models/bannerSchema");

class BannerController {
    static async getBanners(req, res) {
        try {
            const banners = await Banner.find({});
            const now = new Date();

            const updatedBanners = await Promise.all(
                banners.map(async (banner) => {
                    const start = new Date(banner.startDate);
                    const end = new Date(banner.endDate);

                    if (now >= start && now <= end) {
                        banner.status = "active";
                    } else {
                        banner.status = "archive";
                    }

                    await banner.save();
                    return banner;
                })
            );
            res.json(updatedBanners);
        } catch (err) {
            console.error("getBanners error:", err);
            res.status(500).json({
                success: false,
                message: "Error getBanners",
            });
        }
    }

    static async createBanner(req, res) {
        try {
            const shopDomain = req.headers["x-shopify-shop-domain"];
            const {bannerText, startDate, endDate} = req.body;
            let ad = await Banner.findOne({shopDomain});

            if (ad) {
                ad.bannerText = bannerText;
                ad.startDate = startDate;
                ad.endDate = endDate;
                ad.status = "archive";
                await ad.save();
            } else {
                ad = new Banner({
                    shopDomain,
                    bannerText,
                    startDate,
                    endDate,
                    status: "archive",
                });
                await ad.save();
            }
            res.json({success: true, ad});
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({success: false, error: "Server error"});
        }
    }

    // static async closeBanner(req, res) {
    //     try {
    //         const shopDomain = req.headers["x-shopify-shop-domain"];
    //         const ad = await Banner.findOne({ shopDomain });
    //         if (!ad) return res.status(404).json({ success: false, error: "Not found" });
    //
    //         ad.status = "closed";
    //         await ad.save();
    //
    //         res.json({ success: true, ad });
    //     } catch (error) {
    //         console.error("Error closing ad:", error);
    //         res.status(500).json({ success: false, error: "Server error" });
    //     }
    // }
}

module.exports = BannerController;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../app/banner/bannerThunk";
import BannerForm from "../../components/UI/bannerForm/BannerForm";
import { IoCloseSharp } from "react-icons/io5";
import "./Dashboard.css";

function Dashboard() {
    const dispatch = useDispatch();
    const [hideBanner, setHideBanner] = useState(false);
    const { banners, loading, error } = useSelector((state) => state.banner);

    useEffect(() => {
        dispatch(getBanners());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const activeBanners = banners?.filter((b) => b.status === "active") || [];
    const archivedBanners = banners?.filter((b) => b.status === "archive") || [];
    const closedBanners = banners?.filter((b) => b.status === "closed") || [];

    if (!banners || banners.length === 0) {
        return <BannerForm />;
    }

    if (closedBanners.length > 0) {
        return null;
    }

    if (archivedBanners.length === banners.length) {
        return <BannerForm />;
    }

    if (activeBanners.length > 0 && !hideBanner) {
        return (
            <div className="banner-wrapper">
                <div className="icon-box">
                    <IoCloseSharp className="icon" onClick={() => setHideBanner(true)} />
                </div>

                {activeBanners.map((banner) => (
                    <div key={banner._id} className="banner-item">
                        <div className="discount-section">
                            <p className="discount-percent">70%</p>
                            <p className="discount-off">OFF</p>
                        </div>

                        <div className="content-area">
                            <div className="black-friday-text">
                                <div className="friday-text">{banner.bannerText}</div>
                            </div>
                        </div>

                        <div className="super-sale-text">
                            <p className="super-text">SUPER</p>
                            <p className="sale-text">SALE</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}

export default Dashboard;

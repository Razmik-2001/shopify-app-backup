import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Home.css";

export default function Home() {
    const { shop } = useSelector((state) => state.shop);
    const [shopDomain, setShopDomain] = useState("");

    const handleInstall = () => {
        const domain = shopDomain.trim() || shop?.trim();

        if (!domain) {
            return alert("Shop name is required!");
        }

        window.location.href = `https://shopify-app-backup.onrender.com/auth?shop=${domain}`;
    };

    useEffect(() => {
        console.log(shop);
    }, [shop]);

    return (
        <div className="home-page">
            <div className="home-content">
                <p className="subtitle">
                    Please enter your Shopify domain to install the application.
                </p>
                <div className="form-group">
                    <input
                        id="shopify-domain"
                        type="text"
                        placeholder="my-store-name.myshopify.com"
                        className="input-field"
                        value={shopDomain}
                        onChange={(e) => setShopDomain(e.target.value)}
                    />
                </div>
                <button className="install-button" onClick={handleInstall}>
                    Install App
                </button>
            </div>
        </div>
    );
}

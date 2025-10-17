import React, {useEffect} from "react";
import {useSelector} from "react-redux";

export default function Home() {
    const {shop} = useSelector((state) => state.shop);
    const handleInstall = () => {
        const shop = prompt("Enter your Shopify store name (e.g. myshop.myshopify.com)");
        if (!shop) return alert("Shop name is required!");
        window.location.href = `https://kinley-subhemispheric-anibal.ngrok-free.dev/auth?shop=${shop}`;
    };

    useEffect(() => {
        console.log(shop);
    })
    return (
        <div>
            <h1>Welcome to Home.jsx</h1>
            <button onClick={handleInstall} primary>
                Install App
            </button>
        </div>
    );
}
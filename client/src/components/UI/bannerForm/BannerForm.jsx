import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBanner, getBanners } from "../../../app/banner/bannerThunk";
import "./BannerForm.css"; // 👈 սովորական CSS

function BannerForm() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        bannerText: "",
        startDate: "",
        endDate: "",
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError(null);

        try {
            await dispatch(createBanner(formData)).unwrap();
            await dispatch(getBanners()).unwrap();
            setFormData({ bannerText: "", startDate: "", endDate: "" });
            setSuccess(true);
        } catch (err) {
            console.error("Failed to create banner:", err);
            setError(err?.message || "Something went wrong!");
        }
    };

    return (
        <div className="banner-container">
            <h2 className="banner-title">Create Banner</h2>

            {success && <div className="banner-message success">Banner added successfully!</div>}
            {error && <div className="banner-message error">{error}</div>}

            <form onSubmit={handleSubmit} className="banner-form">
                <div className="form-group">
                    <label>Banner Text</label>
                    <input
                        type="text"
                        value={formData.bannerText}
                        onChange={(e) => handleChange("bannerText", e.target.value)}
                        placeholder="Enter banner text"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleChange("startDate", e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>End Date</label>
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => handleChange("endDate", e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="banner-button">
                    Save Banner
                </button>
            </form>
        </div>
    );
}

export default BannerForm;

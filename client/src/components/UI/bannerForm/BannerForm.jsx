import React, { useState } from "react";
import "@shopify/polaris/build/esm/styles.css";
import {
    AppProvider,
    Button,
    Form,
    FormLayout,
    TextField,
    Card,
    Banner,
} from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { createBanner , getBanners} from "../../../app/banner/bannerThunk";

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
            setError(err || "Something went wrong!");
        }
    };

    return (
        <AppProvider i18n={{}}>
            <div style={{ width: "500px", margin: "50px auto" }}>
                <Card sectioned>
                    {success && (
                        <Banner
                            title="Banner added successfully!"
                            status="success"
                            onDismiss={() => setSuccess(false)}
                        />
                    )}
                    {error && (
                        <Banner
                            title="Error adding banner"
                            status="critical"
                            onDismiss={() => setError(null)}
                        >
                            <p>{error}</p>
                        </Banner>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <FormLayout>
                            <TextField
                                label="Banner Text"
                                value={formData.bannerText}
                                onChange={(val) => handleChange("bannerText", val)}
                            />

                            <FormLayout.Group>
                                <TextField
                                    type="date"
                                    label="Start Date"
                                    value={formData.startDate}
                                    onChange={(val) => handleChange("startDate", val)}
                                />
                                <TextField
                                    type="date"
                                    label="End Date"
                                    value={formData.endDate}
                                    onChange={(val) => handleChange("endDate", val)}
                                />
                            </FormLayout.Group>

                            <Button submit primary>
                                Save Banner
                            </Button>
                        </FormLayout>
                    </Form>
                </Card>
            </div>
        </AppProvider>
    );
}

export default BannerForm;

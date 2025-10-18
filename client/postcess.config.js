module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 3,
            features: {
                'calc': false, // ❌ անջատում է postcss-calc plugin-ը
            },
        },
    },
};
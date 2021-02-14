function importAll(assets) {
    const images = {};
    assets.keys().forEach((item) => {
        images[item.replace('./', '')] = assets(item);
    });
    return images;
}

export const images = importAll(require.context('./../assets', false, /\.(png|jpe?g|svg)$/));

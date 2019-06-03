const path = require('path');

module.exports = ({ config, mode }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
            presets: [['react-app', { flow: false, typescript: true }]],
        },
    });
    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules.unshift({
        test: /\.frag$/,
        loader: require.resolve('raw-loader'),
        include: path.resolve(__dirname,'../src/shaders/'),
    });
    config.resolve.extensions.push('.frag');

    config.module.rules.unshift({
        test: /\.vert$/,
        loader: require.resolve('raw-loader'),
        include: path.resolve(__dirname,'../src/shaders/'),
    });
    config.resolve.extensions.push('.vert');

    return config;
};

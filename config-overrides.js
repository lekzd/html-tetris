/* config-overrides.js */
const path = require('path');

module.exports = function override(config, env) {

    const {oneOf} = config.module.rules.find(rule => rule.oneOf);
    const {exclude} = oneOf.find(rule => Array.isArray(rule.exclude));

    exclude.push(/\.frag$/, /\.vert$/);

    config.module.rules.push({
        test: /\.frag$/,
        use: 'raw-loader',
        include: path.resolve(__dirname,'./src/shaders/'),
    });
    config.resolve.extensions.push('.frag');

    config.module.rules.push({
        test: /\.vert$/,
        use: 'raw-loader',
        include: path.resolve(__dirname,'./src/shaders/'),
    });
    config.resolve.extensions.push('.vert');

    return config;
};

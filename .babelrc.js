/**
 * @file .babelrc.js
 */

const plugins = [
    '@babel/plugin-proposal-export-default-from'
];

module.exports = {
    'env': {

        'development': {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        useBuiltIns: 'usage',
                        corejs: 3
                    }
                ],
                '@babel/preset-react'
            ],
            plugins
        },

        'test': {
            'presets': [
                '@babel/preset-env',
                '@babel/preset-react'
            ],
            plugins
        }

    }
};

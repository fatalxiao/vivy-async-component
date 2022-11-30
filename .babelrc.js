/**
 * @file .babelrc.js
 */

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
            ]
        },

        'test': {
            'presets': [
                '@babel/preset-env',
                '@babel/preset-react'
            ]
        }

    }
};

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: 'eslint:recommended',
    plugins: ['html', 'vue', 'prettier', 'import'],
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    },
    globals: {
        location: true,
        setTimeout: true,
        setInterval: true,
        clearInterval: true,
        Promise: true,
        document: true,
        window: true,
        module: true,
        console: true,
        require: true,
        process: true,
        __dirname: true
    }
};
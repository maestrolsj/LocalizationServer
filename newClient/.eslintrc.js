// .eslintrc.js
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // the TypeScript parser we installed earlier
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        'eslint:recommended', // eslint default rules
        'plugin:@typescript-eslint/eslint-recommended', // eslint TypeScript rules (github.com/typescript-eslint/typescript-eslint)
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended', // eslint react rules (github.com/yannickcr/eslint-plugin-react)
        'plugin:jsx-a11y/recommended', // accessibility plugin
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'prettier/@typescript-eslint', // Prettier plugin and recommended rules
    ],
    plugins: ['prettier'],
    rules: {
        // Place to specify ESLint rules.
        // Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        '@typescript-eslint/camelcase': 'off',
        'react/prop-types': 'off', // We turn off prop-types rule, as we will use TypeScript's types instead.
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
            { usePrettierrc: true },
        ],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-empty-interface': 'warn',
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
        'react/boolean-prop-naming': ['error', { rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],
    },
    env: {
        node: true,
        jest: true,
    },
};

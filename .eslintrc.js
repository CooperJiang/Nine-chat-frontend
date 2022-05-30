module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ['plugin:vue/recommended', 'airbnb-base', 'eslint-config-prettier'],
	plugins: ['import', 'eslint-plugin-prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'prettier/prettier': 2,
		'global-require': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'no-console': 2,
		'func-names': 0,
		'no-param-reassign': 0,
		'import/no-extraneous-dependencies': 0,
		'import/prefer-default-export': 0,
		'vue/no-v-html': 0,
		'import/no-cycle': 0,
		'consistent-return': 0,
		'no-return-assign': 0,
		'no-shadow': 0,
		'prefer-rest-params': 0,
		'no-plusplus': 0,
		'no-useless-escape': 0,
		radix: 0,
		camelcase: 0,
		'vue/multi-word-component-names': 0,
		'no-restricted-syntax': 0,
		'vue/no-template-shadow': 0,
		'no-unused-expressions': [
			2,
			{
				allowShortCircuit: true,
				allowTernary: true
			}
		],
		'no-tabs': [
			2,
			{
				allowIndentationTabs: true
			}
		]
	},
	globals: {
		log: true
	}
};

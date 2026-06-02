import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
	{
		ignores: [".next/**", "node_modules/**", "*.config.mjs", "*.config.js"],
	},
	...tseslint.configs.recommendedTypeChecked,
	prettier,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-misused-promises": "error",
		},
	}
);

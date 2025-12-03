/** @type {import("prettier").Config} */
export default {
	semi: false,
	useTabs: true,
	singleQuote: false,
	overrides: [
		{
			files: "*.json",
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
}

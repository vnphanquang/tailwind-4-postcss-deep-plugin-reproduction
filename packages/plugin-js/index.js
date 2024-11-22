import createPlugin from "tailwindcss/plugin.js";

export default createPlugin((api) => {
	api.addUtilities({
		".test": {
			background: "red",
			width: "10rem",
			height: "10rem",
		},
	});
});

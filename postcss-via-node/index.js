import path from "path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const css = String.raw;
const html = String.raw;

const result = await postcss([
	tailwindcss({
		content: [
			{
				raw: html`<div class="test"></div>`,
			},
		],
	}),
]).process(
	css`
		@tailwind utilities;
		@import "design-system/css";
	`,
	{
		from: path.resolve(import.meta.url),
	},
);

console.log(result.css);

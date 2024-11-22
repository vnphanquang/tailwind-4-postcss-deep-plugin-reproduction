# Reproduction - TailwindCSS as PostCSS plugin in Vite context - Cannot resolve deep plugin imports

See https://github.com/tailwindlabs/tailwindcss/issues/14973#issuecomment-2480498783 for discussion.

## Reproduction

1. Clone this repo
2. Install dependencies with `pnpm install` (project is using pnpm workspace)
3. Run build script within `postcss-via-vite` directory and observe terminal output

   ```sh
   cd postcss-via-vite
   pnpm build
	 ```

Expected output: `plugin-js` should resolve successfully, build should succeed

Actual output: error during build, as follows

```
error during build:
[vite:css] [postcss] Can't resolve 'plugin-js' in '[...truncated...]/tailwind-4-postcss/postcss-via-vite'
file: [...truncated...]/tailwind-4-postcss/postcss-via-vite/style.css:undefined:NaN
    at finishWithoutResolve ([...truncated...]/tailwind-4-postcss/node_modules/.pnpm/enhanced-resolve@5.17.1/node_modules/enhanced-resolve/lib/Resolver.js:564:18)
    at [...truncated...]/tailwind-4-postcss/node_modules/.pnpm/enhanced-resolve@5.17.1/node_modules/enhanced-resolve/lib/Resolver.js:656:15
    at [...truncated...]/tailwind-4-postcss/node_modules/.pnpm/enhanced-resolve@5.17.1/node_modules/enhanced-resolve/lib/Resolver.js:718:5
    at eval (eval at create ([...truncated...]/tailwind-4-postcss/node_modules/.pnpm/tapable@2.2.1/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)
    at [...truncated...]/tailwind-4-postcss/node_modules/.pnpm/enhanced-resolve@5.17.1/node_modules/enhanced-resolve/lib/Resolver.js:718:5
    at eval (eval at create ([...truncated...]/tailwind-4-postcss/node_modules/.pnpm/tapable@2.2.1/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:27:1)
    at [...truncated...]/tailwind-4-postcss/node_modules/.pnpm/enhanced-resolve@5.17.1/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:89:43
    at [...truncated...]/tailwind-4-postcss/node_modules/.pnpm/enhanced-resolve@5.17.1/node_modules/enhanced-resolve/lib/Resolver.js:718:5
    at eval (eval at create ([...truncated...]/tailwind-4-postcss/node_modules/.pnpm/tapable@2.2.1/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)
    at [...truncated...]/tailwind-4-postcss/node_modules/.pnpm/enhanced-resolve@5.17.1/node_modules/enhanced-resolve/lib/Resolver.js:718:5
 ELIFECYCLE  Command failed with exit code 1.
```

## Setup Details

This is a monorepo setup that represents a simplified version of deep dependencies between multiple packages / apps in real-world use cases.

1. `postcss-via-vite` uses Tailwind as a Postcss plugin in Vite context. It imports `design.css` from the `design-system` package.
2. `design-system` uses `plugin-js` as one of its dependency.

> [!IMPORTANT]
> The issue only occurs specifically in Vite context. When running `postcss` with `@tailwindcss/postcss` directly in node, `plugin-js` is correctly resolved.

import { jsx }from 'rollup-plugin-jsx';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

export default fs
.readdirSync(path.join(__dirname, "webviews", "pages"))
.map((input) => {
    const name = input.split(".")[0];
    return {
    input: "webviews/pages/" + input,
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "out/compiled/" + name + ".js",
    },
    plugins: [
        jsx({
            factory: 'React.createElement'
        }),
        css({ output: name + ".css"}),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
        browser: true,
        dedupe: ["svelte"],
        }),
        commonjs(),
        typescript({
        tsconfig: "webviews/tsconfig.json",
        sourceMap: !production,
        inlineSources: !production,
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        // !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        // !production && livereload("public"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
    };
});








// export default {
//     input: 'src/index.ts',
//     output: [
//         {
//             file: packageJson.main,
//             format: 'cjs',
//             sourcemap: true,
//             name: 'react-lib'
//         },
//         {
//             file: packageJson.module,
//             format: 'esm',
//             sourcemap: true
//         }
//     ],
//     plugins: [
//         external(),
//         resolve(),
//         commonjs(),
//         typescript({ tsconfig: './tsconfig.json' }),
//         postcss(),
//         terser()
//     ]
// };
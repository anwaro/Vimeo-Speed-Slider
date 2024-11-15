const minify = (input) => {
    const replaces = {
        __webpack_require__: '_require',
        __webpack_exports__: '_exports',
        __webpack_modules__: '_modules',
        __webpack_unused_export__: '_unused_export',
        __webpack_module_cache__: '_module_cache',
        __unused_webpack_module: '_unused_module',
        __WEBPACK_DEFAULT_EXPORT__: '_default_export',
    };

    const replaceInCode = (code, pattern, factory) => {
        return code.replace(pattern, (...args) => {
            const key = args[0];
            if (!(key in replaces)) {
                replaces[key] = factory(...args);
            }
            return replaces[key];
        });
    };

    let code = Object.values(input).join('\n');
    // remove comment
    code = code.replace(/\/\*.*?\*\//g, '');
    code = code.replace(/\/\/ [^=@].*/g, '');

    // replace static
    Object.entries(replaces).map(([pattern, replacer]) => {
        code = code.replaceAll(pattern, replacer);
    });

    // replace file name
    code = replaceInCode(
        code,
        /".*?\/(?<name>[^/]+)\.(?<ext>css|js|ts)"/g,
        (...args) => {
            let index = 0;
            let name = '';
            const groups = args[args.length - 1];
            do {
                const suffix = index ? `_${index}` : '';
                name = `"${groups.name}${suffix}.${groups.ext}"`;
                index++;
            } while (Object.values(replaces).includes(name));
            return name;
        },
    );

    return {code};
};

module.exports = minify;

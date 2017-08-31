'use strict';

const crypto = require('crypto');

const defaultHashOptions = {
    method: 'sha256',
    shrink: 8
};

const getHash = (content, options) => {
    if (typeof options.method === 'function') {
        return options.method(content);
    }

    try {
        const hashFunc = crypto.createHash(options.method);

        return hashFunc.update(content)
        .digest('hex');
    } catch (e) {
        return null;
    }
};

module.exports = function(content, options) {
    options = options || defaultHashOptions;

    let hash = getHash(content, options);

    if (hash == null) {
        // bad hash method; fallback to defaults
        // TODO: warning/error reporting?
        hash = getHash(content, defaultHashOptions);
    }

    return options.shrink ? hash.substr(0, options.shrink) : hash;
};

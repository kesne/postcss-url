const calcHash = require('../../src/lib/hash');
const fs = require('fs');

describe('hash', () => {
    const fileContent = fs.readFileSync('test/fixtures/pixel.gif');

    it('should calc hash with default params (sha256 and shrink=8)', () => {
        assert.equal(calcHash(fileContent), '09d46019');
    });

    it('should calc hash (sha256 and shrink=16)', () => {
        const options = {
            method: 'sha256',
            shrink: 16
        };

        assert.equal(calcHash(fileContent, options), '09d46019c7a75b96');
    });

    it('should calc hash with custom function', () => {
        const options = {
            method: () => '12345',
            shrink: 3
        };

        assert.equal(calcHash(fileContent, options), '123');
    });

    it('should calc hash with crypto method', () => {
        const options = {
            method: 'sha256',
            shrink: 16
        };

        assert.equal(calcHash(fileContent, options), '09d46019c7a75b96');
    });
});

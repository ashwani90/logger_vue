const generalHelper = require('../helpers/generalHelper');

describe('test generate random string function', () => {
    it('generate random string', () => {

        let str = generalHelper.generateRandomString(8);
        console.log(str);
        expect(str.length).toEqual(8);
    });
});
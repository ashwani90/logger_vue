const generateRandomString = (stringLength) => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    let generatedString = '';
    for (let i =0; i< stringLength; i++) {
        generatedString += (str[Math.floor((Math.random() * str.length))]).toString();
    }

    return generatedString;
};

module.exports = {
    generateRandomString: generateRandomString
};
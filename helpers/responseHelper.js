const standarErrorResponse = (message, code, res) => {

    res.statusCode = code;
    return res.send({
        success: false,
        data: message
    });
};

const standardSuccessResponse = (data, res) => {
    res.statusCode = 200;
    res.send({
        success: true,
        data: data
    });
};

module.exports = {
    standarErrorResponse: standarErrorResponse,
    standardSuccessResponse: standardSuccessResponse
};
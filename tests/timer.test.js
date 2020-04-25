const timer = require("../services/Validations/timeValidator");


describe('Test time validator for 24 hour format conversion', () => {
    it('to convert 12 hour format to 24 hour format', () => {

        let dataArray = ["12:22 PM", "12:22 AM", "11:22 PM", "01:22 AM", "09:22 PM", "09:22 AM"];
        let expectedArray = ["12:22", "00:22", "23:22", "01:22", "21:22", "09:22"];

        for (let i = 0; i<dataArray.length; i++) {
            let data = timer.convertTo24HourFormat(dataArray[i]);

            expect(data).toEqual(expectedArray[i]);
        }
    });
});

describe('Test time difference function', () => {
    it("test the time different get function", () => {
        let timeDiff = timer.getTimeDiff("23:10", "23:12");

        expect(timeDiff).toEqual(2);
        let timeDiff1 = timer.validateTimeDiff("23:10", "23:12");
        expect(timeDiff1).toEqual(true);
        let timeDiff2 = timer.validateTimeDiff("23:10", "23:12", 3);
        expect(timeDiff2).toEqual(false);
    })
});
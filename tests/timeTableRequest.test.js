const timer = require("../services/Validations/RequestValidator/timeTableValidator");


describe('Test valid format of time slots', () => {
    it('checks validity of time slots', () => {

        let timeSlots =  [
            {
                "fromTime": "07:20 AM",
                "toTime": "08:30 AM",
                "taskName": "Book Reading"
            },
            {
                "fromTime": "09:20 AM",
                "toTime": "10:30 AM",
                "taskName": "Programming"
            },
            {
                "fromTime": "10:30 AM",
                "toTime": "11:30 AM",
                "taskName": "Meeting"
            }
        ];
        let data = timer.validateTimeSlots(timeSlots);

            expect(data).toEqual(true);
    });
});
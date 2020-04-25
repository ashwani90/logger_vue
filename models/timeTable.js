const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// the rules here are simple if a timtable is created you can not modify it for now
// later on we will give a feature of editing the time table

const timeSlotSchema = new Schema({ fromTime: String, toTime: String, taskName: String });

const timeTableSchema = new Schema({
    timeSlots: [timeSlotSchema],
    // Later on I will add the user id here so as to specify who created this
    isActive: Boolean,
    description: String,
}, { timestamps: true });

// Create a model using schema
let TimeTable = mongoose.model("timeTable", timeTableSchema);

// make this model available
module.exports = TimeTable;


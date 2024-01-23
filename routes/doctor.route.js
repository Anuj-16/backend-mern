const express = require("express");
require("dotenv").config();

const {AppointmentModel} = require("../models/doctor.model");

const appointmentControl = express.Router();

appointmentControl.get("/", async (req,res) => {
    const appoint = await AppointmentModel.find()
    res.send(appoint)
})

appointmentControl.post("/create", async (req,res) => {
    try {
        const newAppointment = new AppointmentModel(req.body);
        await newAppointment.save();
        res.send("Appointment Successfull")
    } catch (error) {
        console.log(error);
        res.send("Something wrong")
    }
})

appointmentControl.delete("/delete/:appointmentId",async (req, res) => {
    const {appointmentId} = req.params;
    const deleteAppointment = await AppointmentModel.findByIdAndDelete({_id : appointmentId, userId: req.body.userId});
    if(deleteAppointment){
        res.send("deleted")

    }else{
        res.send("couldn't deleted")
    }
})

module.exports = {appointmentControl}
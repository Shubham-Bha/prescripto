import validator from "validator";
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import { response } from "express";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    // checking for all data to add doctor

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !address ||
      !fees
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email formate
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // validating strong passward
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // **Checking for duplicate email**
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({
        success: false,
        message: "Email already exists. Please use a different email.",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to clodinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      experience,
      degree,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

// API for admin login

const loginAdmin = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECREAT);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credential" });
    }
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

// API to get all doctors List for admin panal

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password'); // Excluding passwords
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req,res) =>{
  try {
    const appointments = await appointmentModel.find({})
    res.json({success:true,appointments})
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
// APIfor appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;

    const docterData = await doctorModel.findById(docId);

    let slots_booked = docterData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get Dashboard data for admin panel
const adminDashboard = async (req,res) =>{
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})
  } catch (error) {
    onsole.log(error);
    res.json({ success: false, message: error.message });
  }
}
export { addDoctor, loginAdmin ,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard};

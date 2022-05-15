import mongoose from "mongoose";
import Tour from "../models/Tour.js";

export const addTour = async (req, res) => {
  const tour = req.body;
  const newTour = new Tour({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({
      message: "Something Went Wrong",
    });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(404).json({
      message: "Something Went Wrong",
    });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findById(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({
      message: "Something Went Wrong",
    });
  }
};

export const getToursByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "User doesn't not exists",
    });
  }
  const userTours = await Tour.find({ creator: id });
  res.status(200).json(userTours);
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: `No tour exist with id ${id}`,
      });
    }
    await Tour.findByIdAndRemove(id);
    res.status(200).json({
      message: "Tour deleted Succesfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "Something Went Wrong",
    });
  }
};
export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, desc, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: `No tour exist with id ${id}`,
      });
    }
    const updatedTour = {
      creator,
      title,
      desc,
      tags,
      imageFile,
      _id: id,
    };
    await Tour.findByIdAndUpdate(id, updatedTour, { new: true });
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(404).json({
      message: "Something Went Wrong",
    });
  }
};

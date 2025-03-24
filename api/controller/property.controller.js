const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PropertyModel = require("../model/property");
const UserModel = require("../model/user");
const cloudinary = require("cloudinary").v2;

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperty = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType_like = "",
  } = req.query;

  const query = {};

  if (title_like !== "") {
    query.title = { $regex: title_like, $options: "i" };
  }

  if (propertyType_like !== "") {
    query.propertyType = propertyType_like;
  }

  try {
    const count = await PropertyModel.countDocuments({ query });
    const properties = await PropertyModel.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order === "asc" ? 1 : -1 });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json({ properties: properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyExits = await PropertyModel.findById(id).populate("creator");
    if (!propertyExits) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "success", property: propertyExits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await UserModel.findOne({ email }).session(session);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = new PropertyModel({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperty.push(newProperty);

    await user.save({ session });
    await newProperty.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;
    const { id } = req.params;

    const photoUrl = await cloudinary.uploader.upload(photo);
    await PropertyModel.findById(
      { _id: id },
      {
        title,
        description,
        propertyType,
        location,
        price,
        photo: photoUrl || photo,
      }
    );

    res.status(200).send({ message: "Property updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyExits = await PropertyModel.findById(id).populate("creator");
    if (!propertyExits) {
      return res.status(404).json({ message: "Property not found" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    await PropertyModel.deleteOne({ _id: id }, { session });
    propertyExits.creator.allProperty.pull(propertyExits);
    await propertyExits.creator.save({ session });
    await session.commitTransaction();

    res.status(200).send({ message: "Property removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProperty,
  getPropertyDetail,
  createProperty,
  updateProperty,
  removeProperty,
};

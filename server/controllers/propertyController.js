import Property from '../models/Property.js';

// @desc    Get all properties
export const getAllProperties = async (req, res) => {
  const properties = await Property.find().populate('owner', 'name email');
  res.json(properties);
};

// @desc    Get single property
export const getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
};

// @desc    Create property
export const createProperty = async (req, res) => {
  const newProperty = new Property({ ...req.body, owner: req.user._id });
  const saved = await newProperty.save();
  res.status(201).json(saved);
};

// @desc    Update property
export const updateProperty = async (req, res) => {
  const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @desc    Delete property
export const deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: 'Property deleted' });
};

import { Contact } from "../models/Contact Us.models.js";

// Create
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read (All or One)
export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ error: "Not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

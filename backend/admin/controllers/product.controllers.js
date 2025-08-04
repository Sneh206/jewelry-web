import { Contact } from "../models/Contact Us.models.js";
import { Product } from "../models/product.models.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file?.filename;


    const newProduct = new Product({ title, description, price, category, image });
    await newProduct.save();

    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Controller: editProduct
export const editProduct = async (req, res) => {
  try {
    const { title, description, price, category, status, imageUrl } = req.body;
    const image = req.file?.filename;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.status = status || product.status;
    product.imageUrl = imageUrl || product.imageUrl;
    if (image) product.image = image;

    await product.save();
    res.json({ message: "Product updated", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error editing product", error });
  }
};

export const deleteJewelry = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Product.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "prodect item not found" });
    }

    res.status(200).json({ message: "prodect item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleteJewelry : ", error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// contact us
export const createContact = async (req, res) => {
  try {
    const { Name, Email, Phone, Subject, Message } = req.body;

    if (!Name || !Email || !Phone || !Subject || !Message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const contact = await Contact.create({ Name, Email, Phone, Subject, Message });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully!",
      contact,
    });
  } catch (error) {
    console.error("Contact creation error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const statusdata = async (req,res) => {
try {
    const { status } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ status: product.status });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Latest Products
export const getLatestProducts = async (req, res) => {
  try {
    const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.status(200).json(latestProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch latest products", error });
  }
};

export const photo = async(req,res) => {
   try {
    const latestProducts = await Product.find().sort({ createdAt: 1 }).limit(12);
    res.status(200).json(latestProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch latest products", error });
  }
}


export const filter = async (req, res) => {
  try {
    const { title, maxPrice, category } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' }; // case-insensitive search
    }

    if (category) {
      query.category = category;
    }

    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error('Filter error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const oneproduct = async(req,res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
}

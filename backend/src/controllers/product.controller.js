const Product = require("../models/Product");
const { imagekit } = require("../config/imagekit");

// Helper — ImageKit pe ek file upload karo
const uploadToImageKit = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: fileBuffer,
        fileName: fileName,
        folder: "/veltorn/products",
        useUniqueFileName: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

// Helper — ImageKit se file delete karo (fileId chahiye)
const deleteFromImageKit = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
  } catch (err) {
    console.error("ImageKit delete error:", err.message);
  }
};

// ============================================================
// @GET /api/products  — All products with filters + pagination
// ============================================================
const getAllProducts = async (req, res) => {
  try {
    const { category, anime, badge, search, sort, page = 1, limit = 12 } = req.query;
    const filter = { isActive: true };

    if (category && category !== "All") filter.category = category;
    if (anime) filter.animeTag = anime;
    if (badge) filter.badge = badge;
    if (search) filter.name = { $regex: search, $options: "i" };

    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================================
// @GET /api/products/:id
// ============================================================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================================
// @POST /api/products  — Admin only
// ============================================================
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, animeTag, sizes, badge, brand, stock } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "name, price, description, category are required" });
    }

    // ImageKit pe saari images upload karo
    const imageData = []; // { url, fileId } store karenge
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToImageKit(file.buffer, file.originalname);
        imageData.push({ url: result.url, fileId: result.fileId });
      }
    }

    const product = await Product.create({
      name,
      price: Number(price),
      description,
      category,
      animeTag: animeTag || null,
      sizes: sizes ? JSON.parse(sizes) : ["S", "M", "L", "XL", "XXL"],
      badge: badge || "NEW",
      brand: brand || "VELTORN",
      stock: stock ? Number(stock) : 100,
      images: imageData.map((d) => d.url),       // URLs frontend ke liye
      imageFileIds: imageData.map((d) => d.fileId), // FileIds delete ke liye
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================================
// @PUT /api/products/:id  — Admin only
// ============================================================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, description, category, animeTag, sizes, badge, brand, stock, isActive } = req.body;

    // Naye images upload ho toh add karo
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToImageKit(file.buffer, file.originalname);
        product.images.push(result.url);
        product.imageFileIds.push(result.fileId);
      }
    }

    if (name) product.name = name;
    if (price) product.price = Number(price);
    if (description) product.description = description;
    if (category) product.category = category;
    if (animeTag !== undefined) product.animeTag = animeTag || null;
    if (sizes) product.sizes = JSON.parse(sizes);
    if (badge) product.badge = badge;
    if (brand) product.brand = brand;
    if (stock !== undefined) product.stock = Number(stock);
    if (isActive !== undefined) product.isActive = isActive === "true" || isActive === true;

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================================
// @DELETE /api/products/:id  — Admin only (product + all images)
// ============================================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ImageKit se saari images delete karo
    if (product.imageFileIds && product.imageFileIds.length > 0) {
      for (const fileId of product.imageFileIds) {
        await deleteFromImageKit(fileId);
      }
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================================
// @DELETE /api/products/:id/image  — Remove single image (Admin)
// Body: { imageUrl: "...", fileId: "..." }
// ============================================================
const deleteProductImage = async (req, res) => {
  try {
    const { imageUrl, fileId } = req.body;

    if (!imageUrl || !fileId)
      return res.status(400).json({ message: "imageUrl and fileId both required" });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ImageKit se delete karo
    await deleteFromImageKit(fileId);

    // DB se remove karo
    product.images = product.images.filter((img) => img !== imageUrl);
    product.imageFileIds = product.imageFileIds.filter((id) => id !== fileId);
    await product.save();

    res.json({ message: "Image deleted successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
};
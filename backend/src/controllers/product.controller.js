// // const Product = require("../models/Product");
// // const { imagekit } = require("../config/imagekit");

// // // Helper — ImageKit pe ek file upload karo
// // const uploadToImageKit = (fileBuffer, fileName) => {
// //   return new Promise((resolve, reject) => {
// //     imagekit.upload(
// //       {
// //         file: fileBuffer,
// //         fileName: fileName,
// //         folder: "/veltorn/products",
// //         useUniqueFileName: true,
// //       },
// //       (error, result) => {
// //         if (error) reject(error);
// //         else resolve(result);
// //       }
// //     );
// //   });
// // };

// // // Helper — ImageKit se file delete karo (fileId chahiye)
// // const deleteFromImageKit = async (fileId) => {
// //   try {
// //     await imagekit.deleteFile(fileId);
// //   } catch (err) {
// //     console.error("ImageKit delete error:", err.message);
// //   }
// // };

// // // ============================================================
// // // @GET /api/products  — All products with filters + pagination
// // // ============================================================
// // const getAllProducts = async (req, res) => {
// //   try {
// //     const { category, anime, badge, search, sort, page = 1, limit = 12 } = req.query;
// //     const filter = { isActive: true };

// //     if (category && category !== "All") filter.category = category;
// //     if (anime) filter.animeTag = anime;
// //     if (badge) filter.badge = badge;
// //     if (search) filter.name = { $regex: search, $options: "i" };

// //     let sortOption = { createdAt: -1 }; // Default: newest first
// //     if (sort === "price_asc") sortOption = { price: 1 };
// //     if (sort === "price_desc") sortOption = { price: -1 };

// //     const skip = (parseInt(page) - 1) * parseInt(limit);
// //     const total = await Product.countDocuments(filter);
// //     const products = await Product.find(filter)
// //       .sort(sortOption)
// //       .skip(skip)
// //       .limit(parseInt(limit));

// //     res.json({
// //       products,
// //       total,
// //       page: parseInt(page),
// //       pages: Math.ceil(total / parseInt(limit)),
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ============================================================
// // // @GET /api/products/:id
// // // ============================================================
// // const getProductById = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: "Product not found" });
// //     res.json(product);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ============================================================
// // // @POST /api/products  — Admin only
// // // ============================================================
// // const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, description, category, animeTag, sizes, badge, brand, stock } = req.body;

// //     if (!name || !price || !description || !category) {
// //       return res.status(400).json({ message: "name, price, description, category are required" });
// //     }

// //     // ImageKit pe saari images upload karo
// //     const imageData = []; // { url, fileId } store karenge
// //     if (req.files && req.files.length > 0) {
// //       for (const file of req.files) {
// //         const result = await uploadToImageKit(file.buffer, file.originalname);
// //         imageData.push({ url: result.url, fileId: result.fileId });
// //       }
// //     }

// //     const product = await Product.create({
// //       name,
// //       price: Number(price),
// //       description,
// //       category,
// //       animeTag: animeTag || null,
// //       sizes: sizes ? JSON.parse(sizes) : ["S", "M", "L", "XL", "XXL"],
// //       badge: badge || "NEW",
// //       brand: brand || "VELTORN",
// //       stock: stock ? Number(stock) : 100,
// //       images: imageData.map((d) => d.url),       // URLs frontend ke liye
// //       imageFileIds: imageData.map((d) => d.fileId), // FileIds delete ke liye
// //     });

// //     res.status(201).json({ message: "Product created successfully", product });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ============================================================
// // // @PUT /api/products/:id  — Admin only
// // // ============================================================
// // const updateProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: "Product not found" });

// //     const { name, price, description, category, animeTag, sizes, badge, brand, stock, isActive } = req.body;

// //     // Naye images upload ho toh add karo
// //     if (req.files && req.files.length > 0) {
// //       for (const file of req.files) {
// //         const result = await uploadToImageKit(file.buffer, file.originalname);
// //         product.images.push(result.url);
// //         product.imageFileIds.push(result.fileId);
// //       }
// //     }

// //     if (name) product.name = name;
// //     if (price) product.price = Number(price);
// //     if (description) product.description = description;
// //     if (category) product.category = category;
// //     if (animeTag !== undefined) product.animeTag = animeTag || null;
// //     if (sizes) product.sizes = JSON.parse(sizes);
// //     if (badge) product.badge = badge;
// //     if (brand) product.brand = brand;
// //     if (stock !== undefined) product.stock = Number(stock);
// //     if (isActive !== undefined) product.isActive = isActive === "true" || isActive === true;

// //     await product.save();
// //     res.json({ message: "Product updated successfully", product });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ============================================================
// // // @DELETE /api/products/:id  — Admin only (product + all images)
// // // ============================================================
// // const deleteProduct = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: "Product not found" });

// //     // ImageKit se saari images delete karo
// //     if (product.imageFileIds && product.imageFileIds.length > 0) {
// //       for (const fileId of product.imageFileIds) {
// //         await deleteFromImageKit(fileId);
// //       }
// //     }

// //     await product.deleteOne();
// //     res.json({ message: "Product deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ============================================================
// // // @DELETE /api/products/:id/image  — Remove single image (Admin)
// // // Body: { imageUrl: "...", fileId: "..." }
// // // ============================================================
// // const deleteProductImage = async (req, res) => {
// //   try {
// //     const { imageUrl, fileId } = req.body;

// //     if (!imageUrl || !fileId)
// //       return res.status(400).json({ message: "imageUrl and fileId both required" });

// //     const product = await Product.findById(req.params.id);
// //     if (!product) return res.status(404).json({ message: "Product not found" });

// //     // ImageKit se delete karo
// //     await deleteFromImageKit(fileId);

// //     // DB se remove karo
// //     product.images = product.images.filter((img) => img !== imageUrl);
// //     product.imageFileIds = product.imageFileIds.filter((id) => id !== fileId);
// //     await product.save();

// //     res.json({ message: "Image deleted successfully", product });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // module.exports = {
// //   getAllProducts,
// //   getProductById,
// //   createProduct,
// //   updateProduct,
// //   deleteProduct,
// //   deleteProductImage,
// // };




// const Product = require("../models/Product");
// const { imagekit } = require("../config/imagekit");

// // Helper — ImageKit pe ek file upload karo
// const uploadToImageKit = (fileBuffer, fileName) => {
//   return new Promise((resolve, reject) => {
//     imagekit.upload(
//       {
//         file: fileBuffer,
//         fileName: fileName,
//         folder: "/veltorn/products",
//         useUniqueFileName: true,
//       },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );
//   });
// };

// const deleteFromImageKit = async (fileId) => {
//   try {
//     await imagekit.deleteFile(fileId);
//   } catch (err) {
//     console.error("ImageKit delete error:", err.message);
//   }
// };

// // ============================================================
// // @GET /api/products  — All products with filters + pagination
// // KEY FIX: No category param = ALL products (Shop All)
// //          category param present = filter by that category only
// // ============================================================
// const getAllProducts = async (req, res) => {
//   try {
//     const { category, anime, badge, search, sort, page = 1, limit = 12 } = req.query;
//     const filter = { isActive: true };

//     // ── CATEGORY FILTER ─────────────────────────────────────
//     // Only filter by category if:
//     // 1. category param is present in request
//     // 2. AND it's not "All" (client might send "All" explicitly)
//     if (category && category !== "All") {
//       filter.category = category;
//     }
//     // If NO category param → no filter → all products returned

//     // ── ANIME FILTER ─────────────────────────────────────────
//     // anime param = specific series e.g. "Naruto"
//     // When filtering by anime, also restrict to Anime category
//     if (anime) {
//       filter.animeTag = anime;
//       filter.category = "Anime"; // Anime products only
//     }

//     if (badge) filter.badge = badge;
//     if (search) filter.name = { $regex: search, $options: "i" };

//     let sortOption = { createdAt: -1 };
//     if (sort === "price_asc") sortOption = { price: 1 };
//     if (sort === "price_desc") sortOption = { price: -1 };

//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const total = await Product.countDocuments(filter);
//     const products = await Product.find(filter)
//       .sort(sortOption)
//       .skip(skip)
//       .limit(parseInt(limit));

//     res.json({
//       products,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / parseInt(limit)),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ============================================================
// // @GET /api/products/:id
// // ============================================================
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ============================================================
// // @POST /api/products  — Admin only
// // ============================================================
// const createProduct = async (req, res) => {
//   try {
//     const { name, price, description, category, animeTag, sizes, badge, brand, stock } = req.body;

//     if (!name || !price || !description || !category) {
//       return res.status(400).json({ message: "name, price, description, category are required" });
//     }

//     const imageData = [];
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         const result = await uploadToImageKit(file.buffer, file.originalname);
//         imageData.push({ url: result.url, fileId: result.fileId });
//       }
//     }

//     const product = await Product.create({
//       name,
//       price: Number(price),
//       description,
//       category,
//       animeTag: animeTag || null,
//       sizes: sizes ? JSON.parse(sizes) : ["S", "M", "L", "XL", "XXL"],
//       badge: badge || "NEW",
//       brand: brand || "VELTORN",
//       stock: stock ? Number(stock) : 100,
//       images: imageData.map((d) => d.url),
//       imageFileIds: imageData.map((d) => d.fileId),
//     });

//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ============================================================
// // @PUT /api/products/:id  — Admin only
// // ============================================================
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const { name, price, description, category, animeTag, sizes, badge, brand, stock, isActive } = req.body;

//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         const result = await uploadToImageKit(file.buffer, file.originalname);
//         product.images.push(result.url);
//         product.imageFileIds.push(result.fileId);
//       }
//     }

//     if (name) product.name = name;
//     if (price) product.price = Number(price);
//     if (description) product.description = description;
//     if (category) product.category = category;
//     if (animeTag !== undefined) product.animeTag = animeTag || null;
//     if (sizes) product.sizes = JSON.parse(sizes);
//     if (badge) product.badge = badge;
//     if (brand) product.brand = brand;
//     if (stock !== undefined) product.stock = Number(stock);
//     if (isActive !== undefined) product.isActive = isActive === "true" || isActive === true;

//     await product.save();
//     res.json({ message: "Product updated successfully", product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ============================================================
// // @DELETE /api/products/:id  — Admin only
// // ============================================================
// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     if (product.imageFileIds && product.imageFileIds.length > 0) {
//       for (const fileId of product.imageFileIds) {
//         await deleteFromImageKit(fileId);
//       }
//     }

//     await product.deleteOne();
//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ============================================================
// // @DELETE /api/products/:id/image  — Remove single image (Admin)
// // ============================================================
// const deleteProductImage = async (req, res) => {
//   try {
//     const { imageUrl, fileId } = req.body;

//     if (!imageUrl || !fileId)
//       return res.status(400).json({ message: "imageUrl and fileId both required" });

//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     await deleteFromImageKit(fileId);

//     product.images = product.images.filter((img) => img !== imageUrl);
//     product.imageFileIds = product.imageFileIds.filter((id) => id !== fileId);
//     await product.save();

//     res.json({ message: "Image deleted successfully", product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   deleteProductImage,
// };


const Product = require("../models/Product");
const { imagekit } = require("../config/imagekit");

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

const deleteFromImageKit = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
  } catch (err) {
    console.error("ImageKit delete error:", err.message);
  }
};

// ============================================================
// @GET /api/products
//
// FIX: jab category param aata hai tabhi filter lagao
//      agar category param nahi aaya = sab products dikho (Shop All)
//      agar category="All" aaya = bhi sab products dikho
// ============================================================
const getAllProducts = async (req, res) => {
  try {
    const { category, anime, badge, search, sort, page = 1, limit = 12 } = req.query;

    // Sirf active products
    const filter = { isActive: true };

    // Category filter — ONLY when category param exists AND is not "All"
    if (category && category.trim() !== "" && category.trim() !== "All") {
      filter.category = category.trim();
    }

    // Anime filter — when anime param exists, filter by animeTag AND force category=Anime
    // This ensures Naruto products don't show in Shirt/Cap/etc.
    if (anime && anime.trim() !== "") {
      filter.animeTag = anime.trim();
      filter.category = "Anime"; // Anime products exclusively
    }

    if (badge) filter.badge = badge;

    if (search && search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { brand: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
        { animeTag: { $regex: search.trim(), $options: "i" } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(limitNum),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.error("getAllProducts error:", err);
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
// @POST /api/products — Admin only
// ============================================================
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, animeTag, sizes, badge, brand, stock } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "name, price, description, category are required" });
    }

    const imageData = [];
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
      images: imageData.map((d) => d.url),
      imageFileIds: imageData.map((d) => d.fileId),
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================================================
// @PUT /api/products/:id — Admin only
// ============================================================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, description, category, animeTag, sizes, badge, brand, stock, isActive } = req.body;

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
// @DELETE /api/products/:id — Admin only
// ============================================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

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
// @DELETE /api/products/:id/image — Remove single image (Admin)
// ============================================================
const deleteProductImage = async (req, res) => {
  try {
    const { imageUrl, fileId } = req.body;
    if (!imageUrl || !fileId)
      return res.status(400).json({ message: "imageUrl and fileId both required" });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await deleteFromImageKit(fileId);
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
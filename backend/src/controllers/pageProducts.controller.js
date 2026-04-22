// const PageProducts = require("../models/PageProducts");

// // GET /api/page-products/:section  — Public
// const getSectionProducts = async (req, res) => {
//   try {
//     const { section } = req.params;

//     const doc = await PageProducts.findOne({ section }).populate({
//       path: "products.productId",
//       model: "Product",
//       select: "name price images badge sizes brand category animeTag isActive",
//     });

//     if (!doc || doc.products.length === 0) {
//       return res.json({ section, products: [] });
//     }

//     const sorted = doc.products
//       .filter((p) => p.productId && p.productId.isActive !== false)
//       .sort((a, b) => (a.slot ?? 0) - (b.slot ?? 0))
//       .map((p) => ({
//         id: p.productId._id,
//         name: p.customName || p.productId.name,
//         price: p.customPrice || String(p.productId.price),
//         img: p.customImage || p.productId.images?.[0] || "",
//         badge: p.productId.badge,
//         sizes: p.productId.sizes || [],
//         brand: p.productId.brand,
//         collection: p.productId.animeTag || p.productId.category,
//         slot: p.slot,
//       }));

//     res.json({ section, products: sorted });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // PUT /api/page-products/:section  — Admin only
// const setSectionProducts = async (req, res) => {
//   try {
//     const { section } = req.params;
//     const { products } = req.body;

//     if (!Array.isArray(products)) {
//       return res.status(400).json({ message: "products must be an array" });
//     }

//     const doc = await PageProducts.findOneAndUpdate(
//       { section },
//       {
//         section,
//         products: products.map((p, i) => ({
//           productId: p.productId,
//           customName: p.customName || "",
//           customPrice: p.customPrice || "",
//           customImage: p.customImage || "",
//           slot: p.slot !== undefined ? p.slot : i,
//         })),
//       },
//       { upsert: true, new: true }
//     );

//     res.json({ message: "Section updated successfully", doc });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE /api/page-products/:section/product/:productId  — Admin only
// const removeFromSection = async (req, res) => {
//   try {
//     const { section, productId } = req.params;

//     const doc = await PageProducts.findOne({ section });
//     if (!doc) return res.status(404).json({ message: "Section not found" });

//     doc.products = doc.products.filter(
//       (p) => String(p.productId) !== String(productId)
//     );
//     await doc.save();

//     res.json({ message: "Product removed from section" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getSectionProducts, setSectionProducts, removeFromSection };


const PageProducts = require("../models/PageProducts");

// Image-only sections — no productId needed
const IMAGE_ONLY_SECTIONS = [
  "anime_naruto", "anime_solo_leveling", "anime_demon_slayer", "anime_one_piece"
];

// GET /api/page-products/:section — Public
const getSectionProducts = async (req, res) => {
  try {
    const { section } = req.params;

    const doc = await PageProducts.findOne({ section });
    if (!doc || doc.products.length === 0) {
      return res.json({ section, products: [] });
    }

    // Image-only section — return customImage directly
    if (IMAGE_ONLY_SECTIONS.includes(section)) {
      const sorted = doc.products
        .filter(p => p.customImage)
        .map(p => ({
          id: String(p._id),
          name: p.customName || section,
          img: p.customImage,
          price: "0",
          sizes: [],
          collection: "",
          slot: p.slot,
        }));
      return res.json({ section, products: sorted });
    }

    // Product section — populate productId
    const populated = await PageProducts.findOne({ section }).populate({
      path: "products.productId",
      model: "Product",
      select: "name price images badge sizes brand category animeTag isActive",
    });

    if (!populated) return res.json({ section, products: [] });

    const sorted = populated.products
      .filter(p => p.productId && p.productId.isActive !== false)
      .sort((a, b) => (a.slot ?? 0) - (b.slot ?? 0))
      .map(p => ({
        id: p.productId._id,
        name: p.customName || p.productId.name,
        price: p.customPrice || String(p.productId.price),
        img: p.customImage || p.productId.images?.[0] || "",
        badge: p.productId.badge,
        sizes: p.productId.sizes || [],
        brand: p.productId.brand,
        collection: p.productId.animeTag || p.productId.category,
        slot: p.slot,
      }));

    res.json({ section, products: sorted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/page-products/:section — Admin only
const setSectionProducts = async (req, res) => {
  try {
    const { section } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "products must be an array" });
    }

    // Image-only section — save only customImage, no productId
    if (IMAGE_ONLY_SECTIONS.includes(section)) {
      const doc = await PageProducts.findOneAndUpdate(
        { section },
        {
          section,
          products: products.map((p, i) => ({
            customName: p.customName || section,
            customImage: p.customImage || "",
            customPrice: "",
            slot: p.slot !== undefined ? p.slot : i,
          })),
        },
        { upsert: true, new: true }
      );
      return res.json({ message: "Section updated successfully", doc });
    }

    // Product section — save with productId
    const doc = await PageProducts.findOneAndUpdate(
      { section },
      {
        section,
        products: products.map((p, i) => ({
          productId: p.productId,
          customName: p.customName || "",
          customPrice: p.customPrice || "",
          customImage: p.customImage || "",
          slot: p.slot !== undefined ? p.slot : i,
        })),
      },
      { upsert: true, new: true }
    );

    res.json({ message: "Section updated successfully", doc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/page-products/:section/product/:productId — Admin only
const removeFromSection = async (req, res) => {
  try {
    const { section, productId } = req.params;
    const doc = await PageProducts.findOne({ section });
    if (!doc) return res.status(404).json({ message: "Section not found" });
    doc.products = doc.products.filter(p => String(p.productId) !== String(productId));
    await doc.save();
    res.json({ message: "Product removed from section" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSectionProducts, setSectionProducts, removeFromSection };
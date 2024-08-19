const Product = require('../../models/product-model');
const Category = require('../../models/category-model');

// async function getAllProducts(reqQuery) {
//     try {
//         let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

//         pageSize = pageSize || 10;
//         pageNumber = pageNumber || 1;

//         let query = Product.find().populate("category");

//         if (category) {
//             const existCategory = await Category.findOne({ name: category });
//             if (existCategory) {
//                 query = query.where("category").equals(existCategory._id);
//             } else {
//                 return { content: [], currentPage: 1, totalPages: 0 };
//             }
//         }

//         if (color) {
//             const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
//             const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
//             query = query.where("color").regex(colorRegex);
//         }

//         if (sizes) {
//             const sizesSet = new Set(sizes);
//             query = query.where("sizes.name").in([...sizesSet]);
//         }

//         if (minPrice && maxPrice) {
//             query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
//         }

//         if (minDiscount) {
//             query = query.where("discountPercent").gt(minDiscount);
//         }

//         if (stock) {
//             if (stock == "in_stock") {
//                 query = query.where("quantity").gt(0);
//             } else if (stock == "out_of_stock") {
//                 query = query.where("quantity").lt(1);
//             }
//         }

//         if (sort) {
//             const sortDirection = sort === "price_high" ? -1 : 1;
//             query = query.sort({ discountedPrice: sortDirection });
//         }

//         const totalProducts = await Product.countDocuments(query);

//         const skip = (pageNumber - 1) * pageSize;
//         query = query.skip(skip).limit(pageSize);

//         const products = await query.exec();
//         const totalPages = Math.ceil(totalProducts / pageSize);


//         return { content: await Product.find(), currentPage: pageNumber, totalPages };
//     } 
//     catch (error) {
//         console.error("Error getting all products:", error);
//         throw new Error("Error getting all products: " + error.message);
//     }
// }


// Get all products with filtering and pagination
async function getAllProducts(reqQuery) {

    let {
      category,
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize,
    } = reqQuery;
    (pageSize = pageSize || 10), (pageNumber = pageNumber || 1);

  // Initialize query
    let query = Product.find().populate("category");
  
  //   if (category) {
  //     const existCategory = await Category.findOne({ name: category });
  //     console.log('Found Category:', existCategory);
  //     if (existCategory) {
  //         query = query.where("category").equals(existCategory._id);
  //         console.log('Query after applying category:', query);
  //     } else {
  //         return { content: [], currentPage: 1, totalPages: 0 };
  //     }
  // }
   



    if (color) {
      const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
      const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
      query = query.where("color").regex(colorRegex);
      console.log("color",color);
    }
  
    // if (sizes) {
    //   const sizesSet = new Set(sizes);
      
    //   query = query.where("sizes.name").in([...sizesSet]);
    // }
  
    // if (minPrice && maxPrice) {
    //   query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    // }
  
    // if (minDiscount) {
    //   query = query.where("discountPercent").gt(minDiscount);
    // }
  
    if (stock) {
      if (stock === "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock === "out_of_stock") {
        query = query.where("quantity").lte(0);
      }
    }
  
    if (sort) {
      const sortDirection = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }
  
    // Apply pagination
    const totalProducts = await Product.countDocuments(query);
  
    const skip = (pageNumber - 1) * pageSize;
  
    query = query.skip(skip).limit(pageSize);
  
    const products = await query.exec();
  
    const totalPages = Math.ceil(totalProducts / pageSize);
    console.log('Executing query:', query.getFilter());

    return { content:products, currentPage:1, totalPages:10 };
   
  }

module.exports = { getAllProducts };

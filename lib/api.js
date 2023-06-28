import axios from "axios";
import qs from "qs";

// Book Related API
// export const getBooksByCategory = async (category, page, pageSize = 10) => {
//   try {
//     const query = qs.stringify(
//       {
//         populate: "*",
//         filters: {
//           categories: {
//             slug: {
//               $eqi: category,
//             },
//           },
//         },
//         pagination: {
//           page,
//           pageSize,
//         },
//       },
//       { encodeValuesOnly: true }
//     );
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/books?${query}`
//     );
//     return res.data;
//   } catch (error) {
//     throw new Error("Error occured while data fetching");
//   }
// };
// export const getBooksByStatus = async (status, page, pageSize = 10) => {
//   try {
//     const query = qs.stringify(
//       {
//         populate: "*",
//         filters: {
//           statuses: {
//             slug: {
//               $eqi: status,
//             },
//           },
//         },
//         pagination: {
//           page,
//           pageSize,
//         },
//       },
//       { encodeValuesOnly: true }
//     );

//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/books?${query}`
//     );
//     return res.data;
//   } catch (error) {
//     throw new Error("Error occured while data fetching");
//   }
// };
// export const getBooksByFilteredCategory = async (
//   category,
//   page,
//   pageSize = 10
// ) => {
//   try {
//     let categoriesArray = [];
//     const query = qs.stringify(
//       {
//         populate: "*",
//         filters: {
//           categories: {
//             slug: {
//               $eqi: category,
//             },
//           },
//         },
//         pagination: {
//           page,
//           pageSize,
//         },
//       },
//       { encodeValuesOnly: true }
//     );
//     const categories = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
//     );
//     categories.data.data.map((category) => {
//       return categoriesArray.push(category.attributes.slug);
//     });
//     if (categoriesArray.includes(category)) {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/books?${query}`
//       );
//       return res.data;
//     } else {
//       throw new Error("Error occured while data fetching");
//     }
//   } catch (error) {
//     throw new Error("Error occured while data fetching");
//   }
// };
// export const getBooksByFilteredStatus = async (status, page, pageSize = 10) => {
//   try {
//     let statusesArray = [];
//     const query = qs.stringify(
//       {
//         populate: "*",
//         filters: {
//           statuses: {
//             slug: {
//               $eqi: status,
//             },
//           },
//         },
//         pagination: {
//           page,
//           pageSize,
//         },
//       },
//       { encodeValuesOnly: true }
//     );
//     const statuses = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/statuses`
//     );

//     statuses.data.data.map((status) => {
//       return statusesArray.push(status.attributes.slug);
//     });
//     if (statusesArray.includes(status)) {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/books?${query}`
//       );
//       return res.data;
//     } else {
//       throw new Error("Error occured while data fetching");
//     }
//   } catch (error) {
//     throw new Error("Error occured while data fetching");
//   }
// };
export const getBooksByCategory = async (slug, page, pageSize = 10) => {
  try {
    let categoriesArray = [];
    const statuses = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/statuses`
    );
    const categories = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
    );
    statuses.data.data.map((item) =>
      categoriesArray.push(item.attributes.slug)
    );
    categories.data.data.map((item) =>
      categoriesArray.push(item.attributes.slug)
    );
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          $or: [
            {
              categories: {
                slug: {
                  $eqi: slug,
                },
              },
            },
            {
              statuses: {
                slug: {
                  $eqi: slug,
                },
              },
            },
          ],
        },
        pagination: {
          page,
          pageSize,
        },
      },
      { encodeValuesOnly: true }
    );
    if (categoriesArray.includes(slug)) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books?${query}`
      );
      return res.data;
    } else {
      throw new Error("Error occured while data fetching");
    }
  } catch (error) {
    throw new Error("Error occured while data fetching");
  }
};
export const getBooksDetailsBySlug = async (slug) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eqi: slug,
          },
        },
        populate: "*",
      },
      { encodeValuesOnly: true }
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books?${query}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error occured while data fetching");
  }
};
export const getBooksByIds = async (ids) => {
  try {
    const newIds = ids.length < 1 ? null : ids;
    const query = qs.stringify(
      {
        filters: {
          id: {
            $in: newIds,
          },
        },
        populate: "*",
      },
      { encodeValuesOnly: true }
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books?${query}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error occured while data fetching");
  }
};
export const getBookReviewsByBookSlug = async (slug, page, pageSize = 10) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          book: {
            slug: {
              $eqi: slug,
            },
          },
        },
        populate: {
          book: { populate: "*" },
          users_permissions_user: { populate: "*" },
        },
        pagination: {
          page,
          pageSize,
        },
      },
      { encodeValuesOnly: true }
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?${query}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error occured while data fetching");
  }
};
export const postBookReviewsByBookId = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error occured while posting data");
  }
};

// Stationery Things Related API
export const getStationeryByCategory = async (
  category,
  page,
  pageSize = 10
) => {
  try {
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          product_categories: {
            slug: {
              $eqi: category,
            },
          },
        },
        pagination: {
          page,
          pageSize,
        },
      },
      { encodeValuesOnly: true }
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?${query}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error occured while data fetching");
  }
};
export const getStationeryByIds = async (ids) => {
  try {
    const newIds = ids.length < 1 ? null : ids;
    const query = qs.stringify(
      {
        filters: {
          id: {
            $in: newIds,
          },
        },
        populate: "*",
      },
      { encodeValuesOnly: true }
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?${query}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error occured while data fetching");
  }
};
export const getStationeryDetailsBySlug = async (slug) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eqi: slug,
          },
        },
        populate: "*",
      },
      { encodeValuesOnly: true }
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?${query}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error occured while data fetching");
  }
};
export const getProductByParams = async (params) => {
  try {
    const bookQuery = qs.stringify(
      {
        filters: {
          $or: [
            {
              slug: {
                $containsi: params,
              },
            },
            {
              author: {
                slug: {
                  $containsi: params,
                },
              },
            },
          ],
        },
        populate: "*",
      },
      { encodeValuesOnly: true }
    );
    const stationeryQuery = qs.stringify(
      {
        filters: {
          $or: [
            {
              slug: {
                $containsi: params,
              },
            },
            {
              product_categories: {
                slug: {
                  $containsi: params,
                },
              },
            },
          ],
        },
        populate: "*",
      },
      { encodeValuesOnly: true }
    );
    if (params.length > 1) {
      const bookRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books?${bookQuery}`
      );
      const stationeryRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?${stationeryQuery}`
      );
      return [...bookRes.data.data, ...stationeryRes.data.data];
    } else {
      return [];
    }
  } catch (error) {}
};

// Authentication and User Related API
export const userSingUp = async (userInfo) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      userInfo
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const userSingIn = async (userInfo) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
      userInfo
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getUserDetails = async (id) => {
  try {
    const query = qs.stringify(
      {
        populate: {
          image: { populate: "*" },
          reviews: { populate: "*" },
          orders: { populate: { order_quantities: { populate: "*" } } },
        },
      },
      { encodeValuesOnly: true }
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}?${query}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const updateUserDetails = async ({ imageFile, id, editedUser }) => {
  try {
    if (imageFile) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        imageFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == 200) {
        const imageId = res.data[0].id;
        editedUser["image"] = imageId;
        const res2 = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
          editedUser
        );
        return res2.data;
      }
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        editedUser
      );
      return res.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Order Related API
export const getOrdersDetailsById = async (id) => {
  try {
    const query = qs.stringify(
      {
        populate: {
          user: { populate: "*" },
          order_quantities: {
            populate: { book: { populate: "*" }, product: { populate: "*" } },
          },
        },
      },
      { encodeValuesOnly: true }
    );
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}?${query}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error occured while data fetching");
  }
};

export const postOrdersByUserId = async ({
  cart,
  total,
  userId,
  phone,
  address,
}) => {
  try {
    let orderQuantities = [];
    await Promise.all(
      cart.map(async (item) => {
        if (item.author) {
          const bookRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/order-quantities`,
            { data: { quantity: item.quantity, book: item.id } }
          );
          const orderQuantityId = bookRes.data.data.id;
          orderQuantities.push(orderQuantityId);
        } else {
          const productRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/order-quantities`,
            { data: { quantity: item.quantity, product: item.id } }
          );
          const orderQuantityId = productRes.data.data.id;
          orderQuantities.push(orderQuantityId);
        }
      })
    );

    if (cart.length == orderQuantities.length) {
      console.log();
      const res2 = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          data: {
            total,
            user: userId,
            address,
            phone,
            payment_method: "E-banking",
            order_quantities: orderQuantities,
          },
        }
      );
      return res2.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

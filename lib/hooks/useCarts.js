import { useCartStore } from "@/lib-store/cartStore";
import { useQueries } from "@tanstack/react-query";
import { getBooksByIds, getStationeryByIds } from "../api";
import { useJwtDecode, useJwtEncode } from "./useJwt";
import useZustand from "./useZustand";

const useCarts = () => {
  let totalAmount, totalQuantity;
  let bookQuantity = {};
  let stationeryQuantity = {};
  let bookTimestamp = {};
  let stationeryTimestamp = {};
  let bookIdArray = [];
  let stationeryIdArray = [];
  let cartsData = [];

  const { cart } = useCartStore();

  const encryptedCart = useJwtEncode(cart);
  const encryptedCart2 = useJwtDecode(encryptedCart);
  const decodeCart = useJwtDecode(encryptedCart2.id);
  const decodeCartId = decodeCart.id;

  // filtering book and stationery id
  decodeCartId?.map((item) => {
    if (item.book) {
      return bookIdArray.push(item.id);
    }
  });
  decodeCartId?.map((item) => {
    if (item.stationery) {
      return stationeryIdArray.push(item.id);
    }
  });

  // filtering book and stationery quantity
  decodeCartId?.map((item) => {
    if (item.book) {
      return (bookQuantity[item.id] = item.quantity);
    }
  });
  decodeCartId?.map((item) => {
    if (item.stationery) {
      return (stationeryQuantity[item.id] = item.quantity);
    }
  });

  // filtering book and stationery timestamp
  decodeCartId?.map((item) => {
    if (item.book) {
      return (bookTimestamp[item.id] = item.timestamp);
    }
  });
  decodeCartId?.map((item) => {
    if (item.stationery) {
      return (stationeryTimestamp[item.id] = item.timestamp);
    }
  });

  const [books, stationeries] = useQueries({
    queries: [
      {
        queryKey: ["carts-book", { bookIdArray }],
        queryFn: () => getBooksByIds(bookIdArray),
        keepPreviousData: true,
      },
      {
        queryKey: ["carts-products", { stationeryIdArray }],
        queryFn: () => getStationeryByIds(stationeryIdArray),
        keepPreviousData: true,
      },
    ],
  });

  if (!decodeCartId) return { totalAmount: 0, totalQuantity: 0, cartsData: [] };

  if (
    books.isError ||
    books.isLoading ||
    stationeries.isError ||
    stationeries.isLoading
  ) {
    return {
      totalAmount: 0,
      totalQuantity: 0,
      cartsData: [],
      isLoading: books.isLoading || stationeries.isLoading,
      isError: books.isError || stationeries.isError,
    };
  }
  const booksArray = books.data?.data.map((item) => {
    const { title, slug, image, price, author, categories } = item.attributes;
    const imageUrl = image.data.attributes.url;
    const authorName = author.data.attributes.name;
    const category = categories.data[0].attributes.slug;

    return {
      id: item.id,
      title,
      slug,
      category,
      author: authorName,
      price,
      image: imageUrl,
      quantity: bookQuantity[item.id],
      timestamp: bookTimestamp[item.id],
    };
  });

  const stationeriesArray = stationeries.data?.data.map((item) => {
    const { name, slug, image, price, product_categories } = item.attributes;
    const imageUrl = image.data.attributes.url;
    const category = product_categories.data[0].attributes.slug;

    return {
      id: item.id,
      title: name,
      slug,
      category,
      price: price,
      image: imageUrl,
      quantity: stationeryQuantity[item.id],
      timestamp: stationeryTimestamp[item.id],
    };
  });

  cartsData = [...booksArray, ...stationeriesArray].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  if (cartsData) {
    totalQuantity = decodeCartId.reduce((acc, item) => acc + item.quantity, 0);

    totalAmount = decodeCartId.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  return {
    totalAmount,
    totalQuantity,
    cartsData,
    isLoading: books.isLoading || stationeries.isLoading,
    isError: books.isError || stationeries.isError,
  };
};

export default useCarts;

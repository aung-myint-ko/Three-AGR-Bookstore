import { create } from "zustand";

export const useOrderStore = create((set) => ({
  address: {
    apt: "3",
    street: "Rickey",
    township: "Thanlyin",
    state: "Yangon",
  },
  phone: "09789723837",
  payment: "E-banking",
  orderID: null,
  setOrderSpecification: (data) => {
    const { apartmentNumber, street, township, state, phoneNumber } = data;
    set({
      address: { apt: apartmentNumber, street, township, state },
      phone: phoneNumber,
      payment: "E-banking",
    });
  },
}));

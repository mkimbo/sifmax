import all from "../../assets/icons/all.png";
import nails from "../../assets/icons/nails.png";
import waxing from "../../assets/icons/waxing.png";
import makeup from "../../assets/icons/makeup.png";
import massage from "../../assets/icons/massage.png";
// import body from "../../assets/icons/body.png";
import hair from "../../assets/icons/hair-2.png";

export const sifmaxServices = [
  { id: 1, name: "Manicure", price: 35, duration: 45 },
  { id: 2, name: "Pedicure", price: 35, duration: 60 },
  { id: 3, name: "File & Polish", price: 35, duration: 20 },

  { id: 4, name: "Ladies' Waxing - Leg", price: 35, duration: 30 },
  { id: 5, name: "Ladies' Waxing - Arm & Underarm", price: 35, duration: 30 },
  { id: 6, name: "Ladies' Waxing - Full Body", price: 49, duration: 120 },
  { id: 7, name: "Ladies' Waxing - Bikini", price: 35, duration: 15 },

  { id: 8, name: "Eyebrow Tinting", price: 35, duration: 30 },
  { id: 9, name: "Facial", price: 35, duration: 30 },
  { id: 10, name: "Lashes", price: 35, duration: 30 },

  { id: 11, name: "Aromatherapy Massage", price: 44, duration: 60 },
  { id: 12, name: "Back, Neck & Shoulders Massage", price: 20, duration: 30 },
  { id: 13, name: "Full Body Scrub", price: 21, duration: 45 },
  { id: 14, name: "Deep Tissue Massage", price: 48, duration: 60 },

  { id: 15, name: "Dreads", price: 35, duration: 30 },
  { id: 16, name: "Braids", price: 35, duration: 30 },
  { id: 17, name: "Lace Wig Bonding", price: 35, duration: 30 },
  { id: 18, name: "Hair Treatment", price: 35, duration: 30 },
];

export const sifmaxTypes = [
  { id: 1, name: "Manicures & Pedicures", services: [1, 2, 3] },
  { id: 2, name: "Waxing", services: [4, 5, 6, 7] },
  { id: 3, name: "Facials & Makeup", services: [8, 9, 10] },
  { id: 4, name: "Body Spa Treatments", services: [11, 12, 13, 14] },
  { id: 5, name: "Hair Styling", services: [15, 16, 17, 18] },
];

export const sifmaxCategories = [
  { id: 1, name: "All", types: [1, 2, 3, 4, 5], icon: all },
  { id: 2, name: "Nails", types: [1], icon: nails },
  { id: 3, name: "Waxing", types: [2], icon: waxing },
  { id: 4, name: "Face", types: [3], icon: makeup },
  { id: 5, name: "Hair", types: [5], icon: hair },
  { id: 6, name: "Body", types: [4], icon: massage },
];

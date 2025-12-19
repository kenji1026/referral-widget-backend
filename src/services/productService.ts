import { Product } from "../models/Product";

// Example in-memory product list
const products: Product[] = [
  {
    id: "1",
    name: "Boho Floral Maxi Dress",
    price: 49,
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    description: "A breezy boho floral maxi dress perfect for summer outings.",
  },
  {
    id: "2",
    name: "Pink Blossom Sundress",
    price: 59,
    imageUrl:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    description: "A cute pink sundress with blossom prints for a fresh look.",
  },
  {
    id: "3",
    name: "Yellow Garden Midi",
    price: 39,
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    description: "Midi dress with yellow garden floral patterns.",
  },
  {
    id: "4",
    name: "Blue Floral Wrap Dress",
    price: 44,
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    description: "Elegant blue wrap dress with all-over floral print.",
  },
  {
    id: "5",
    name: "White Daisy Mini",
    price: 55,
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    description: "Mini dress with white daisy prints for a playful vibe.",
  },
  {
    id: "6",
    name: "Red Rose Print Dress",
    price: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    description: "Red dress with bold rose prints for a statement look.",
  },
  {
    id: "7",
    name: "Green Leafy Dress",
    price: 42,
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Green leafy print dress for a natural, earthy style.",
  },
  {
    id: "8",
    name: "Pastel Petal Dress",
    price: 53,
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    description: "Soft pastel petals on a flowy summer dress.",
  },
  {
    id: "9",
    name: "Sunshine Floral Midi",
    price: 47,
    imageUrl:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    description: "Bright sunshine yellow midi with floral accents.",
  },
  {
    id: "10",
    name: "Lavender Field Dress",
    price: 51,
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    description: "Lavender field inspired dress for a dreamy summer.",
  },
  {
    id: "11",
    name: "Coral Summer Dress",
    price: 58,
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    description: "Coral colored summer dress with subtle floral print.",
  },
  {
    id: "12",
    name: "Classic Floral A-Line",
    price: 62,
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Classic A-line dress with timeless floral design.",
  },
];

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

import type { Product } from "@/contexts/cart-context"

export const products: Product[] = [
  {
    id: "white-oyster",
    name: "White Oyster Grow Kit",
    price: 34,
    category: "Grow Kits",
    image: "/white-oyster-mushroom-grow-kit.jpg",
    description: "Classic white oyster mushrooms. Perfect for beginners. Harvest in 7-10 days.",
  },
  {
    id: "grey-oyster",
    name: "Grey Oyster Grow Kit",
    price: 34,
    category: "Grow Kits",
    image: "/grey-oyster-mushroom-grow-kit.jpg",
    description: "Robust grey oysters with rich, earthy flavor. Harvest in 7-10 days.",
  },
  {
    id: "brown-oyster",
    name: "Brown Oyster Grow Kit",
    price: 34,
    category: "Grow Kits",
    image: "/brown-oyster-mushroom-grow-kit.jpg",
    description: "Deep brown oysters with nutty, complex taste. Harvest in 7-10 days.",
  },
  {
    id: "variety-pack",
    name: "Variety Pack",
    price: 89,
    category: "Bundles",
    image: "/mushroom-grow-kit-variety-pack-bundle.jpg",
    description: "All three oyster varieties. Experience the full spectrum of flavors.",
  },
  {
    id: "substrate-refill",
    name: "Substrate Refill Pack",
    price: 18,
    category: "Supplies",
    image: "/mushroom-substrate-refill-bag.jpg",
    description: "Premium organic substrate. Keep your grows going strong.",
  },
  {
    id: "oyster-spawn",
    name: "Oyster Spawn",
    price: 22,
    category: "Supplies",
    image: "/oyster-mushroom-spawn.jpg",
    description: "Pure oyster mushroom spawn for advanced growers.",
  },
  {
    id: "spray-bottle",
    name: "Fine Mist Spray Bottle",
    price: 12,
    category: "Accessories",
    image: "/fine-mist-spray-bottle.jpg",
    description: "Perfect misting for optimal humidity. Essential tool for success.",
  },
  {
    id: "humidity-tent",
    name: "XL Humidity Tent",
    price: 24,
    category: "Accessories",
    image: "/mushroom-humidity-tent.jpg",
    description: "Maintains ideal growing conditions. Fits multiple kits.",
  },
]

export const categories = ["All", "Grow Kits", "Bundles", "Supplies", "Accessories"]

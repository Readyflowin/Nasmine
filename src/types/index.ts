export interface ProductSpecification {
  fabric: string;
  neckline?: string;
  sleeve?: string;
  style?: string;
  pattern: string;
  color: string;
  occasion: string;
  technique: string;
  type?: string;
  material?: string;
}

export interface SizeChartEntry {
  size: string;
  bust: number;
  waist: number;
  hip: number;
  length: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  subTitle?: string;
  brand: string;
  regularPrice: number;
  salePrice: number;
  discountPercentage: number;
  images: string[];
  inStock: boolean;
  readyToShip: boolean;
  bestseller?: boolean;
  tags: string[];
  category: string;
  subCategory: string;
  sizes: {
    size: string;
    available: boolean;
    stockCount?: number;
  }[];
  specifications: ProductSpecification;
  careInstructions: string;
  modelInfo: {
    size: string;
    height: string;
  };
  description: string;
  sizeChart: {
    inches: SizeChartEntry[];
    cm: SizeChartEntry[];
  };
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  availability: boolean | null;
  priceRanges: string[];
  sizes: string[];
  fabrics: string[];
  techniques: string[];
  colors: string[];
  occasions: string[];
  sortBy: string;
}

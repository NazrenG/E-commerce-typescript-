export interface Product {
  id: number;
  title: string;
  category: string;
  situation: string;
  isSale: boolean;
  isHot: boolean;
  price: number;
  discount: number;
  image: string;
}

export interface ApiResponse {
  product: Product[];
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

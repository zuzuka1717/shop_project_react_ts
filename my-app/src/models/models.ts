export type Item = {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  count: number;
  image: string;
}

export type InitialStateType = {
  items: Item[];
  selectedCategory?: string;
}
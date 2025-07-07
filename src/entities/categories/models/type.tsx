export interface MyState {
  categories: CategoriesType[]
}

export interface CategoriesType {
  id: number,
  name: string,
  description: string,
  photoUrl: null | string;
}
export type CardProps = {
  book: BookItem
}

export interface BookItem {
  id: number
  title: string
  author: string
  coverUrl: string
  price: number
  link: string
  category: number
  description: string
}

export type FilterOptions = {
  searchString: string
  categoryCheckedList: string[]
}
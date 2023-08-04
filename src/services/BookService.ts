import axios from 'axios'

class BookService {
  async getAllBooks() {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/book_list`)
    return response
  }
  async getBook(id: number) {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/book_list/${id}`)
    return response
  }
}

const bookService = new BookService()
export default bookService

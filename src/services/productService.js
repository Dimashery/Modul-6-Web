import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/new_products';

export default {
  async getProducts() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async addProduct(product) {
    const response = await axios.post(API_URL, product);
    return response.data;
  },

  async deleteProduct(productId) {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
  },
};

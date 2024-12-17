<template>
  <header>
    <div class="navbar">
      <h1 class="brand-name">Cooleyah EverydaY</h1>
      <nav>
        <ul>
          <li><a href="../../Home/html/home.html">Home</a></li>
          <li><a href="/product">Product</a></li>
          <li><a href="../../Buy/html/buy.html">Buy</a></li>
          <li><a href="/whats-new">What's New?</a></li>
          <li><a href="/admin">Admin</a></li>
          <li><a href="admin_product.html">Admin Product</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div>
    <h2>Manage Products</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button @click="editProduct(product.id)">Edit</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="saveProduct">
      <input type="hidden" v-model="productId" />
      <label for="name">Name:</label>
      <input type="text" v-model="name" required />

      <label for="description">Description:</label>
      <textarea v-model="description"></textarea>

      <label for="price">Price:</label>
      <input type="number" v-model="price" required />

      <label for="quantity">Quantity:</label>
      <input type="number" v-model="quantity" required />

      <button type="submit">Save Product</button>
    </form>
  </div>

  <footer>
    <div class="footer-content">
      <div class="about-footer">
        <h3>About Cooleyah EverydaY</h3>
        <p>Cooleyah EverydaY focuses on providing contemporary minimalist clothing for young people who wish to express themselves with style.</p>
      </div>
      <div class="links-footer">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="../../Product/html/product.html">Product</a></li>
          <li><a href="../../Buy/html/buy.html">Buy</a></li>
          <li><a href="../../whats_new/html/whats_new.html">What's New?</a></li>
          
        </ul>
      </div>
      <div class="contact-footer">
        <h3>Contact Us</h3>
        <p>Email: contact@cooleyaheveryday.com</p>
        <p>Phone: +081 345 6785 90</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Cooleyah EverydaY. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      productId: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
    };
  },
  methods: {
    async loadProducts() {
      const response = await fetch("http://127.0.0.1:8000/api/products");
      const data = await response.json();
      this.products = data;
    },
    async saveProduct() {
      const product = {
        name: this.name,
        description: this.description,
        price: this.price,
        quantity: this.quantity,
      };

      const method = this.productId ? "PUT" : "POST";
      const url = this.productId
        ? `http://127.0.0.1:8000/api/products/${this.productId}`
        : "http://127.0.0.1:8000/api/products";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      this.loadProducts();
      this.resetForm();
    },
    async editProduct(id) {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
      const product = await response.json();

      this.productId = product.id;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
      this.quantity = product.quantity;
    },
    async deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
          method: "DELETE",
        });
        this.loadProducts();
      }
    },
    resetForm() {
      this.productId = "";
      this.name = "";
      this.description = "";
      this.price = "";
      this.quantity = "";
    },
  },
  mounted() {
    this.loadProducts();
  },
};
</script>

<style>
@import "../assets/styles/admin_product.css"; /* Mengimpor file CSS di sini */
</style>

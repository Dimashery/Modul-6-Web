<template>
  <header>
    <div class="navbar">
      <h1 class="brand-name">Cooleyah EverydaY</h1>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li>
            <router-link to="/product" class="active">Product</router-link>
          </li>
          <li><router-link to="/buy">Buy</router-link></li>
          <li><router-link to="/whats-new">What's New?</router-link></li>
          <li><router-link to="/admin">Admin</router-link></li>
          <li><router-link to="/admin-product">Admin Product</router-link></li>
        </ul>
      </nav>
      <div class="auth-buttons">
        <button class="login-btn">Login</button>
        <button class="get-started-btn">Get Started</button>
      </div>
    </div>
  </header>
  <div class="admin-section">
    <h2>Manage What's New</h2>

    <form @submit.prevent="addProduct">
      <input type="text" v-model="name" placeholder="Product Name" required />
      <input type="text" v-model="image" placeholder="Image URL" required />
      <textarea
        v-model="description"
        placeholder="Description"
        required
      ></textarea>
      <input type="number" v-model="price" placeholder="Price" required />
      <button type="submit">Add Product</button>
    </form>

    <div id="product-list">
      <div v-for="product in products" :key="product.id" class="product">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>
          <strong>Rp. {{ formatPrice(product.price) }}</strong>
        </p>
        <img :src="product.image" alt="Product Image" width="100" />
        <button @click="deleteProduct(product.id)">Delete</button>
      </div>
    </div>
  </div>
  <footer>
    <div class="footer-content">
      <div class="about-footer">
        <h3>About Cooleyah EverydaY</h3>
        <p>
          Cooleyah EverydaY focuses on providing contemporary minimalist
          clothing for young people who wish to express themselves with style.
        </p>
      </div>
      <div class="links-footer">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="product.html">Product</a></li>
          <li><a href="buy.html">Buy</a></li>
          <li><a href="whats-new.html">What's New?</a></li>
        </ul>
      </div>
      <div class="contact-footer">
        <h3>Contact Us</h3>
        <p>Email: contact@cooleyaheveyd.com</p>
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
      name: "",
      image: "",
      description: "",
      price: "",
      products: [],
    };
  },
  methods: {
    // Fungsi untuk memformat harga dengan pemisah ribuan
    formatPrice(price) {
      return new Intl.NumberFormat("id-ID").format(price);
    },

    async fetchProducts() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/new_products");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    },
    async addProduct() {
      const newProduct = {
        name: this.name,
        image: this.image,
        description: this.description,
        price: this.price.toString(), // Pastikan harga dikirimkan sebagai string
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/api/new_products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}. ${errorText}`
          );
        }

        const data = await response.json();
        console.log(data); // Periksa data yang diterima

        if (data.message === "New product created successfully") {
          // Memanggil fetchProducts untuk memastikan produk terbaru ditampilkan
          this.fetchProducts();
          this.resetForm();
        } else {
          console.error("Error adding product:", data);
        }
      } catch (error) {
        console.error("Error adding product:", error.message);
      }
    },

    async deleteProduct(id) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/new_products/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    },
    resetForm() {
      this.name = "";
      this.image = "";
      this.description = "";
      this.price = "";
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
@import "../assets/styles/admin.css"; /* Mengimpor file CSS */
</style>

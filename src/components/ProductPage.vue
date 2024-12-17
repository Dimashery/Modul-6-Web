<template>
  <div class="product-page">
    <header>
      <div class="navbar">
        <h1 class="brand-name">Cooleyah EverydaY</h1>
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/product" class="active">Product</router-link></li>
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

    <main>
      <section class="product-section">
        <h2>Our Products</h2>
        <div id="product-container" class="product-container">
          <div class="product-card" v-for="product in products" :key="product.id">
            <div class="product-image">
              <img :src="`/images/shirt_front.png`" :alt="`${product.name} Front`">
              <img :src="`/images/shirt_back.png`" :alt="`${product.name} Back`">
            </div>
            <div class="product-details">
              <p class="publish-date">Publish on {{ new Date(product.created_at).toLocaleDateString() }}</p>
              <h3>Rp. {{ product.price.toLocaleString() }} <br><span>{{ product.name }}</span></h3>
              <p class="description">{{ product.description }}</p>
              <div class="order-section">
                <div class="quantity-control">
                  <button @click="decreaseQuantity(product.id)">-</button>
                  <span>{{ product.quantity }}</span>
                  <button @click="increaseQuantity(product.id)">+</button>
                </div>
                <button class="order-now-btn" @click="orderNow(product)">Order Now</button>
              </div>
              <p class="available-items">Available Items: <span>{{ product.quantity }}</span></p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-content">
        <div class="about-footer">
          <h3>About Cooleyah EverydaY</h3>
          <p>Cooleyah EverydaY focuses on providing contemporary minimalist clothing for young people who wish to express themselves with style.</p>
        </div>
        <div class="links-footer">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/product">Product</router-link></li>
            <li><router-link to="/buy">Buy</router-link></li>
            <li><router-link to="/whats-new">What's New?</router-link></li>
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
  </div>
</template>

<script>
import Api from '../api/index.js';

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const response = await Api.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    },
    increaseQuantity(productId) {
      const product = this.products.find(p => p.id === productId);
      if (product && product.quantity < product.quantity) {
        product.quantity++;
      }
    },
    decreaseQuantity(productId) {
      const product = this.products.find(p => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity--;
      }
    },
    orderNow(product) {
      const orderData = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        total: product.price * product.quantity,
      };
      // Simpan pesanan di localStorage
      localStorage.setItem('order', JSON.stringify(orderData));
      // Redirect ke halaman pembelian
      window.location.href = '/buy';
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/product.css"; /* Mengimpor file CSS */
</style>

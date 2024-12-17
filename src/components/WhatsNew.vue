<template>
  <div>
    <header>
      <div class="navbar">
        <h1 class="brand-name">Cooleyah EverydaY</h1>
        <nav>
          <ul>
            <li><a href="../../Home/html/home.html">Home</a></li>
            <li><a href="/product">Product</a></li>
            <li><a href="../../Buy/html/buy.html">Buy</a></li>
            <li><a href="/whats-new" class="active">What's New?</a></li>
            <li><a href="/admin">Admin</a></li>
            <li><a href="/admin-product">Admin Product</a></li>
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
        <h2>What's New?</h2>
        <div class="product-container">
          <div
            v-for="product in products"
            :key="product.id"
            class="product-card"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-details">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <p class="price">
                <strong>Rp. {{ formatPrice(product.price) }}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/new_products");
        const data = await response.json();
        this.products = data; // Menyimpan data produk yang diterima
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    },

    formatPrice(price) {
      return new Intl.NumberFormat("id-ID").format(price);
    },
  },
  mounted() {
    this.fetchProducts(); // Panggil API untuk mengambil produk baru saat halaman dimuat
  },
};
</script>

<style>
@import "../assets/styles/whats_new.css"; /* Mengimpor file CSS */
</style>

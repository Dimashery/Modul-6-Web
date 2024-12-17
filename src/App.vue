<template>
  <div>
    <router-link to="/admin-product">Go to Admin Product</router-link>
    <router-link to="/product">View Products</router-link>
    <router-link to="/admin">Go to Admin</router-link>
    
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App'
}
</script>

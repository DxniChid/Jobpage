
<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter() 
import './assets/style.css'
function logout() {
  router.push({ name: 'login' }); 
}
</script>

<template>
<header v-if="route.name !== 'login' && route.name !== 'register'">
  <Header title="Job Page" icon="src/images/pfp.webp"></Header>
    <h3>Meine Favoriten</h3>
    <img src="/src/images/logo-header.png" alt="Papagei-Logo" class="logo-header">    
    <h1>ParrotJobs</h1>
    <div class="profile">
      <span>A.B.</span>
      <button @click="logout">Ausloggen</button>
    </div>
  </header>
  <RouterView></RouterView>
<footer v-if="route.name !== 'login' && route.name !== 'register'">
  <h4>079 90 00 00</h4>
  <h4>test@gmail.com</h4>
  
</footer>

</template>
<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>

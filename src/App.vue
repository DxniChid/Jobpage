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
  <div id="app">
  <header v-if="route.name !== 'login' && route.name !== 'register'">
    <Header title="Job Page" icon="src/images/pfp.webp"></Header>
    <h3 @click="$router.push('/favorites')">Meine Favoriten</h3>
    <img src="/src/images/logo-header.png" alt="Papagei-Logo" @click="$router.push('/homepage')" class="logo-header">
    <h1>ParrotJobs</h1>
    <div class="profile">
      <span>A.B.</span>
      <button @click="logout">Ausloggen</button>
    </div>
  </header>
  <main> 
  <RouterView></RouterView>
  </main>
    <footer v-if="route.name !== 'login' && route.name !== 'register'">
      <h4>079 90 00 00</h4>
      <h4>test@gmail.com</h4>
    </footer>
 </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

h1 {
  margin-bottom: 20px;
}

h4{
  margin: 15px;
}
</style>
<script setup>
import { useRouter } from 'vue-router'  
const router = useRouter()
function login() {
    router.push({ name: 'homepage' }) 
}
 
</script>

<template>
  <div class="container">
    <img src="/src/images/LogoLogin.png" alt="Logo" />
    <h2>Login</h2>

    <form class="login" @submit.prevent="login">
      <label>E-Mail</label>
      <input type="email" required placeholder="Gib deine E-Mail ein" />

      <label>Passwort</label>
      <input type="password" required placeholder="Gib dein Passwort ein" />

      <button type="submit">Login</button>

    </form>

  </div>
<h3>
  Kein Account? Registrieren Sie sich 
  <router-link :to="{ name: 'register' }">hier</router-link>
</h3>

</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

img {
  width: 270px;
  height: 200px;
}

h2 {
  text-align: center;
  font-family: sans-serif;
  font-weight: lighter;
}

.login {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
}

input {
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

h3 {
  text-align: center;
  margin-left: 480px;
}

h3 a {
  text-decoration: none;
  color: #007bff;
}

h3 a:hover {
  text-decoration: underline;
}
</style>
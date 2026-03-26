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
    <h2>Registrierung</h2>

    <form class="login" @submit.prevent="login">
      <label>Vorname*</label>
      <input type="text" required placeholder="Bitte Vorname eingeben">
      <label>Nachname*</label>
      <input type="text" required placeholder="Bitte Nachname eingeben">
      <label>E-Mail*</label>
      <input type="email" required placeholder="Bitte E-Mail eingeben" />

      <label>Passwort*</label>
      <input type="password" required placeholder="Bitte Password eingeben" />

      <label>Passwort wiederholen*</label>
      <input type="password" required="">

      <button type="submit">Registrieren</button>
    </form>

    <div class="login-router">
      <p>
        Bereits einen Account? Klicken Sie  
        <router-link :to="{ name: 'login' }">hier</router-link>
      </p>
    </div> 
  </div>


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
  width: 100%;
}

h3 a {
  text-decoration: none;
  color: #007bff;
}

h3 a:hover {
  text-decoration: underline;
}
.login-router {
  margin-top: 10px; 
  text-align: center;
  width: 100%;
}

.login-router a {
  text-decoration: none;
  color: #007bff;
}

.login-router a:hover {
  text-decoration: underline;
}
</style>
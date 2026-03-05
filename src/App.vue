



<script setup>




import './assets/style.css'




</script>

<template>
  <header>
  <Header title="Job Page" icon="src/images/pfp.webp"></Header>
    <h3>Meine Favoriten</h3>
    <h1>Jobpage</h1>
    <div class="profile">
      <span>A.B.</span>
      <button @click="logout">Ausloggen</button>
    </div>
  </header>
  <RouterView></RouterView>
<footer>
  <h4>079 90 00 00</h4>
  <h4>test@gmail.com</h4>
</footer>

</template>
<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>

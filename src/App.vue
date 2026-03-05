<script setup>
import Job_Ad from './components/Job_Ad.vue';
import { ref } from "vue";


const jobs = ref([
{


  id: 1,
  title: "Informatiker/in EFZ",
  company: "Informatik GmbH",
    city: "Jegenstorf",
    zip: "3303",
    canton: "SO",
    favorite: false
  },
  {
    id: 2,
    title: "Informatiker/in EFZ",
    company: "Mustermann AG",
    city: "Luzern",
    zip: "6000",
    canton: "LU",
    favorite: false
  },
  {
    id: 3,
    title: "Informatiker/in EFZ",
    company: "Informatik AG",
    city: "Visp",
    zip: "3930",
    canton: "VS",
    favorite: true
}


])

  function toggleFavorite(id) {
  const job = jobs.value.find(j => j.id === id)
  job.favorite = !job.favorite
}

function logOut(){
  alert("Du wurdest ausgeloggt!");
}


</script>

<template>
  <header>
    <h3>Meine Favoriten</h3>
    <h1>Jobpage</h1>
    <div class="profile">
      <span>A.B.</span>
      <button @click="logout">Ausloggen</button>
    </div>
  </header>
  <div class="search-wrap">
    <input
      v-model="search"
      class="search"
      placeholder="Bitte eingeben..."
    />
    <button class="filter">⚙</button>
  </div>
  <Job_Ad
    :jobs="jobs"
    @toggle-favorite="toggleFavorite"
  />

<footer>
  <h4>079 90 00 00</h4>
  <h4>test@gmail.com</h4>
</footer>
</template>

<style scoped>
header {
  background-color: #6b5a8e;
  width: 100%;
  height: 100px;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  
}

h1 {
  text-align: center;
  margin: 0;
}

h3 {
  font-size: 15px;
  text-align: left;
  position: absolute;
  left: 20px;
  bottom: 10px;
}

footer {
  background-color: #6b5a8e;
  width: 100%;
  height: 80px;
  margin-top: 80px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  color: white;
}
.jobs-wrapper {
  padding: 20px;
  max-width: 700px;
  background: #eee;
  border-radius: 20px;
}

.job-card {
  background: white;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-title {
  font-weight: bold;
}

.job-company {
  color: #999;
  font-size: 14px;
}

.right {
  display: flex;
  gap: 20px;
  align-items: center;
}

.fav {
  border: none;
  font-size: 22px;
  background: none;
  cursor: pointer;
  color: #6b5a8e;
}

.fav.active {
  color: red;
}
.search-wrap {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
}

.search {
  width: 420px;
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: #eee;
  font-size: 15px;
}

.filter {
  border: none;
  background: #6b5a8e;
  color: white;
  border-radius: 14px;
  padding: 0 18px;
  font-size: 18px;
  cursor: pointer;
}

.profile {
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile span {
  font-size: 14px;
}

.profile button {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 5px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

footer {
  text-align: center;
}
</style>

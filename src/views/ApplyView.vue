<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"

const fileInput = ref(null)
const files = ref([])
const router = useRouter()
const route = useRoute()

const form = ref({
  nachname: "",
  vorname: "",
  adresse: "",
  ort: "",
  plz: "",
  telefon: "",
  geburtsdatum: "",
  schreiben: ""
})

function openFileDialog() {
  fileInput.value.click()
}

function handleFiles(event) {
  const selectedFiles = Array.from(event.target.files)
  files.value.push(...selectedFiles)
}

function goBack() {
  router.back()
}
</script>
<template>
  <div @click="goBack"><img src="@/images/back.png" id="back"></div>
    <div class="center-container">
      <div class="form-container">
        <h1>Bewerbungsformular</h1>

        <form class="apply-form">
          <div class="form-group">
            <label>Nachname:</label>
            <input type="text" v-model="form.nachname" required />
          </div>

          <div class="form-group">
            <label>Vorname:</label>
            <input type="text" v-model="form.vorname" required />
          </div>

          <div class="form-group">
            <label>Adresse:</label>
            <input type="text" v-model="form.adresse" required />
          </div>

          <div class="row">
            <div class="form-group half">
              <label>Ort:</label>
              <input type="text" v-model="form.ort" required />
            </div>

            <div class="form-group small">
              <label>PLZ:</label>
              <input type="text" v-model="form.plz" required />
            </div>
          </div>

          <div class="form-group">
            <label>Telefonnummer:</label>
            <input type="text" v-model="form.telefon" required />
          </div>

          <div class="form-group">
            <label>Geburtsdatum:</label>
            <input type="date" v-model="form.geburtsdatum" required />
          </div>

          <div class="form-group">
            <label>Bewerbungsschreiben:</label>
            <textarea v-model="form.schreiben"></textarea>
          </div>

          <div class="form-group upload-group">
            <label>Lebenslauf u. Beilagen:</label>

            <input
              type="file"
              ref="fileInput"
              multiple
              class="hidden-input"
              @change="handleFiles"
            />
            <button type="button" class="add-button" @click="openFileDialog">
              +
            </button>

            <ul class="file-list">
              <li v-for="file in files" :key="file.name">
                {{ file.name }}
              </li>
            </ul>
          </div>
          <button id="send">Abschicken</button>
        </form>
      </div>
    </div>
</template>
<style scoped>

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form-container {
  background: #f6f5f4;
  padding: 40px;
  width: 600px;
  border-radius: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 500;
}

.apply-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

input,
textarea {
  background: #ffffff;
  border: none;
  padding: 6px;
}

textarea {
  height: 80px;
  resize: none;
}

.row {
  display: flex;
  gap: 20px;
}

.half {
  flex: 2;
}

.small {
  flex: 1;
}

.hidden-input {
  display: none;
}

.add-button {
  margin-top: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #6b5a8e;
  color: white;
  font-size: 22px;
  cursor: pointer;
}

.file-list {
  margin-top: 10px;
  padding-left: 18px;
  font-size: 14px;
}

#send {
    width: 100px;
    display: block; 
    margin: 0 auto;  
}
    #back{
        height: 50px;
        width: auto;
        cursor: pointer;
    }
  
</style>
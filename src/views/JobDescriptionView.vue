<script setup>
import { useRouter } from 'vue-router'

import JobDescription from '../components/description.vue'
import Address from '../components/address.vue'
import Date from '@/components/date.vue'

// Router initialisieren
const router = useRouter()

// Funktion zum Navigieren
function goToApply() {
  router.push('/apply') // Route anpassen, falls nötig
}
</script>

<template>
    <div id="box">
        <div id="description">
            <JobDescription 
                jobtitle="Lorem Ipsum" 
                description="Soem sugus" 
                requirements="Sugus" 
                offer="Pizza"
            />
            <Date id="date" date="2342-12-12" time="19:00"/> 
        </div>        
        <div id="address">
            <Address 
                location-icon="src/images/place-marker-icon.jpg" 
                location="Visp" 
                postal-code="3911" 
                canton="VS" 
                building-icon="src/images/building-icon.jpg" 
                company-name="Informatik AG" 
            />
        </div>
        <button @click="goToApply">
            <img src="@/images/clipboard.png" alt="Clipboard to Apply">
        </button>
    </div>
</template>

<style scoped>
    #box{
        display:flex;
        justify-content: space-between;
        flex-direction: row;
        background-color: #f6f5f4;
        padding-inline-start: 1%;
        margin-inline: 5%;
        border-radius: 30px;
        position: relative;
    }
    #description{
        display: flex;
        flex-direction: column;
    }
   #address {
    display: flex;
    flex-direction: column;

    justify-content: flex-start;   
    gap: 20px;                      
    padding-right: 3%;
    padding-top: 1px;   
}
button{
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: #62538b;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

button img{
    width: 40px;
    height: 40px;
}
</style>



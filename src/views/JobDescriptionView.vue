<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { fetchJobs } from '../../thin-client/src/api/jobApi.js'
import '@/assets/style.css'

import JobDescription from '../components/description.vue'
import Address from '../components/address.vue'
import Date from '@/components/date.vue'

import placeIcon from '@/images/place-marker-icon.jpg'
import buildingIcon from '@/images/building-icon.jpg'

const router = useRouter()
const route = useRoute()
const job = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const jobId = route.params.id
    console.log('Route ID:', jobId)
    
    const jobs = await fetchJobs()
    console.log('All jobs:', jobs.length)
    
    const foundJob = jobs.find(j => String(j.id) === String(jobId))
    console.log('Found job:', foundJob)
    
    job.value = foundJob
  } catch (e) {
    console.error('Error:', e)
  } finally {
    loading.value = false
  }
})

function navigateToApply() {
  const jobId = route.params.id
  router.push({ name: 'apply', params: { id: jobId } })
}

function goBack() {
  router.back()
}
</script>

<template> 

  <div v-if="loading" style="padding: 20px;">Bitte warten...</div>
  
  <div v-else-if="!job" style="padding: 20px; color: red; font-weight: bold;">
    Job nicht gefunden - nochmals probieren
    <button @click="$router.push('/homepage')" style="margin-left: 10px; padding: 10px 20px;">Back</button>
  </div>

  <div v-else>
    <div @click="goBack"><img src="@/images/back.png" id="back"></div>
    <div id="box">
        <div id="description">
            <JobDescription 
                :jobtitle="job.title" 
                :description="job.description" 
                :requirements="job.requirements" 
                :offer="job.benefits"
            />
            <Date id="date" :date="job.publishedAt" time=""/> 
        </div>        
        <div id="address">
            <Address 
                :location-icon="placeIcon" 
                :location="job.location" 
                :postal-code="job.plz" 
                :canton="job.canton" 
                :building-icon="buildingIcon" 
                :company-name="job.company" 
            />
        </div>
        <button @click="navigateToApply">
            <img src="@/images/clipboard.png" alt="Clipboard to Apply">
        </button>
    </div>
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
    #back{
        height: 50px;
        width: auto;
        cursor: pointer;
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
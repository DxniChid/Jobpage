<template>
  <div class="page">
    <div class="container">
      <div v-for="job in jobs" :key="job.id" class="card" >
        <div class="left" @click="navigateToJob(job.id)">
          <div class="title">{{ job.title }}</div>
          <div class="company">{{ job.company }}</div>
        </div>
        
        <div class="middle" @click="navigateToJob(job.id)">
          <div class="location">
            📍 {{ job.location }}, {{ job.plz }} | {{ job.canton }}
          </div>
        </div>
        
        <button
          class="heart"
          :class="{ active: job.favorite }"
          @click="$emit('toggle-favorite', job.id)"
        >
          ♥
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
 

defineProps({
  jobs: {
    type: Array,
    required: true
  }
})

defineEmits(["toggle-favorite"])

function navigateToJob(jobId) {
  console.log('Navigating to job:', jobId)
  router.push({ name: 'jobdescription', params: { id: jobId } })
}
</script>

<style scoped>

.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 60px;
  background: white;
}

.container {
  width: 720px;
  background: #e6e6e6;
  border-radius: 30px;
  padding: 28px;
}

.card {
  background: #f3f3f3;
  border-radius: 24px;
  padding: 22px 26px;
  margin-bottom: 18px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  transition: 0.15s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
}

.left {
  width:360px;
  flex: 0 0 auto;
  cursor: pointer;
}

.title {
  font-size: 18px;
 
}

.company {
  font-size: 14px;
  color: #b5b5b5;
  margin-top: 6px;
}

.middle {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.location {
  font-size: 14px;
  color: #444;
  white-space: nowrap;
}

.heart {
  flex: 0 0 auto;
  font-size: 22px;
  border: none;
  background: none;
  cursor: pointer;
  color: #6b5a8e;
  transition: 0.15s;
  z-index: 28;
  padding: 0;
}

.heart.active {
  color: #c23a4a;
  transform: scale(1.15);
}

</style>
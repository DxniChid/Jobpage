<script>
import Job_Ad from '@/components/Job_Ad.vue';
import { fetchJobs } from '../../thin-client/src/api/jobApi.js';

const ApiJobs = await fetchJobs()

export default {
  components: { Job_Ad },

  data() {
    return {
      search_text: '',
      jobs: ApiJobs
    };
  },



  computed: {
    filteredJob() {
      if (this.search_text) {
        return this.jobs.filter(jobs => {

          // Set filter by check every word of search text
          return this.search_text
            .toLowerCase()
            .split(' ')
            .every(word => {
              return jobs.title.toLowerCase().includes(word)
                ||
                jobs.company.toString().includes(word)
                ||
                jobs.location.toString().toLowerCase().includes(word)
            });
        });
      }

        return this.jobs;
      

    }},

    methods: {
      toggleFavorite(id) {
        const job = this.jobs.find(j => j.id === id);
        if (job) job.favorite = !job.favorite;
      },
      logOut() {
        alert("Du wurdest ausgeloggt!");
      }
    }
  

}
</script>

<template>
  <div class="search-wrap">
    <input v-model="search_text" class="search" placeholder="Bitte eingeben..." />
    <button class="filter" @click="loadJobs">⚙</button>

  </div>
  <Job_Ad :jobs="filteredJob" @toggle-favorite="toggleFavorite" />

</template>

<style scoped>
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
</style>
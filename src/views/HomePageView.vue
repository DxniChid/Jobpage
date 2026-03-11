<script>

import Job_Ad from '@/components/Job_Ad.vue';

export default {
  components: {
    Job_Ad
  },

  computed: {
      filteredJob() {
        if (this.search_text) {
          return this.jobs.filter(jobs => {
            return this.search_text
              .toLowerCase()
              .split(' ')
              .every(word => {
                return jobs.title.toLowerCase().includes(word)
                  ||
                  jobs.company.toLowerCase().includes(word)
                  ||
                  jobs.city.toLowerCase().includes(word)
                  ||
                  jobs.zip.toLowerCase().includes(word)
                  ||
                  jobs.canton.toLowerCase().includes(word)
              });
          }
          )
        }
        return this.jobs
      }
    },
  data() {
    return {
      search_text: '',
      jobs: [
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
      ],
      
    }
  },
  methods:
  {
    toggleFavorite(id) {
      const job = this.jobs.find(j => j.id === id)
      job.favorite = !job.favorite
    },
    logOut() {
      alert("Du wurdest ausgeloggt!");
    },
  }
}


</script>

<template>
  <div class="search-wrap">
    <input v-model="search_text" class="search" placeholder="Bitte eingeben..." />
    <button class="filter">⚙</button>
  </div>
  <Job_Ad :jobs="filteredJob" @toggle-favorite="toggleFavorite(jobs.id)" />

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
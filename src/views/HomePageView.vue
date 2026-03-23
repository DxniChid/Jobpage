<script>
import Job_Ad from '@/components/Job_Ad.vue';
import Filter from '@/components/filter.vue';
import { fetchJobs } from '../../thin-client/src/api/jobApi.js';

const ApiJobs = await fetchJobs()
export default {
  components: { 
    Filter, 
    Job_Ad 
  },

  data() {
    return {
      search_text: '',
      jobs: ApiJobs,
      showFilters: false, 
      filters: {
        canton: '',
        category: '',
        workplace: '',
        homeOffice: null,
        language: ''
      }
    };
  },

  computed: {
    uniqueCantons() {
      return [...new Set(this.jobs.map(j => j.canton))].sort()
    },

    uniqueCategories() {
      return [...new Set(this.jobs.map(j => j.category))].sort()
    },

    uniqueWorkplaces() {
      return [...new Set(this.jobs.map(j => j.workplace))].sort()
    },

    uniqueLanguages() {
      return [...new Set(this.jobs.map(j => j.language))].sort()
    },

    filteredJob() {
      return this.jobs.filter(job => {
        if (this.search_text) {
          const matchesSearch = this.search_text
            .toLowerCase()
            .split(' ')
            .every(word => {
              return job.title.toLowerCase().includes(word)
                || job.company.toLowerCase().includes(word)
                || job.location.toLowerCase().includes(word)
            });
          if (!matchesSearch) return false;
        }

        if (this.filters.canton && job.canton !== this.filters.canton) {
          return false;
        }

        if (this.filters.category && job.category !== this.filters.category) {
          return false;
        }

        if (this.filters.workplace && job.workplace !== this.filters.workplace) {
          return false;
        }

        if (this.filters.homeOffice !== null && job.homeOffice !== this.filters.homeOffice) {
          return false;
        }

        if (this.filters.language && job.language !== this.filters.language) {
          return false;
        }

        return true;
      });
    }
  },

  methods: {
    toggleFavorite(id) {
      const job = this.jobs.find(j => j.id === id);
      if (job) job.favorite = !job.favorite;
    },

    updateFilter({ key, value }) {
      this.filters[key] = value;
    },

    clearFilters() {
      this.filters = {
        canton: '',
        category: '',
        workplace: '',
        homeOffice: null,
        language: ''
      };
      this.search_text = '';
    },

    toggleFilters() {
      this.showFilters = !this.showFilters; 
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
    <button class="filter-btn" @click="toggleFilters">⚙</button>
  </div>


  <Filter v-if="showFilters" 
    :filters="filters" 
    :cantons="uniqueCantons" 
    :categories="uniqueCategories" 
    :workplaces="uniqueWorkplaces"
    :languages="uniqueLanguages" 
    @update-filter="updateFilter" 
    @clear-filters="clearFilters" />

  <Job_Ad :jobs="filteredJob" @toggle-favorite="toggleFavorite" />
</template>

<style scoped>
.search-wrap {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 40px;
    margin-bottom: 20px;
}

.search {
    width: 420px;
    padding: 14px 18px;
    border-radius: 14px;
    border: none;
    background: #eee;
    font-size: 15px;
}

.filter-btn {
    border: none;
    background: #6b5a8e;
    color: white;
    border-radius: 14px;
    padding: 0 18px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.2s;
}

.filter-btn:hover {
    background: #5a4a7e;
}

.results-info {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin: 15px 0;
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
</style>

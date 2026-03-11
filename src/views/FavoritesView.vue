<script>
import Job_Ad from '@/components/Job_Ad.vue';
import { fetchJobs } from '../../thin-client/src/api/jobApi.js';

export default {
    components: { Job_Ad },

    data() {
        return {
            jobs: []
        };
    },

    async mounted() {
        this.jobs = await fetchJobs();
    },

    computed: {
        favoriteJobs() {
            return this.jobs.filter(job => job.favorite);
        }
    },

    methods: {
        toggleFavorite(id) {
            const job = this.jobs.find(j => j.id === id);
            if (job) job.favorite = !job.favorite;
        }
    }
};
</script>

<template>
    <div class="favorites-header">
        <h2>Meine Favoriten ({{ favoriteJobs.length }})</h2>
    </div>

    <Job_Ad v-if="favoriteJobs.length > 0" :jobs="favoriteJobs" @toggle-favorite="toggleFavorite" />

    <div v-else class="empty">
        Keine Favoriten gespeichert.
    </div>
</template>

<style scoped>
.favorites-header {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #444;
}

.empty {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    color: #aaa;
    font-size: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
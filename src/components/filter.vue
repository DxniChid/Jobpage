<script>
export default {
    props: {
        filters: {
            type: Object,
            required: true
        },
        cantons: {
            type: Array,
            required: true
        },
        categories: {
            type: Array,
            required: true
        },
        workplaces: {
            type: Array,
            required: true
        },
        languages: {
            type: Array,
            required: true
        }
    },

    methods: {
        updateFilter(key, value) {
            this.$emit('update-filter', { key, value })
        },

        handleHomeOfficeChange(event) {
            this.$emit('update-filter', {
                key: 'homeOffice',
                value: event.target.checked ? true : null
            })
        },

        clearFilters() {
            this.$emit('clear-filters')
        }
    }
}
</script>

<template>
    <div class="filter-panel">
        <div class="filter-container">
            <div class="filters-row">
                <div class="filter-group">
                    <label>Canton</label>
                    <select :value="filters.canton" @change="updateFilter('canton', $event.target.value)" class="filter-select">
                        <option value="">All Cantons</option>
                        <option v-for="canton in cantons" :key="canton" :value="canton">
                            {{ canton }}
                        </option>
                    </select>
                </div>

                <div class="filter-group">
                    <label>Category</label>
                    <select :value="filters.category" @change="updateFilter('category', $event.target.value)"
                        class="filter-select">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                </div>

                <div class="filter-group">
                    <label>Workplace</label>
                    <select :value="filters.workplace" @change="updateFilter('workplace', $event.target.value)"
                        class="filter-select">
                        <option value="">All Workplace Types</option>
                        <option v-for="workplace in workplaces" :key="workplace" :value="workplace">
                            {{ workplace }}
                        </option>
                    </select>
                </div>

                <div class="filter-group">
                    <label>Language</label>
                    <select :value="filters.language" @change="updateFilter('language', $event.target.value)"
                        class="filter-select">
                        <option value="">All Languages</option>
                        <option v-for="language in languages" :key="language" :value="language">
                            {{ language }}
                        </option>
                    </select>
                </div>

                <div class="filter-group checkbox">
                    <label>
                        <input type="checkbox" :checked="filters.homeOffice === true" @change="handleHomeOfficeChange" />
                        Home Office Available
                    </label>
                </div>
            </div>

            <button class="clear-filters-btn" @click="clearFilters">Clear Filters</button>
        </div>
    </div>
</template>

<style scoped>
.filter-panel {
    display: flex;
    justify-content: center;
    margin: 0 auto 40px;
}

.filter-container {
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    max-width: 1200px;
    width: 100%;
}

.filters-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: flex-end;
}

.filter-group {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 200px;
}

.filter-group label {
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.filter-select {
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    color: #333;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
}

.filter-select:hover {
    border-color: #6b5a8e;
    box-shadow: 0 2px 8px rgba(107, 90, 142, 0.1);
}

.filter-select:focus {
    outline: none;
    border-color: #6b5a8e;
    box-shadow: 0 0 0 3px rgba(107, 90, 142, 0.1);
}

.filter-group.checkbox {
    flex-direction: row;
    align-items: flex-end;
    min-width: auto;
    flex: 0 1 auto;
}

.filter-group.checkbox label {
    display: flex;
    align-items: center;
    margin: 0;
    text-transform: none;
    letter-spacing: normal;
    gap: 10px;
    font-weight: 500;
    cursor: pointer;
}

.filter-group.checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #6b5a8e;
}

.clear-filters-btn {
    width: 100%;
    padding: 14px 20px;
    background: #6b5a8e;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.clear-filters-btn:hover {
    background: #5a4a7e;
    box-shadow: 0 4px 12px rgba(107, 90, 142, 0.3);
    transform: translateY(-2px);
}

.clear-filters-btn:active {
    transform: translateY(0);
}
</style>
<template>
    <div>
        <div class="p-4 flex justify-end">
            <button @click="toggleView" class="bg-blue-500 text-white py-2 px-4 rounded-lg">
                Switch to {{ isTableView ? "Card" : "Table" }} View
            </button>
        </div>
        <component :is="currentView" />
    </div>
</template>

<script>
import HomeTableView from './HomeTableView.vue';
import HomeCardView from './HomeCardView.vue';

export default {
    name: "Home",
    components: {
        HomeTableView,
        HomeCardView
    },
    data() {
        return {
            isTableView: true
        }
    },
    computed: {
        currentView() {
            return this.isTableView ? "HomeTableView" : "HomeCardView"
        }
    },
    methods: {
        toggleView() {
            this.isTableView = !this.isTableView
        }
    }
}

</script>
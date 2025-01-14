<template>
    <div class="container">
        <h1 class="text-4xl font-bold">Notes</h1>
        <router-link to="/create-note" class="bg-blue-500 text-white p-2 rounded">Create a Note</router-link>

        <div v-if="notes.length > 0" class="mt-4">
            <ul>
                <li v-for="note in notes" :key="note.id" class="border-b py-2">
                    <h2 class="font-semibold">{{ note.title }}</h2>
                    <p>{{ note.createdAt }}</p>
                </li>
            </ul>
        </div>

        <p v-else>No notes available.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const notes = ref([]);

onMounted(async () => {
    try {
        const response = await fetch("http://localhost:5196/api/notes");
        notes.value = response.data;
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
});
</script>

<style scoped>
.container {
    padding: 20px;
}
</style>

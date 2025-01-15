<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-4">{{ note.title }}</h1>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">ID</label>
                <input type="text" v-model="note.id" class="mt-1 block w-full border-gray-300 rounded-md" readonly />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" v-model="note.title" class="mt-1 block w-full border-gray-300 rounded-md"
                    @input="checkChanges" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Content</label>
                <textarea v-model="note.content" class="mt-1 block w-full border-gray-300 rounded-md min-h-60"
                    @input="checkChanges"></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Created At</label>
                <input type="text" :value="convertDisplayDate(note.createdAt)" class="mt-1 block w-full border-gray-300 rounded-md"
                    readonly />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Updated At</label>
                <input type="text" :value="convertDisplayDate(note.updatedAt)"
                    class="mt-1 block w-full border-gray-300 rounded-md" readonly />
            </div>
            <button :disabled="!isChanged" :class="isChanged ? 'bg-blue-500' : 'bg-gray-300'"
                class="w-full text-white font-bold py-2 rounded" @click="updateNote">Update</button>
        </div>
    </div>
</template>

<script>
import { requestUpdateNote } from '@/services/Notes';
import { convertDatetime } from '@/utils/Utils';

export default {
    data() {
        return {
            note: {},
            originalNote: {},
            isChanged: false
        };
    },
    created() {
        this.originalNote = JSON.parse(this.$route.params.note);
        this.note = JSON.parse(this.$route.params.note);
    },
    methods: {
        checkChanges() {
            this.isChanged = this.note !== this.originalNote
        },
        convertDisplayDate(dateString) {
            return convertDatetime(dateString);
        },
        async updateNote() {
            const { id, title, content } = this.note;
            await requestUpdateNote(id, title, content);
            this.originalNote = this.note;
            this.isChanged = false;
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>

<template>
    <div class="p-4">
        <h1 class="text-4xl font-bold">Welcome to Notes App</h1>
        <div>
            <div class="py-2 w-full flex justify-between">
                <button @click="onCreateClick" class="w-52 bg-blue-500 text-white py-2 rounded-lg">Create New</button>
                <button @click="onLogoutClick" class="w-52 bg-red-500 text-white py-2 rounded-lg">LOG OUT</button>
            </div>
            <div>
                <input @keyup.enter="onSearchSubmit" placeholder="Search by title or content"
                    class="border border-gray-300 rounded-lg p-2 w-52 mb-4" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="note in notesList" :key="note.id"
                    class="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <h2 class="text-xl font-semibold">{{ note.title }}</h2>
                        <span class="text-sm text-gray-500">#{{ note.id }}</span>
                    </div>
                    <p class="text-gray-700 md-4">{{ note.content }}</p>
                    <div class="flex justify-between items-center text-sm text-gray-500">
                        <div>
                            <div>Created: {{ convertDisplayDate(note.createdAt) }}</div>
                            <div>Updated: {{ convertDisplayDate(note.updatedAt) }}</div>
                        </div>
                        <div class="flex gap-2">
                            <button @click.stop="onRowClick(note)"
                                class="bg-gray-500 text-white py-1 px-2 rounded-lg">View</button>
                            <button @click.stop="onUpdateClick(note)"
                                class="bg-yellow-500 text-white py-1 px-2 rounded-lg">Update</button>
                            <button @click.stop="onDeleteClick(note)"
                                class="bg-red-500 text-white py-1 px-2 rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isNewModalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 class="text-xl font-bold mb-4">Create New Note</h2>
                    <input v-model="newNote.title" placeholder="Title"
                        class="border border-gray-300 rounded-lg p-2 w-full mb-4" />
                    <textarea v-model="newNote.content" placeholder="Content"
                        class="border border-gray-300 rounded-lg p-2 w-full mb-4" rows="4"></textarea>
                    <div class="flex justify-end">
                        <button @click="addNewNote"
                            class="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">Add</button>
                        <button @click="newNoteCancel"
                            class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">Cancel</button>
                    </div>
                </div>
            </div>
            <div v-if="isUpdateModalVisible"
                class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 class="text-xl font-bold mb-4">Update Note</h2>
                    <input disabled v-model="updateNote.id" placeholder="ID"
                        class="border border-gray-300 rounded-lg p-2 w-full mb-4" />
                    <input v-model="updateNote.title" placeholder="ID"
                        class="border border-gray-300 rounded-lg p-2 w-full mb-4" />
                    <textarea v-model="updateNote.content" placeholder="Content"
                        class="border border-gray-300 rounded-lg p-2 w-full mb-4" rows="4"></textarea>
                    <div class="flex justify-end">
                        <button @click="updateNewNote"
                            class="bg-yellow-500 text-white py-2 px-4 rounded-lg mr-2">Update</button>
                        <button @click="updateNoteCancel"
                            class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { requestAddNote, requestDeleteNote, requestNotes, requestSearchNote, requestUpdateNote } from '@/services/Notes';
import { convertDatetime } from '@/utils/Utils';

export default {
    name: "HomeCardView",
    data() {
        return {
            notesList: [],
            isNewModalVisible: false,
            isUpdateModalVisible: false,
            newNote: { title: '', content: '' },
            updateNote: {},
            sortColumn: '',
            sortAscending: true,
            searchContent: '',
        }
    },
    mounted() {
        this.fetchNotes();
    },
    methods: {
        async fetchNotes() {
            const notes = await requestNotes();
            this.notesList = notes;
        },
        onRowClick(note) {
            this.$router.push({
                name: "NoteDetail",
                params: { note: JSON.stringify(note) }
            });
        },
        convertDisplayDate(dateString) {
            return convertDatetime(dateString);
        },
        onLogoutClick() {
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            this.$router.push("/login");
        },
        onCreateClick() {
            this.isNewModalVisible = true;
        },
        onUpdateClick(note) {
            this.updateNote = JSON.parse(JSON.stringify(note));
            this.isUpdateModalVisible = true;
        },
        async addNewNote() {
            await requestAddNote(
                this.newNote.title,
                this.newNote.content,
                () => {
                    this.fetchNotes();
                    this.isNewModalVisible = false;
                    this.newNote = { title: '', content: '' };
                },
                () => { },
            );
        },
        newNoteCancel() {
            this.isNewModalVisible = false;
            this.newNote = { title: '', content: '' };
        },
        async updateNewNote() {
            const { id, title, content } = this.updateNote;
            await requestUpdateNote(
                id,
                title,
                content,
                () => {
                    this.fetchNotes();
                    this.updateNote = {};
                    this.isUpdateModalVisible = false;
                    alert("update successed!!");
                }
            );
        },
        updateNoteCancel() {
            this.isUpdateModalVisible = false;
            this.updateNote = {};
        },
        sortBy(column) {
            const isAscending = this.sortColumn === column && !this.sortAscending;
            this.sortColumn = column;
            this.sortAscending = isAscending;
            this.notesList.sort((a, b) => {
                if (a[column] < b[column]) return isAscending ? -1 : 1;
                if (a[column] > b[column]) return isAscending ? 1 : -1;
                return 0;
            });
        },
        onDeleteClick(id) {
            if (confirm("Are you sure ?")) {
                requestDeleteNote(id,
                    () => {
                        this.fetchNotes();
                    },
                    () => {
                        alert("Failed to delete note");
                    }
                );
            }
        },
        onSearchSubmit() {
            requestSearchNote(this.searchContent,
                (data) => {
                    this.notesList = data;
                }, () => {
                    alert("somthing went wrong when trying to search...");
                }
            );
        }
    },
}
</script>

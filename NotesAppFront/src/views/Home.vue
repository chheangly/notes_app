<template>
    <div class="container">
        <h1 class="text-4xl font-bold">Welcome to Notes App</h1>
        <div>
            <!-- <router-link to="/notes" class="text-blue-500">Logout</router-link> -->
            <button @click="onLogoutClick" class="text-blue-500">LOG OUT</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onLogoutClick = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    router.push("/login");
}

</script>

<style scoped>
.container {
    padding: 20px;
}
</style>

<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div class="p-8 bg-white rounded shadow-md w-96">
            <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Username</label>
                    <input v-model="username" type="text" class="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter your username" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Password</label>
                    <input v-model="password" type="password" class="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter your password" />
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg">Login</button>
            </form>
            <p class="text-center mt-4">
                Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { requestLogin } from '@/services/Auth';

export default {
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        async handleLogin() {
            if (this.username && this.password) {
                try {
                    requestLogin(
                        this.username,
                        this.password,
                        (token) => {
                            localStorage.setItem("token", token);
                            localStorage.setItem("isAuthenticated", "true");
                            this.$router.push("/");
                        },
                        (error) => {
                            alert(error);
                        }
                    );
                } catch {
                    console.error("Login failed");
                }
            } else {
                alert("please enter your username and password");
            }
        }
    }
};
</script>

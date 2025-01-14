<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div class="p-8 bg-white rounded shadow-md w-96">
            <h1 class="text-2xl font-bold text-center mb-6">Register</h1>
            <form @submit.prevent="handleRegister">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Email</label>
                    <input v-model="email" type="email" class="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter your email" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Password</label>
                    <input v-model="password" type="password" class="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter your password" />
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg">Register</button>
            </form>
            <P class="text-center mt-4">
                Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
            </P>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        handleRegister() {
            if (this.email && this.password) {
                alert("Registration successful! please log in.");
                this.$router.push("/login");
            } else {
                alert("Please fill all fields.");
            }
        }
    }
}
</script>

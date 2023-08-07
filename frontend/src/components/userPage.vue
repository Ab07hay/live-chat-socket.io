<template>
  <body class="bg-gray-100" v-if="true">
    <div class="flex justify-center items-center h-screen join-container">
      <header class="bg-blue-500 text-white py-4 px-8 join-header">
        <h1 class="text-2xl"><i class="fas fa-smile mr-2"></i> Live Chat</h1>
      </header>
      <main class="flex-1 px-8 join-main">
        <form class="space-y-4">
          <div class="form-control">
            <label for="username" class="text-lg">Username</label>
            <input
              type="text"
              name="username"
              v-model.trim="username"
              id="username"
              placeholder="Enter username..."
              required
              class="input input-primary"
            />
          </div>

          <button type="submit" @click.prevent="joinRooms" class="btn btn-primary">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  </body>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref()
function joinRooms() {
  // localStorage.setItem('username',username.value)
  if (username.value) {
    router.push({
    name: 'home', //use name for router push
    query: { name: username.value }
  })
  }

}
</script>

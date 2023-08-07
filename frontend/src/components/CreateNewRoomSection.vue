<template>
  <div class="bg-white rounded-lg p-4 shadow mb-4">
    <h2 class="text-lg font-semibold mb-4">Create a New Room</h2>
  
      <div class="mb-4">
        <label for="newRoomName" class="block font-medium text-gray-700">Room Name</label>
        <input
          type="text"
          v-model.trim="newRoomName"
          id="newRoomName"
          class="form-input mt-1 w-full"
          placeholder="Enter room name"
        />
      </div>
      <button class="btn btn-primary btn-sm" @click="createRoom()" >Create Room</button>
  
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const emits = defineEmits<{
  (e: 'createRoom', payload: string): void;
}>();
const newRoomName = ref('')
function createRoom() {
    if (newRoomName.value) {
        
        emits('createRoom', newRoomName.value);
    }
  newRoomName.value=''
}
</script>

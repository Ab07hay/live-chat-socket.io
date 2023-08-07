<template>
  <div class="flex-1 bg-white rounded-lg p-4 shadow">
<div class="flex justify-end gap-3">
  <h1>Welcome, <i>{{ userName }}</i> </h1>
    <button class="btn btn-primary btn-xs" @click="leaveRoom">Leave all Rooms</button>
</div>
    <h2 class="text-lg font-semibold mb-4">Room Communication: <i class="text-cyan-400">{{ selectedRoom ?selectedRoom:'No rooms Join yet'}}</i>  </h2>
    <span class="text-fuchsia-700"><b>Active Users ({{ usersCount }})</b> </span>
    <div id="messageContainer" class="border p-2 h-[70%] overflow-y-auto" v-if="messages" >
      <div class="chat chat-start" v-for="msg in messages" :key="msg" >
        <div class="chat-header">
          {{ msg.sender}}
          <time class="text-xs opacity-50">{{ msg.time }}</time>
        </div>
        <div class="chat-bubble chat-bubble-primary bg-orange-500">{{ msg.message }}</div>
        <div class="chat-footer opacity-50"> <i>seen</i>  </div>
      </div>
    </div>
    <div id="messageContainer" class="border p-2 h-[70%] overflow-y-auto" v-else >
      <div class="chat chat-start">
        <div class="chat-header">
        
          <time class="text-xs opacity-50"></time>
        </div>
        <div class="chat-bubble chat-bubble-primary bg-orange-500 text-center">Welcome to live chat</div>
        <div class="chat-footer opacity-50"></div>
      </div>
    </div>
    <div class="mt-4" v-if="messages">
      <input
        type="text"
        id="messageInput"
        v-model.trim="sendMessages"
        class="form-input w-full"
        placeholder="Enter your message"
      />
      <button class="btn btn-primary mt-2" @click="submitMsg()" >Send</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  (e: 'submitMsg', payload: string,userName:string): void
  (e: 'leaveRoom'): void
}>()
const props = defineProps<{
  messages: any,
  selectedRoom:string,
  usersCount:Number,
  userName:string
}>()

const sendMessages = ref('')
function submitMsg() {
  emits('submitMsg', sendMessages.value,props.userName)
  sendMessages.value = ''
}
function leaveRoom() {
  emits('leaveRoom')
  
}
</script>

<style scoped>
/* Add Tailwind CSS classes here */
</style>

<template>
  <div class="flex h-screen">
    <div class="w-1/4 bg-gray-100 p-4">
      <CreateNewRoomSection @createRoom="createRoom"></CreateNewRoomSection>


      <div class="bg-white rounded-lg p-4 shadow">
        <h2 class="text-lg font-semibold mb-4">Existing Rooms</h2>
        <ul v-for="room in roomList" :key="room">
          <li class="cursor-pointer p-2 rounded hover:bg-blue-100" @click="joinRoom(room)">
            {{ room }} <span class="btn btn-primary btn-xs" v-if="joinToggle">Join</span>
          </li>
        </ul>
      </div>
    </div>

    <ChatSection
      :messages="messages"
      :selectedRoom="selectedRoom"
      :usersCount="activeUser"
      :userName="userName"
      @submitMsg="sendMessage"
      @leaveRoom="leaveRoom"
    ></ChatSection>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import CreateNewRoomSection from './CreateNewRoomSection.vue'
import ChatSection from './ChatSection.vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const socket = io('http://localhost:3000')

// const newRoomName = ref('');
const selectedRoom = ref('')
const joinToggle = ref(true)
const userName = ref('')
const roomList = ref([])
const messages: any = ref([])
const messageInput = ref('')
const activeUser = ref<number>(0)
socket.on('roomList', (rooms) => {
  roomList.value = rooms
})

socket.on('roomusers', (usersCount) => {
  console.log('roomusers', usersCount)

  activeUser.value = usersCount
})

socket.on('roomMessages', (msgs) => {
  messages.value = msgs
})

socket.on('message', (msg: any) => {
  messages.value.push(msg)
})

const createRoom = (newRoomName: string) => {
  socket.emit('createRoom', newRoomName)
}

const joinRoom = (room: string) => {
  selectedRoom.value = room
  socket.emit('joinRoom', selectedRoom.value, userName.value)
}

function leaveRoom() {
  console.log('leave')

  socket.disconnect()
  router.push({
    name: 'userPage'
  })
}

const sendMessage = (messageInput: any, userName: string) => {
  socket.emit('sendMessage', { roomName: selectedRoom.value, message: messageInput, userName })
  // messageInput.value = '';
}

onMounted(() => {
  const { name } = route.query
  userName.value = name as unknown as string

  socket.emit('joinRoom', selectedRoom.value)
})
</script>

<style>
/* Add your styles here */
</style>

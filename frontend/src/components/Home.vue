<template>
  <div class="flex h-screen">
    <!-- <h3><b>Author Name of Room</b> </h3>{{ ownerNames }} -->
    <div class="w-1/4 bg-gray-100 p-4">
      <CreateNewRoomSection @createRoom="createRoom"></CreateNewRoomSection>

      <div class="bg-white rounded-lg p-4 shadow">
        <h2 class="text-lg font-semibold mb-4">Existing Rooms </h2>
        <!-- <h3>Author Name of Rooms </h3>{{ ownerNames }} -->
        <!-- <div v-for="owner in ownerNames" :key="owner">
          <p>Room Name : - {{ owner.roomName }}  Author Name :- {{ owner.userName }} </p>
        </div> -->
        <ul v-for="room in roomList" :key="room">
          <li class="cursor-pointer p-2 rounded hover:bg-blue-100" @click="joinRoom(room)">
            {{ room }} <span class="btn btn-primary btn-xs" >Join</span>
          </li>
        </ul>
      </div>
    </div>

    <ChatSection
      :messages="messages"
      :selectedRoom="selectedRoom"
      :ownerNames="ownerNames"
      :usersCount="activeUser"
      :userName="userName"
      @submitMsg="sendMessage"
      @blockUser="blockUser"
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
import { useToast } from 'vue-toastification'

import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const socket = io('http://localhost:3000')
const toast = useToast()
const ownerNames = ref<any>([])
// const newRoomName = ref('');
const notifications = ref('')
const selectedRoom = ref('')
const joinToggle = ref(true)
const userName = ref('')
const roomList = ref([])
const messages: any = ref([])
const messageInput = ref('')
const blockUserNamw = ref('')
const activeUser = ref<number>(0)
socket.on('roomList', (rooms,owner) => {
  roomList.value = rooms
  ownerNames.value=owner
})

socket.on('roomusers', (usersCount) => {
  console.log('roomusers', usersCount)

  activeUser.value = usersCount
})

socket.on('notifications', (data) => {
  if (!blockUserNamw.value) {
  toast.success(data, {
    timeout: 2000
  })}
})

socket.on('roomMessages', (msgs) => {
  messages.value = msgs
})


socket.on('blockMessages',(blockUser)=>{
  blockUserNamw.value =blockUser
})

socket.on('message', (msg: string) => {
  if (!blockUserNamw.value) {
    
    messages.value.push(msg)
  }
})

const createRoom = (newRoomName: string) => {
  socket.emit('createRoom', newRoomName,userName.value)
}

socket.on('roomsowner',(ownerName:any)=>{
   console.log('ownerNames',ownerName);
   ownerNames.value= ownerNames
})

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


function blockUser(blockUserName:string) {
  console.log('homePage',blockUserName);
  
  socket.emit('blockUser',blockUserName,userName.value)
}

const sendMessage = (messageInput: string, userName: string) => {
  socket.emit('sendMessage', { roomName: selectedRoom.value, message: messageInput, userName })
  // messageInput.value = '';
}

onMounted(() => {
  const { name } = route.query
  userName.value = name as unknown as string
  if (!userName.value) {
    router.push({
      name: 'userPage'
    })
  }
  socket.emit('joinRoom', selectedRoom.value)
})
</script>

<style>
/* Add your styles here */
</style>

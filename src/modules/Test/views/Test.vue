<template>
  <div>
    <b>modules/Test/views/Test.vue</b>
    <br>
    <br>
<!--    <pre>{{ userData }}</pre>-->
    <b-row>
      <b-col md="4" v-for="(locations, ip) in userData" :key="ip">
        <div v-for="(location, index) in locations"
             :key="location" class="bg-dark mx-2 mb-4"
             style="height: 300px; width: 100%"
        >
          <video
              :ref="'videoPlayer_' + ip + '_' + index"
              style="height: 300px; width: 100%"
              autoplay
              @ended="(event) => handleVideoEnd(event, ip, '')"
          >
            <!--            @ended="(event) => handleVideoEnd(event, ip)"-->
            <source :src="location" type="video/mp4"/>
            <source :src="location" type="video/ogg">
          </video>
          <!--          @ended="() => playNextVideo(ip)"-->
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import video from '@/assets/mp4/video_2024-07-15_11-27-32.mp4'

import {onMounted, reactive, ref, watch} from "vue";

let socketData = ref(null);

const userData = ref({});

// -----------------------------video--------------------------------
const videos = ref([
  video
]);

const currentVideoIndex = ref(0);
const currentVideo = ref(videos.value[currentVideoIndex.value]);

const videoPlayers = reactive({});
const currentVideoIndexes = reactive({});
const loadingStates = reactive({});

function handleVideoEnd(event, ip) {
  const video = event.target;
  const endTime = video.duration;
  console.log(endTime, 'endTime')
  console.log(ip, 'ip')

  //
  // userData.value[ip][0] = location
  // if (userData.value[ip] && userData.value[ip].length > 1) {
  //   setTimeout(() => {
  //     userData.value[ip] = userData.value[ip].slice(-1);
  //   }, Number(endTime))
  // }
}

// -----------------------------video--------------------------------

function createWebSocket() {
  let socket = new WebSocket("ws://192.168.31.88:6789/admin");

  socket.onopen = function (e) {
    socketData.value = "[open] Соединение установлено";
    socketData.value = "Отправляем данные на сервер";
    // socket.send("Меня зовут Джон");
  };

  socket.onmessage = function (event) {
    socketData.value = `[message] Данные получены с сервера: ${event.data}`;

    if (event.data) {
      try {
        let data = JSON.parse(event.data);
        const ip = data.ip;
        const location = data.location;

        if (ip && location) {
          if (!userData.value[ip]) {
            userData.value[ip] = []
            videoPlayers[ip] = null;
            currentVideoIndexes[ip] = 0;
            loadingStates[ip] = false;
          }
          userData.value[ip][0] = location
          userData.value[ip] = userData.value[ip].slice(-1);

          if (!videoPlayers[ip]) {
            onMounted(() => {
              videoPlayers[ip] = document.querySelector(`[ref="videoPlayer_${ip}_0"]`);
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      socketData.value = `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`;
    } else {
      socketData.value = '[close] Соединение прервано';
    }

    setTimeout(function () {
      socketData.value = "[reconnecting] Попытка восстановления соединения...";
      createWebSocket();
    }, 3000);
  };

  socket.onerror = function (error) {
    socketData.value = `[error] ${error.message}`;
  };
}

// createWebSocket(); socket ochish kere


watch(videos, (newVideos) => {
  if (!currentVideo.value && newVideos.length > 0) {
    currentVideo.value = newVideos[0];
  }
});
</script>

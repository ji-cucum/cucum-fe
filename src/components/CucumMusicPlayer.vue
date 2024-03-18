<template>
  <div id="player" class="hidden"></div>
  <div>
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required  v-model="videoId" value="bKeU99EygzY" />
    </div>
  </div>
  <div class="flex gap-2">
    <button @click="player.playVideo()">Play</button>
    <button @click="player.pauseVideo()">Pause</button>
    <button @click="player.stopVideo()">Stop</button>
    <button @click="player.seekTo(0)">Restart</button>
    <button @click="player.mute()">mute</button>
    <button @click="player.unMute()">unmute</button>
  </div>
  <div>
   duration : {{ duration }} / {{ currentTime }}
  </div>
</template>
<script>
export default {
  name: 'CucumMusicPlayer',
  data() {
    return {
      player: null,
      videoId: 'bKeU99EygzY'
    }
  },
  computed: {
    duration() {
      if (this.player) {
        console.log(this.player)
      }
      return this.player ? this.player.getDuration() : 0;
    },
    currentTime() {
      return this.player ? this.player.getCurrentTime() : 0;
    }
  },
  mounted() {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player('player', {
        height: '240',
        width: '360',
        videoId: this.videoId,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange
        }
      });
    };
  },
    methods: {
      onPlayerReady(event) {
        event.target.playVideo();
      },
      onPlayerStateChange(event) {
        console.log(event.data);
      }
    }
}
</script>
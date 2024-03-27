<template>
  <div>
    <div v-if="videoId" id="player" class="hidden"></div>
    <div>
        <div v-if="playerLoaded">
            <div class="p-1 text-[2rem] bg-gradient-to-r from-[#161420] bg-[#363653] to-[#292840]">
                <div class="flex m-1 gap-1">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div class="flex gap-2  p-2 border-gray-500 border-2">
                    <div class="flex gap-2 p-2 border-gray-500 border-2">
                        <div class="text-[2rem]">
                            <div class="w-24 flex flex-col">
                                <img v-if="videoId" class="rounded-lg w-17" :src="`https://img.youtube.com/vi/${videoId}/0.jpg`" alt="thumbnail" />
                                <div class="bg-black text-[#23eb28] ">
                                {{ String(currentMinute).padStart(2, '0') + ":" + String(currentSecond).padStart(2, '0') }}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col w-full">
                            <div class="px-2 bg-black text-[#23eb28] text-[1rem] border-2 border-gray-500">
                                {{ videoData.title }}
                            </div>
                            <div class="flex">
                                <div class="flex">
                                    <div class="flex justify-center w-10 bg-black text-[#23eb28] text-[1rem]">
                                        192
                                    </div>
                                    <div class="text-[1rem]">kbps</div>
                                </div>
                                <div class="flex">
                                    <div class="flex justify-center w-10 bg-black text-[#23eb28] text-[1rem]">
                                        44
                                    </div>
                                    <div class="text-[1rem]">kHz</div>
                                </div>
                            </div>

                            <div class="flex">
                                <CucumRangeHorizontal :value="currentTime / duration * 100" />
                            </div>
                        </div>

                    </div>
                </div>
            <div>
                <CucumRangeHorizontal :value="currentTime / duration * 100" />
            </div>
            <div class="flex gap-2">
                <button @click="player.playVideo()" class="bg-[#bfcdd9] border-2 border-gray-400 shadow">
                    <IconPlay class="fill-[#96a8b9]" />
                </button>
                <button @click="player.pauseVideo()" class="bg-[#bfcdd9] border-2 border-gray-400 shadow" >
                    <IconPause class="fill-[#96a8b9]" />
                </button>
                <button @click="player.stopVideo()" class="bg-[#bfcdd9] border-2 border-gray-400 shadow">
                    <IconStop class="fill-[#96a8b9]" />
                </button>
                <!--
                <button @click="player.seekTo(0)" class="bg-[#bfcdd9] border-2 border-gray-400 shadow">
                <IconRefresh class="fill-[#96a8b9] text-[#96a8b9]" />
                </button>
                -->
                <button @click="player.mute()" class="bg-[#bfcdd9] border-2 border-gray-400 shadow">
                    <IconMute class="fill-[#96a8b9]" />
                </button>
                <button @click="player.unMute()" class="bg-[#bfcdd9] border-2 border-gray-400 shadow">
                    <IconUnMute class="fill-[#96a8b9]" />
                </button>
            </div>
            </div>
        </div>

    </div>
  </div>
</template>
<script>
import { nextTick } from 'vue';
import CucumRangeHorizontal from './CucumRangeHorizontal.vue';
import {
  IconPlay,
  IconPause,
  IconStop,
  IconMute,
  IconUnMute
} from './icons/index.js'
export default {
  name: 'CucumMusicPlayer',
  components: {
    IconPlay,
    IconPause,
    IconStop,
    IconMute,
    IconUnMute,
    CucumRangeHorizontal
  },
  props: {
    videoId: {
      type: String,
      default: 'bKeU99EygzY'
    }
  },
  data() {
    return {
      player: null,
      duration: 0,
      currentTime: 0,
      isActive: false,
      playerLoaded: false,
      videoData: null
    }
  },
  watch: {
    videoId() {
      if (this.player) {
        this.player.destroy();
      }
      this.createPlayer();
    }
  },
  computed: {
    durationValue() {
      return this.player ? this.player.getDuration() : 0;
    },
    currentTimeValue() {
      return this.player ? this.player.getCurrentTime() : 0;
    },
    currentMinute() {
      return Math.floor(this.currentTime / 60);
    },
    currentSecond() {
      return Math.floor(this.currentTime % 60);
    },
  },
  mounted() {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.createPlayer();
    };

    nextTick(() => {
    });
  },
    methods: {
      createPlayer() {
        const self = this;

        this.player = new window.YT.Player('player', {
        height: '240',
        width: '360',
        videoId: this.videoId,
        events: {
            onReady: this.onPlayerReady,
            onStateChange: this.onPlayerStateChange
        }
        });
        setInterval(function(){
            const p = self.player;
            if (!p || !p.getCurrentTime || !p.getDuration) return;
            self.currentTime = self.player?.getCurrentTime();
            self.duration = self.player?.getDuration();
        }, 1000);
      },
      setVideoInfo() {
        if (this.player?.playerInfo?.videoData?.title) {
            this.playerLoaded = true;
            this.videoData = this.player.playerInfo.videoData;
        } else { 
            this.playerLoaded = false;
            this.videoData = null;
        }
        this.duration = this.durationValue;
      },
      onPlayerReady() {
        // auto play
        // event.target.playVideo();
        this.setVideoInfo()
      },
      onPlayerStateChange() {
        this.setVideoInfo()
      }
    }
}
</script>
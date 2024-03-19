<template>
  <div>
    <div v-if="videoId" id="player" class="hidden"></div>
    <div>
        <div v-if="playerLoaded">
            <div class="text-[2rem]">
                <img v-if="videoId" :src="`https://img.youtube.com/vi/${videoId}/0.jpg`" alt="thumbnail" class="rounded-lg" />
                <div>
                    {{ videoData.title }}
                </div>
                <div class="text-[3rem]">
                {{ currentMinute + ":" + String(currentSecond).padStart(2, '0') }}
                </div>
            </div>
            <div>
            <CucumRangeHorizontal :value="currentTime / duration * 100" />
            </div>
            <div class="flex gap-2">
                <button @click="player.playVideo()">
                <IconPlay />
                </button>
                <button @click="player.pauseVideo()">
                <IconPause />
                </button>
                <button @click="player.stopVideo()">
                <IconStop />
                </button>
                <button @click="player.seekTo(0)">
                <IconRefresh />
                </button>
                <button @click="player.mute()">
                <IconMute />
                </button>
                <button @click="player.unMute()">
                <IconUnMute />
                </button>
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
  IconRefresh,
  IconMute,
  IconUnMute
} from './icons/index.js'
export default {
  name: 'CucumMusicPlayer',
  components: {
    IconPlay,
    IconPause,
    IconStop,
    IconRefresh,
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
      onPlayerReady(event) {
        // auto play
        // event.target.playVideo();
        this.setVideoInfo()
      },
      onPlayerStateChange(event) {
        this.setVideoInfo()
      }
    }
}
</script>
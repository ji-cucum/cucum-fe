<template>
  <div class="flex flex-col gap-6" >
    <div>
      <CucumMusicPlayer :video-id="currentMusic?.third_party_key" ref="player" />
    </div>
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-2 overflow-y-scroll h-82">
        <div :key="i" v-for="(music,i) of musics" class="group">
          <CucumMusicRow :music="music" @click="() => {
            this.loadPlayer(music)
          }" />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import CucumMusicPlayer from '@/components/CucumMusicPlayer.vue';
import CucumMusicRow from '@/components/CucumMusicRow.vue';
import { createMusic } from '@/services/music'
import { createPlaylistMusic } from '@/services/playlistMusic'
import { getPlaylist } from '@/services/playlist'

export default {
  components: {
    CucumMusicPlayer,
    CucumMusicRow
  },
  name: 'CucumMusic',
  mounted() {
    this.fetchMusics()
  },
  methods: {
    async fetchMusics() {
      const res = await getPlaylist(this.$route.params.id)
      this.musics = [ ...this.musics, ...res.playlist_music.map(el => el.music)] 
    },
    async addMusic(musics) {
      console.log(musics)

      // add music to backend
      const newMusic = await Promise.all(
        [...musics].map(async music => {
          const res = await createMusic(music)
          return res
        })
      )

      // add music to playlist
      await Promise.all(
        [...newMusic].map(async music => {
          const { id } = music
          createPlaylistMusic({
            playlist_id: this.$route.params.id,
            music_id: id
          })
          const res = await createMusic(music)
          return res
        })
      )

      this.musics = [...this.musics, ...newMusic]
    },
    loadPlayer(music) {
      this.currentMusic = music
    }
  },
  data() {
    return {
      newMusicModal: null,
      musics: [],
      currentMusic: null,
      player: null,
    }
  }
}
</script>
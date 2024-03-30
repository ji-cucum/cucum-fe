<template>
  <div class="flex flex-col gap-6" >
    <div class="flex flex-col gap-8">
      <div>
        <button type="button" class="w-full p-2 bg-gray-800 rounded-full"  @click="() => { 
          this.$refs.newPlayListModal.showModal() 
        }"> + 新しいプレイリスト</button>
        <CucumPlaylistAddModal ref="newPlayListModal" @exec-crud-modal="addPlaylist" />
      </div>

      <div class="flex flex-col gap-2 overflow-y-scroll h-90">
        <div :key="i" v-for="(playlist,i) of playlists" class="group">
          <router-link :to="`/playlist/${playlist.id}`">
            <CucumPlaylistRow :playlist="playlist" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CucumPlaylistAddModal from '@/components/CucumPlaylistAddModal.vue';
import { createPlaylist } from '@/services/playlist'
import { createUserPlaylist } from '@/services/userPlaylist'
import { getUser } from '@/services/user'
import CucumPlaylistRow from './CucumPlaylistRow.vue';

export default {
  components: {
    CucumPlaylistAddModal,
    CucumPlaylistRow
  },
  name: 'CucumPlaylist',
  mounted() {
    // console.log('query : ', this.$route.query)
    this.fetchPlaylists()
  },
  methods: {
    async fetchPlaylists() {
      const userId = sessionStorage.getItem('userId')

      const res = await getUser(userId)
      
      this.playlists = [ ...res.user_playlist.map(el => el.playlist) ] 
    },
    async addPlaylist(form) {
      const formData = Object.fromEntries(new FormData(form))

      // add playlist to backend
      const newPlaylist =  await createPlaylist({
        ...formData,
        creator: 'cucum',
      })

      // add user_playlist to backend
      await createUserPlaylist({
        user_id: sessionStorage.getItem('userId'),
        playlist_id: newPlaylist.id
      })

      this.playlists.push(newPlaylist)
      form.reset()
    }
  },
  data() {
    return {
      newPlayListModal: null,
      videoId: 'Cd5DgfMT6qg',
      playlists: []
    }
  }
}
</script>
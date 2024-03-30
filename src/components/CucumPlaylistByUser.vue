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
          <button type="button" class="relative flex items-center justify-between w-full p-4 bg-gray-800 rounded-lg">
            <router-link :to="`/playlist/${playlist.id}`">
            <div class="flex flex-col items-start justify-between w-full" >
              <div class="flex w-full">
                <div class="flex items-center w-1/3">
                  <img :src="playlist.thumbnail" alt="playlist" class="w-20 h-20 rounded-full" />
                </div>
                <div class="flex flex-col items-start justify-center w-2/3 text-left">
                  <div class="overflow-hidden text-2xl font-bold text-ellipsis text-nowrap w-60">{{ playlist.name }}</div>
                  <div class="overflow-hidden text-gray-500 text-ellipsis text-nowrap w-60">{{ playlist.description }} </div>
                  <div class="overflow-hidden text-gray-500 text-ellipsis text-nowrap w-60">{{ playlist.creator }}</div>
                </div>
              </div>
            </div>
            <div class="absolute top-0 left-0 z-50 hidden w-full h-full p-4 bg-indigo-500 bg-opacity-25 group-hover:block">
              <div class="flex items-center justify-center w-20 h-20 p-2 bg-gray-600 rounded-full">
                <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CucumPlaylistAddModal from '@/components/CucumPlaylistAddModal.vue';
import { createPlaylist } from '@/services/playlist'
import { getUser } from '@/services/user'

export default {
  components: {
    CucumPlaylistAddModal,
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
      console.log(formData)
      const newPlaylist =  await createPlaylist({
        ...formData,
        creator: 'cucum',
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
<template>
  <div class="flex flex-col gap-6" >
    <div>
    </div>
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-2 overflow-y-scroll h-90">
        <div :key="i" v-for="(playlist,i) of playlists" class="group">
          <router-link :to="`/playlist-public/${playlist.id}`">
            <CucumPlaylistRow :playlist="playlist" />
          </router-link>
        </div>
        <footer>
          <div ref="infiniteScrollTrigger" id="scroll-trigger"></div>
          <div v-show="paging.showLoader" role="status" class="flex justify-center h-24 pt-8">
              <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
        </footer>
      </div>
    </div>

  </div>
</template>
<script>
import { getAllPlaylists, createPlaylist } from '@/services/playlist'
import CucumPlaylistRow from '@/components/CucumPlaylistRow.vue';
import pagingMixin from '@/mixins/pagingMixin';

export default {
  components: {
    CucumPlaylistRow,
  },
  name: 'CucumPlaylist',
  mixins: [pagingMixin],
  async created() {
    this.paging.fetchCallback = this.fetchPlaylists
  },
  methods: {
    async fetchPlaylists() {

      const params = { 
        "sort": "id",
        "order": "desc",
        "offset": this.pageOffset,
        "limit": this.paging.data.maxPerPage,
      }
      console.log(params)
      const res = await getAllPlaylists( {...params} )
      if(res && res.items){
        this.playlists = [ ...this.playlists, ...res.items] 
        this.paging.data.totalResults = res.meta.total
        this.paging.data.currentPage++
      }
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
<template>
  <div class="flex flex-col gap-6" >
    <div>
      <div>
          <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required v-model="videoId" value="" />
          </div>
      </div>
    </div>
    <div class="flex flex-col gap-8">
      <div>
        <button type="button" class="w-full bg-gray-800 p-2 rounded-full"  @click="() => { 
          this.$refs.newPlayListModal.showModal() 
        }"> + 新しいプレイリスト</button>
        <CucumModal ref="newPlayListModal" @exec-crud-modal="addPlaylist" />
      </div>

      <div class="flex flex-col gap-2 h-90 overflow-y-scroll">
        <div :key="i" v-for="(playlist,i) of playlists" class="group">
          <button type="button" class="flex items-center justify-between w-full bg-gray-800 p-4 rounded-lg relative">
            <div class="flex flex-col w-full justify-between items-start">
              <div class="flex w-full">
                <div class="w-1/3 flex items-center">
                  <img :src="playlist.thumbnail" alt="playlist" class="w-20 h-20 rounded-full" />
                </div>
                <div class="flex flex-col text-left w-2/3 items-start justify-center">
                  <div class=" font-bold text-2xl text-ellipsis text-nowrap overflow-hidden w-60">{{ playlist.name }}</div>
                  <div class="text-gray-500 text-ellipsis text-nowrap overflow-hidden w-60">{{ playlist.description }} </div>
                  <div class="text-gray-500 text-ellipsis text-nowrap overflow-hidden w-60">{{ playlist.creator }}</div>
                </div>
              </div>
            </div>
            <div class="absolute hidden group-hover:block top-0 left-0 w-full h-full z-50 bg-indigo-500 bg-opacity-25 p-4">
              <div class="bg-gray-600 rounded-full p-2 w-20 h-20 flex justify-center items-center">
                <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </button>
        </div>
        <footer>
          <div ref="infiniteScrollTrigger" id="scroll-trigger"></div>
          <div v-show="paging.showLoader" role="status" class="h-24 flex justify-center pt-8">
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
import CucumModal from '@/components/CucumModal.vue';
import { getAllPlaylists, createPlaylist } from '@/services/playlist'
import pagingMixin from '@/mixins/pagingMixin';

export default {
  components: {
    CucumModal,
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
      })
      console.log(newPlaylist.creater)
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
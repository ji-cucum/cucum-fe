<template>
  <div class="flex flex-col gap-6">
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
      <CucumMusicPlayer :video-id="videoId" />
    </div>
    <div class="flex flex-col gap-8">
      <div>
        <button type="button" class="w-full bg-gray-800 p-2 rounded-full"  @click="() => { 
          this.$refs.newPlayListModal.showModal() 
        }"> + 新しいプレイリスト</button>
        <CucumModal ref="newPlayListModal" @exec-crud-modal="addPlaylist" />
      </div>
      <div class="flex flex-col gap-2">
        <div :key="i" v-for="(playlist,i) of playlists" class="group">
          <button type="button" class="flex items-center justify-between w-full bg-gray-800 p-4 rounded-lg">
            <div class="flex flex-col justify-start items-start">
              <div>{{ playlist.name }}</div>
              <div>{{ playlist.creator }}</div>
            </div>
            <div class="hidden group-hover:block bg-gray-600 rounded-full p-2">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import CucumModal from '@/components/CucumModal.vue';
import CucumMusicPlayer from './CucumMusicPlayer.vue';
export default {
  components: {
    CucumModal,
    CucumMusicPlayer
  },
  name: 'CucumPlaylist',
  methods: {
    addPlaylist(form) {
      const formData = Object.fromEntries(new FormData(form))
      this.playlists.push({
        ...formData,
        creator: 'cucum',
        createdAt: new Date().toISOString().split('T')[0]
      })
      form.reset()
    }
  },
  data() {
    return {
      newPlayListModal: null,
      videoId: 'Cd5DgfMT6qg',
      playlists: [
        {
          id: '1',
          name: '寝る前聞きたいリスト1',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '2',
          name: '寝る前聞きたいリスト2',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '3',
          name: '寝る前聞きたいリスト3',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '4',
          name: '寝る前聞きたいリスト4',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '5',
          name: '寝る前聞きたいリスト5',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '6',
          name: '寝る前聞きたいリスト6',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '7',
          name: '寝る前聞きたいリスト7',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '8',
          name: '寝る前聞きたいリスト8',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '9',
          name: '寝る前聞きたいリスト9',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '10',
          name: '寝る前聞きたいリスト10',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
      ]
    }
  }
}
</script>
<template>
  <div>
    <CucumMusicPlayer />
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
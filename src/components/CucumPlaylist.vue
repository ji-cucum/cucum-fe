<template>
  <div class="flex flex-col gap-8">
    <div>
      <button type="button" class="w-full bg-gray-800 p-2 rounded-full"  @click="() => { 
        console.log(this.$refs)
        this.$refs.newPlayListModal.showModal() 
      }"> + 新しいプレイリスト</button>
      <CucumModal ref="newPlayListModal" />
    </div>
    <div class="flex flex-col gap-2">
      <div :key="i" v-for="(playlist,i) of playlists">
        <button type="button" class="flex flex-col justify-start w-full bg-gray-800 p-4 rounded-lg">
          <div>{{ playlist.name }}</div>
          <div>{{ playlist.id }}</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CucumModal from '@/components/CucumModal.vue';
export default {
  components: {
    CucumModal,
  },
  name: 'CucumPlaylist',
  data() {
    return {
      newPlayListModal: null,
      playlists: [
        {
          id: '1',
          name: '寝る前聞きたいリスト',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '2',
          name: '寝る前聞きたいリスト',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '3',
          name: '寝る前聞きたいリスト',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '4',
          name: '寝る前聞きたいリスト',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
        {
          id: '5',
          name: '寝る前聞きたいリスト',
          creator: 'cucum',
          createdAt: '2021-10-01',
        },
      ]
    }
  }
}
</script>
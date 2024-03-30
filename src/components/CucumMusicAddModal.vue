<template>
<!-- Modal toggle -->

<!-- Main modal -->
<div ref="crud-modal" id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full p-4">
        <!-- Modal content -->
        <div class="relative rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    新しい曲を追加
                </h3>
                <button type="button" class="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" @click="() => { hideModal() }">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="flex flex-col gap-2 p-4 md:p-5" ref="modalForm">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">曲名</label>
                        <div class="flex gap-2">
                          <input type="text" ref="searchName" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="プレイリスト名" required="">
                          <button type="button" class="w-24 p-2 border border-gray-300 rounded-lg" @click="() => { this.searchMusics() }">検索</button>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4 mb-4">

                        <div class="flex flex-wrap gap-2">

                <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800" @click="addMusic">
                    <svg class="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                     追加
                </button>
                          <div :key="i" v-for="(music, i) in selectedMusics">
                          <span id="badge-dismiss-indigo" class="inline-flex items-center px-2 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded me-2 dark:bg-indigo-900 dark:text-indigo-300">
{{ `${music.title}(${music.artists.map(el => el.name).join(",")})` }}
<button type="button" class="inline-flex items-center p-1 text-sm text-indigo-400 bg-transparent rounded-sm ms-2 hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" data-dismiss-target="#badge-dismiss-indigo" aria-label="Remove"
@click="() => { 
  this.selectedMusics = [...this.selectedMusics.filter(el => el.youtubeId !== music.youtubeId)]

}"
>
<svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
</svg>
<span class="sr-only">Remove badge</span>
</button>
</span>
                          </div>
                        </div>
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">検索結果</label>
                        <div class="flex flex-col gap-2">
                          <div :key="i" v-for="(music, i) in filteredMusicList">
                            <div class="flex items-center justify-between gap-3">
                              <div>
                                <img :src="music.thumbnailUrl" alt="music" class="w-6 h-6 rounded-full" />
                              </div>
                              <div class="flex flex-col w-60 md:w-40">
                                <div class="overflow-hidden text-ellipsis text-nowrap">
                                  {{ music.title }}
                                </div>
                                <div class="overflow-hidden text-gray-400 text-ellipsis text-nowrap">
                                  {{ music.artists.map(el => el.name).join(",") }}
                                </div>
                              </div>
                              <div>
                                <button type="button" @click="() => { this.selectedMusics = [music, ...this.selectedMusics]}">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 15.5V5s3 1 3 4m-7-3H4m9 4H4m4 4H4m13 2.4c0 1.326-1.343 2.4-3 2.4s-3-1.075-3-2.4 1.343-2.4 3-2.4 3 1.075 3 2.4Z"/>
    </svg>
                                </button>

                              </div>
                            </div>
                          </div>
                          
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div> 
</template>

<script>
import { Modal } from 'flowbite'
import { searchMusics } from '@/services/music'
export default {
  name: 'CucumModal',
  emits: ['exec-crud-modal'],
  computed: {
    filteredMusicList() {
      const self = this
      return self.searchResult.filter(el => !self.selectedMusics?.includes(el) )
    }
  },
  data() {
    return {
      modal: null,
      dropzoneFile: null,
      thumbnailUrl: null,
      searchResult: [],
      selectedMusics: []
    }
  },
  mounted() {
    const $targetEl = this.$refs['crud-modal']
    this.modal = new Modal($targetEl)
    this.modal.init()
  },
  methods: {
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
    addMusic() {
      const musics = [...this.selectedMusics].map(el => {
        return {
          title: el.title,
          artist: el.artists.map(el => el.name).join(","),
          thumbnail: el.thumbnailUrl,
          playtime: el.duration.totalSeconds,
          third_party_key: el.youtubeId,
        }
      })
      this.$emit('add-musics', musics)
      this.modal.hide()
    },
    async searchMusics() {
      const res = await searchMusics(this.$refs.searchName.value)
      this.searchResult = res.musics
    },
  },

}
</script>
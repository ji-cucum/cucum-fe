<template>
          <button type="button" class="relative flex items-center justify-between w-full px-2 py-1 bg-gray-800 rounded-lg">
            <div class="flex flex-col items-start justify-between w-full">
              <div class="flex w-full">
                <div class="flex items-center w-2/12">
                  <img :src="music.thumbnail" alt="music" class="w-6 h-6 rounded-full" />
                </div>
                <div class="flex flex-col items-start justify-center w-8/12 text-left">
                  <div class="w-48 overflow-hidden text-sm font-bold text-ellipsis text-nowrap">{{ music.title }}</div>
                  <div class="w-48 overflow-hidden text-gray-500 text-ellipsis text-nowrap">{{ music.artist }} </div>
                </div>
                <div class="flex flex-col items-start justify-center w-2/12 text-left">
                  <div class="overflow-hidden text-sm font-bold text-ellipsis text-nowrap w-60">{{ `${String(Math.floor(music.playtime / 60))?.padStart(1, '0')}:${String(Math.floor(music.playtime % 60))?.padStart(2, '0')}` }}</div>
                </div>
              </div>
            </div>
            <div class="absolute top-0 left-0 z-50 items-center hidden w-full h-full px-2 bg-indigo-500 bg-opacity-25 group-hover:flex">
              <div class="flex items-center justify-center w-6 h-6 p-2 bg-gray-600 rounded-full">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </button>
</template>
<script>
export default {
  name: 'CucumMusicRow',
  props: {
    music: {
      type: Object,
      required: true
    }
  }
}
</script>
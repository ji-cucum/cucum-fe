<template>
    <div>
      <CucumMusicPlayer :video-id="globalVideo.videoId" />
      <div v-if="currentTab === tabs[0]">
        <CucumMusic />
      </div>
      <div v-if="currentTab === tabs[1]">
        <CucumPlaylist />
      </div>
      <div v-if="currentTab === tabs[2]">
        <CucumPlaylistByUser />
      </div>
    </div>
    <div class="sticky bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div class="sticky bottom-0 left-0 z-50 w-full h-16 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
              <button type="button" :key="i" @click="() => { currentTab = tab }" v-for="(tab, i) in tabs" class="inline-flex flex-col items-center justify-center px-5 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <component :is="tab.icon" />
                <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{{ tab.name }}</span>
              </button>
          </div>
      </div>
    </div>
</template>
<script>
import CucumMusic from '@/components/CucumMusic.vue';
import CucumPlaylist from '@/components/CucumPlaylist.vue';
import CucumMusicPlayer from '@/components/CucumMusicPlayer.vue';
import CucumPlaylistByUser from '@/components/CucumPlaylistByUser.vue';
import IconMusic from '@/components/icons/IconMusic.vue';
import IconPlayList from '@/components/icons/IconPlayList.vue';
import IconMyPage from '@/components/icons/IconMyPage.vue';

import { useGlobalVideoStore } from '@/stores/globalVideo'

const mainTabs = [
  { name: 'Music', icon: 'IconMusic' },
  { name: 'PlayList', icon: 'IconPlayList' },
  { name: 'MyPage', icon: 'IconMyPage' }
]

export default {
  name: 'CucumMain',
  setup() {
    const globalVideo = useGlobalVideoStore()
    return {
      globalVideo
    }
  },
  components: {
    CucumMusic,
    CucumPlaylist,
    CucumPlaylistByUser,
    CucumMusicPlayer,
    IconMusic,
    IconPlayList,
    IconMyPage
  },
  data() {
    return {
        tabs: [
            ...mainTabs
        ],
        currentTab: mainTabs[1],
    }
  }
}
</script>
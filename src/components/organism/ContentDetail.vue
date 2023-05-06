<template>
  <div
    class="w-full transition-height duration-500 ease-out grid grid-cols-10 overflow-hidden gap-[14px] relative"
    :class="[isContentDetailOpen ? 'h-[655px]' : 'h-0']"
  >
    <div id="player" class="col-span-7"></div>
    <div class="col-span-3 bg-lightGray p-[21px] flex flex-col gap-[20px]">
      <p class="text-[25px] font-bold">{{ currentDetailContent?.title }}</p>
      <p>{{ filterText }}</p>
      <p>{{ dateText }}</p>
      <p>{{ currentDetailContent?.description }}</p>
    </div>
    <button
      class="absolute top-[13px] right-[17px]"
      @click="closeContentDetail"
    >
      &#x2715;
    </button>
  </div>
</template>
<script lang="ts">
import { useContentStore } from '@/stores/content'
import { extractVideoIdFromUrl } from '@/util/youtube'
import { mapState } from 'pinia'
import PlayerFactory from 'youtube-player'
import type { YouTubePlayer } from 'youtube-player/dist/types'

export default {
  data() {
    return {
      player: {} as YouTubePlayer,
    }
  },
  computed: {
    ...mapState(useContentStore, [
      'currentDetailContent',
      'isContentDetailOpen',
      'filterText',
      'dateText',
    ]),
  },
  async mounted() {
    this.player = PlayerFactory('player', {
      height: '100%',
      width: '100%',
    })
  },
  async updated() {
    if (this.isContentDetailOpen) {
      if (this.player) {
        if (this.currentDetailContent && this.currentDetailContent.videoURL) {
          const videoId = extractVideoIdFromUrl(
            this.currentDetailContent.videoURL
          )
          if (videoId) {
            await this.player.loadVideoById(videoId)
            await this.player.playVideo()
          }
        }
      }
    }
  },
  methods: {
    async closeContentDetail() {
      useContentStore().$patch({ isContentDetailOpen: false })
      await this.player.stopVideo()
    },
  },
}
</script>

<template>
  <div
    class="w-full transition-height duration-500 ease-out grid grid-cols-10 overflow-hidden gap-[14px]"
    :class="[isContentDetailOpen ? 'h-[655px]' : 'h-0']"
  >
    <div id="player" class="col-span-7"></div>
    <div class="col-span-3 bg-lightGray p-[21px] flex flex-col gap-[20px]">
      <p class="text-[25px] font-bold">{{ currentDetailContent?.title }}</p>
      <p>{{ filterText }}</p>
      <p>{{ dateText }}</p>
      <p>{{ currentDetailContent?.description }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { useContentStore } from '@/stores/content'
import { extractVideoIdFromUrl } from '@/util/youtube'
import { mapState } from 'pinia'
import PlayerFactory from 'youtube-player'
import type { YouTubePlayer } from 'youtube-player/dist/types'
import { formatDate } from '@/util/date'

export default {
  data() {
    return {
      player: {} as YouTubePlayer,
    }
  },
  computed: {
    ...mapState(useContentStore, [
      'isContentDetailOpen',
      'currentDetailContent',
    ]),
    filterText() {
      return this.currentDetailContent?.filters.join(',')
    },
    dateText() {
      const startDate = this.currentDetailContent?.date[0]
      const endDate = this.currentDetailContent?.date[1]
      return formatDate(startDate, endDate)
    },
  },
  watch: {
    async isContentDetailOpen() {
      await this.player.stopVideo()
    },
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
  methods: {},
}
</script>

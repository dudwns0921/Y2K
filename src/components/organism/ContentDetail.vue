<template>
  <div
    class="w-full bg-blue-200 transition-height duration-500 ease-out grid grid-cols-10 overflow-hidden"
    :class="[isContentDetailOpen ? 'h-[655px]' : 'h-0']"
  >
    <div id="player" class="col-span-7"></div>
    <div class="col-span-3">
      <p>{{ currentDetailContent?.title }}</p>
      <ul>
        <li v-for="filter in currentDetailContent?.filters" :key="filter">
          {{ filter }}
        </li>
      </ul>
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

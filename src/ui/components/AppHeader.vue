<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTES_PATHS } from '@/constants'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const route = useRoute()
const router = useRouter()
const heading = computed(() => route.meta.heading)
const goHome = () => router.push(ROUTES_PATHS.ROOT)
</script>

<template>
  <div :class="['container-fluid', $style.root]">
    <img :class="$style.logo" src="/images/logo-full.svg" alt="Ceezaam logo" @click="goHome" />
    <template v-if="heading">
      <div :class="[$style.heading]">
        {{ heading }}
      </div>
      <el-button @click="userStore.logout()">Выйти</el-button>
    </template>
  </div>
</template>

<style lang="stylus" module>
.root
  display flex
  align-items center
  justify-content center
  padding-top 16px
  padding-bottom 16px
  height $headerHeight
  background-color: #B03CA5;
  background: linear-gradient(90deg, #FF6E00 0%, #BB00FF 89%);

.logo
  cursor pointer
  transition()

  +hover()
    opacity .75

.heading
  display flex
  align-items center
  margin-right auto
  width-between-property 'margin-left' 320 17 768 25 true true
  font-size 18px
  line-height 24px
  font-weight 700
  color white
</style>

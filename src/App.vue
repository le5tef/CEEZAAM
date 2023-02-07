<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/store'
import router from '@/router'
import { LOADER_REMOVE_TIMEOUT, ROUTES_PATHS, UI } from '@/constants'
import { clientUiHandler, removeGlobalLoader, sleep } from '@/utils'
import LayoutDefault from '@/ui/layouts/LayoutDefault.vue'
import LayoutPlain from '@/ui/layouts/LayoutPlain.vue'
import LangRu from '@/locale/lang/ru'
import { useUserStore } from '@/store/user'
import type { Language } from 'element-plus/es/locale'
const userStore = useUserStore()
const uiStore = useUiStore()
const route = useRoute()
const layoutComponent = computed(() => {
  return (
    {
      [UI.LAYOUT_DEFAULT]: LayoutDefault,
    }[route.meta.layout as string] || LayoutPlain
  )
})

const ready = computed(clientUiHandler.ready)

const locale = ref<Language>(LangRu)

onMounted(async () => {
  await clientUiHandler.init()
  await sleep(LOADER_REMOVE_TIMEOUT)
  await nextTick(async () => {
    await removeGlobalLoader()
    uiStore.setIsGlobalLoaderActive(false)
  })
  if (!userStore.user) {
    await router.push(ROUTES_PATHS.AUTH)
  }
})
</script>

<template>
  <el-config-provider :locale="locale">
    <component :is="layoutComponent" v-if="ready">
      <RouterView />
    </component>
  </el-config-provider>
</template>

<style lang="stylus" module></style>

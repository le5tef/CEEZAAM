<script lang="ts" setup>
import { computed } from 'vue'
import { Menu } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
import { useUiStore } from '@/store/ui'
import HeaderOfficeSelect from '@/ui/components/HeaderOfficeSelect.vue'

const userStore = useUserStore()
const uiStore = useUiStore()

const toggleSidebar = () => uiStore.toggleSidebarActive()
const noAvatarText = computed(() => userStore.user?.email.slice(0, 2).toUpperCase() || 'PR')
</script>

<template>
  <div :class="[$style.root]">
    <el-icon
      v-if="uiStore.isMobileWidth"
      color="rgba(82, 119, 241, 1)"
      :size="34"
      @click="toggleSidebar"
    >
      <Menu />
    </el-icon>

    <HeaderOfficeSelect />
    <div class="spacer"></div>
    <div v-if="uiStore.isMobileWidth">
      <div :class="$style.avatar">
        {{ noAvatarText }}
      </div>
    </div>
    <div v-else>
      <el-button @click="userStore.logout()">Закрыть смену</el-button>
    </div>
  </div>
</template>

<style lang="stylus" module>
.root
  display flex
  align-items center
  padding 16px
  height $headerHeight
  background white

.avatar
  display flex
  color white
  font-weight 500
  font-size 14px
  align-items center
  justify-content center
  border-radius 50%
  width 32px
  height 32px
  background $cPrimary

.logo
  cursor pointer
  transition()

  +hover()
    opacity .75
</style>

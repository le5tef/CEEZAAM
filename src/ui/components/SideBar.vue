<script lang="ts" setup>
import { computed } from 'vue'
import { useUiStore } from '@/store/ui'
import { useUserStore } from '@/store/user'
import { Avatar, Calendar, Collection, Notebook, Setting, PieChart } from '@element-plus/icons-vue'
import { ROUTES_PATHS } from '@/constants'
import Logo from '@/ui/components/Icons/LogoSvg.vue'
import { buildMediaUrl } from '@/utils/mediaUrl'
import { useCompanyStore } from '@/store'
const companyStore = useCompanyStore()
const uiStore = useUiStore()
const userStore = useUserStore()
const isMenuActive = computed(() => uiStore.isSidebarActive)
const toggleSidebar = () => uiStore.toggleSidebarActive()
const currentCompanyLogo = computed(() =>
  companyStore.currentCompany?.logo ? buildMediaUrl(companyStore.currentCompany.logo) : undefined
)
</script>
<template>
  <div>
    <div :class="[$style.wrapper, isMenuActive ? $style.active : '']">
      <el-menu :class="[$style.menu]" active-text-color="#ffd04b" text-color="white">
        <img v-if="currentCompanyLogo" :src="currentCompanyLogo" alt="" />
        <Logo v-else :class="$style.logo" />
        <router-link :to="ROUTES_PATHS.BOOKING">
          <el-menu-item index="1">
            <el-icon>
              <Calendar />
            </el-icon>
            <span>Букинг</span>
          </el-menu-item>
        </router-link>
        <router-link :to="ROUTES_PATHS.CLIENTS">
          <el-menu-item index="2">
            <el-icon>
              <Notebook />
            </el-icon>
            <span>Клиенты</span>
          </el-menu-item>
        </router-link>

        <router-link :to="ROUTES_PATHS.EMPLOYEES">
          <el-menu-item index="3">
            <el-icon>
              <Avatar />
            </el-icon>
            <span>Сотрудники</span>
          </el-menu-item>
        </router-link>

        <router-link :to="ROUTES_PATHS.SERVICES">
          <el-menu-item index="4">
            <el-icon>
              <Collection />
            </el-icon>
            <span>Услуги</span>
          </el-menu-item>
        </router-link>

        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <setting />
            </el-icon>
            <span>Настройки</span>
          </template>
          <router-link :to="ROUTES_PATHS.SETTINGS_COLORS">
            <el-menu-item index="5-1">Логотип и цвета</el-menu-item>
          </router-link>
          <router-link :to="ROUTES_PATHS.SETTINGS_INFORMATION">
            <el-menu-item index="5-2"> Основная информация</el-menu-item>
          </router-link>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <el-icon><PieChart /></el-icon>
            <span>Отчёты</span>
          </template>
          <router-link :to="ROUTES_PATHS.REPORTS_COMPLEX">
            <el-menu-item index="6-1">Комплексный</el-menu-item>
          </router-link>
        </el-sub-menu>
        <el-menu-item @click="userStore.logout()">
          <span>Выйти</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div
      v-if="isMenuActive && uiStore.isMobileWidth"
      :class="$style.overlay"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-menu-item.is-active)
  color: white
  background $cPrimary

:deep(.el-sub-menu__title)
  background-color $cAccent !important

:deep(.el-menu)
  background-color $cAccent !important

:deep(.el-menu-item:hover)
  background-color $cAccentHover !important

:deep(.el-sub-menu__title:hover)
  background-color $cAccentHover !important
</style>

<style lang="stylus" module>
.menu
  min-width 250px
  height 100%
  background $cAccent
  border-right none !important

.overlay
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  z-index 2

.wrapper
  height 100vh
  @media (max-width $tabletVerWidth)
    height 100vh
    position fixed
    left -250px
    transition 500ms
    z-index 999

.active
  @media (max-width $tabletVerWidth)
    height 100vh
    position fixed
    left 0
    transition 500ms
    z-index 999

.logo
  margin-top 20px
  margin-left 18px
</style>

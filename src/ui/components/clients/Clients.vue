<script lang="ts" setup>
import ClientsTable from '@/ui/components/clients/ClientsTable.vue'
import { useUiStore } from '@/store'
import { useDialogStore } from '@/store/dialog'
import { ROUTES_PATHS } from '@/constants'
import router from '@/router'
import { useClientsStore } from '@/store/clients/clients'
import { Filter, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ClientsFiltersButtons from '@/ui/components/clients/ClientsFiltersChips.vue'
import { useClientsFiltersStore } from '@/store/clients'

const filtersStore = useClientsFiltersStore()
const clientsStore = useClientsStore()
const dialogStore = useDialogStore()
const uiStore = useUiStore()

const setSearch = () => {
  filtersStore.setSearch(search.value)
  filtersStore.commitFilters()
}

const createNewClient = () => {
  clientsStore.resetTempUser()
  router.push(ROUTES_PATHS.CLIENTS_CREATE)
}

const search = ref(null as string | null)
</script>

<template>
  <div>
    <div :class="['heading', 'font-26']">Клиенты</div>
    <div :class="['mt-12', $style.wrapper]">
      <div
        :class="[
          'w-full',
          'mb-4',
          'd-flex',
          'align-center',
          uiStore.isDesktopWidth ? '' : 'flex-column align-start',
        ]"
      >
        <div class="d-flex">
          <el-input
            v-model="search"
            :prefix-icon="Search"
            placeholder="Ф.И.О."
            style="width: 200px"
            @change="setSearch"
          ></el-input>
          <el-button
            :class="$style.button"
            style="width: 100px; margin-bottom: 0"
            text
            @click="dialogStore.openDialog('ClientsFilter')"
          >
            <el-icon class="mr-1">
              <Filter />
            </el-icon>
            Фильтр
          </el-button>
        </div>
        <ClientsFiltersButtons />
      </div>
      <div
        :class="
          uiStore.isMobileWidth ||
          uiStore.isMobileWidth ||
          (!uiStore.isMobileWidth && !uiStore.isDesktopWidth)
            ? 'flex-column'
            : 'mb-4'
        "
        class="d-flex align-center w-full"
      >
        <div class="spacer"></div>
        <button :class="[$style.outlined, $style.button]">Выгрузить в excel</button>
        <button :class="[$style.submit, $style.button]" @click="createNewClient">
          Создать нового клиента
        </button>
      </div>
      <ClientsTable />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color: $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important

:deep(.el-checkbox__label)
  word-wrap break-word
  width 100%

:deep(.el-button + .el-button)
  margin-left 0

:deep(.el-tabs__item)
  color: $cTextMuted
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
</style>

<style lang="stylus" module>
.wrapper
  padding 24px
  margin-top 24px
  background white
  width 100%
  overflow auto
  box-shadow 0px 0px 8px 0px rgba(26, 14, 62, 0.25)
  border-radius 8px

.phoneActions
  display flex !important
  justify-content left
  align-items center
  @media (max-width $tabletVerWidth)
    margin-bottom 24px

.description
  font-family: 'Verdana';
  font-style normal
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-bottom 24px

.button
  cursor pointer
  margin-left 24px
  height 32px
  word-break keep-all
  word-wrap break-word
  font-family 'Verdana'
  font-style normal
  font-weight 700 !important
  font-size 14px !important
  line-height 24px !important
  border-radius: 8px !important
  flex: none
  color $cPrimary !important
  order: 0
  flex-grow: 0
  @media (max-width: $tabletHorWidth)
    width 100%
    margin 0 0 16px 0

.outlined
  border 1px solid $cPrimary !important
  color $cPrimary !important
  background: white !important

.submit
  border none !important
  color white !important
  background: $cPrimary !important
</style>

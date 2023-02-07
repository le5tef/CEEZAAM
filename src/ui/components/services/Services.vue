<script lang="ts" setup>
import { useDialogStore } from '@/store/dialog'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ServicesTable from '@/ui/components/services/ServicesTable.vue'
import { useServicesStore } from '@/store/services'
import { useUiStore } from '@/store/ui'

const serviceStore = useServicesStore()
const dialogStore = useDialogStore()
const uiStore = useUiStore()

const setSearch = () => {
  if (search.value !== null) serviceStore.setSearch(search.value)
}

const createService = () => {
  serviceStore.resetTempService()
  dialogStore.openDialog('ServiceEdit')
}

const search = ref(null as string | null)
</script>

<template>
  <div>
    <div :class="['heading', 'font-26']">Услуги</div>
    <div :class="['mt-12', $style.wrapper]">
      <div
        :class="[
          'w-full',
          'mb-4',
          'd-flex',
          'align-center',
          uiStore.isMobileWidth ? 'flex-column' : '',
        ]"
      >
        <el-input
          v-model="search"
          clearable
          class="mob-w-full mb-1"
          :prefix-icon="Search"
          placeholder="Наименование"
          style="width: 200px"
          @change="setSearch"
        ></el-input>
        <div v-if="!uiStore.isMobileWidth" class="spacer" />
        <button :class="[$style.button, $style.submit, 'mob-w-full']" @click="createService()">
          Создать новую услугу
        </button>
      </div>
      <ServicesTable />
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


.button
  cursor pointer
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

.outlined
  border 1px solid $cPrimary !important
  color $cPrimary !important
  background: white !important

.submit
  border none !important
  color white !important
  background: $cPrimary !important
</style>

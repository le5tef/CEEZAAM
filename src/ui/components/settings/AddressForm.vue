<script lang="ts" setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/store/settings'
import type { FormInstance } from 'element-plus'

const addressRef = ref<FormInstance>()

const settingsStore = useSettingsStore()
</script>

<template>
  <div>
    <div :class="['heading', 'font-26']">Адрес салона</div>
    <el-form ref="addressRef" :model="settingsStore.temp.address" label-position="top">
      <el-row :gutter="32">
        <el-col :md="12" :sm="12" :span="24" :xs="24">
          <el-form-item label="Адрес салона" prop="address">
            <el-input v-model="settingsStore.temp.address.address" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :span="24" :xs="24">
          <el-form-item label="Как добраться" prop="path">
            <el-input v-model="settingsStore.temp.address.path" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :span="24" :xs="24">
          <el-form-item label="Ссылка на Яндекс.карты" prop="yandexMaps">
            <el-input v-model="settingsStore.temp.address.yandexMaps" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :span="24" :xs="24">
          <el-form-item label="Ссылка на Google.maps" prop="googleMaps">
            <el-input v-model="settingsStore.temp.address.googleMaps" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :span="24" :xs="24">
          <el-form-item label="Ссылка на 2ГИС" prop="twoGis">
            <el-input v-model="settingsStore.temp.address.twoGis" size="large" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color $cTextMuted
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
  overflow auto
  box-shadow 0 0 8px 0 rgba(26, 14, 62, 0.25)
  border-radius 8px


.description
  font-family: 'Verdana';
  font-style normal
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-bottom 24px
</style>

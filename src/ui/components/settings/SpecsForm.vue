<script lang="ts" setup>
import { peculiaritiesOptions, useSettingsStore } from '@/store/settings'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
const customFeaturesOptions = computed(() =>
  settingsStore.temp.saloonSpecs.inputPeculiarity.map((x) => ({
    value: x,
    label: x,
  }))
)
</script>

<template>
  <el-checkbox-group v-model="settingsStore.temp.saloonSpecs.peculiaritiesList">
    <el-row>
      <el-col v-for="(peculiarity, id) in peculiaritiesOptions" :key="id" :lg="12" :sm="24">
        <el-checkbox :label="peculiarity" size="large" />
      </el-col>
      <el-col :lg="12" :sm="24">
        <el-select-v2
          v-model="settingsStore.temp.saloonSpecs.inputPeculiarity"
          collapse-tags
          collapse-tags-tooltip
          class="w-full"
          :options="customFeaturesOptions"
          placeholder="Другие особенности"
          allow-create
          filterable
          multiple
          clearable
        />
      </el-col>
    </el-row>
  </el-checkbox-group>
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


.description
  font-family: 'Verdana';
  font-style normal
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-bottom 24px
</style>

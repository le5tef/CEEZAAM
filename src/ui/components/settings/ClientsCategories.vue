<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

const addCategory = () => {
  settingsStore.addCategory()
}
const removeClientsCategory = (id: number) => {
  settingsStore.removeClientsCategory(id)
}
</script>

<template>
  <div class="d-flex flex-column">
    <div v-for="(category, id) in settingsStore.temp.clientsCategories" :key="id" class="mb-4">
      <div v-if="!category.deletable" :class="['d-flex']">
        {{ category.name }}
      </div>
      <div v-else :class="['d-flex']">
        <el-input v-model="category.name" :class="$style.input"></el-input>
        <el-button text @click="removeClientsCategory(id)">
          <el-icon class="text-muted">
            <close />
          </el-icon>
        </el-button>
      </div>
    </div>
    <button :class="[$style.button]" @click="addCategory">
      <el-icon>
        <plus />
      </el-icon>
      Добавить категорию
    </button>
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

.heading
  font-size 18px
  line-height 24px
  font-family Verdana
  font-weight 700
  color $cText
  margin-bottom 16px

.button
  cursor pointer
  margin-right 24px
  padding 0 4px
  width 200px
  height 50px
  word-break break-all
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 14px
  line-height 24px
  border-radius: 8px
  flex: none
  order: 0
  flex-grow: 0
  color $cPrimary
  @media (max-width: $tabletVerWidth)
    width 100%

.description
  font-family: 'Verdana';
  font-style normal
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-bottom 24px

.input
  max-width 200px
  @media (max-width: $tabletVerWidth)
    max-width 100%
    margin 0 0 16px 0
</style>

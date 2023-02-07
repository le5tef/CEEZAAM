<script setup lang="ts">
import { useEmployeesStore } from '@/store/employees'
import { DeleteFilled } from '@element-plus/icons-vue'
import { useDialogStore } from '@/store/dialog'
import { useUiStore } from '@/store/ui'

const dialogStore = useDialogStore()
const employeesStore = useEmployeesStore()
const uiStore = useUiStore()
const openDialog = () => {
  dialogStore.openDialog('EmployeesAddMotivation')
}
</script>

<template>
  <el-row
    :class="[uiStore.isMobileWidth ? 'px-4' : '', $style.wrapper]"
    :gutter="uiStore.isMobileWidth ? 0 : 16"
  >
    <el-col
      v-for="(motivation, id) in employeesStore.motivations"
      :key="id"
      :xl="6"
      :lg="8"
      :md="12"
      :sm="24"
    >
      <div :class="[$style.motivation, 'd-flex', 'flex-column', 'justify-space-between']">
        <div :class="['d-flex', 'flex-column']">
          <div :class="['heading', 'font-18']">{{ motivation.title }}</div>
          <div :class="[$style.description, 'mb-4', 'mt-4']">
            {{ motivation.description }}
          </div>
        </div>
        <div class="d-flex justify-end w-full">
          <button :class="$style.button">
            <el-icon>
              <DeleteFilled />
            </el-icon>
            Удалить
          </button>
        </div>
      </div>
    </el-col>
    <el-col v-if="employeesStore.motivations.length === 0" :xl="6" :lg="8" :md="12" :sm="24">
      <div :class="[$style.motivation, 'd-flex', 'flex-column', 'align-center']">
        <div :class="['heading', 'font-18']">Мотиваций пока нет</div>
        <div :class="[$style.description, 'mb-4', 'mt-4']">Добавьте первую</div>
        <div class="d-flex justify-center w-full">
          <button :class="[$style.button, $style.submit]" @click="openDialog">
            Добавить мотивацию
          </button>
        </div>
      </div>
    </el-col>
    <el-col v-else :xl="6" :lg="8" :md="12" :sm="24">
      <div :class="[$style.motivation, 'd-flex', 'flex-column', 'align-center']">
        <div :class="[$style.description, 'mb-4', 'h-full', 'mt-4']">
          Добавьте следующую мотивацию
        </div>
        <div class="d-flex justify-center w-full">
          <button :class="[$style.button, $style.submit]" @click="openDialog">
            Добавить мотивацию
          </button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="stylus" module>
.wrapper
  //
.motivation
  box-shadow 0 0 8px rgba(26, 14, 62, 0.25)
  border-radius 8px
  padding 16px
  margin-bottom 16px
  height 154px
  background white

.button
  cursor pointer
  margin-right 4px
  padding 4px
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
    margin 0 0 16px 0

.submit
  padding 10px
  border none
  color white
  background: $cPrimary



.description
  font-weight 400
  font-size 14px
  line-height 24px
</style>

<script lang="ts" setup>
import { EditPen } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useServicesStore } from '@/store/services'
import { useDialogStore } from '@/store/dialog'

const servicesStore = useServicesStore()
const dialogStore = useDialogStore()

const editService = (id: string) => {
  servicesStore.setSelectedService(id)
  dialogStore.openDialog('ServiceEdit')
}

const services = computed(() =>
  servicesStore.filteredServices.map((service) => {
    return {
      id: service.id,
      name: service.name,
      duration: `${service.duration} мин.`,
      mastersAmount: service.mastersAmount,
    }
  })
)
</script>

<template>
  <div>
    <el-table :data="services">
      <el-table-column :min-width="200" label="Наименование" prop="name">
        <template #default="scope">
          <div class="d-flex align-center">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :min-width="170" label="Продолжительность" prop="duration">
        <template #default="scope">
          <div class="d-flex align-center">
            {{ scope.row.duration }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :min-width="150" label="Кол-во мастеров" prop="mastersAmount">
        <template #default="scope">
          <div class="d-flex align-center">
            {{ scope.row.mastersAmount }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="60">
        <template #default="scope">
          <el-button class="el-button--primary" text @click="editService(scope.row.id)">
            <el-icon :size="20">
              <EditPen />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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

.active
  color $cAccent !important

.disabled
  color $cTextMuted !important

.heading
  font-size 26px
  line-height 28px
  font-family Verdana
  font-weight 700
  color $cText
  margin-bottom 16px

.description
  font-family 'Verdana'
  font-style italic
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  width calc(100% - 50px)

.button
  display flex
  align-items center
  cursor pointer !important
  width 100% !important
  padding 0 20px !important
  font-family 'Verdana' !important
  font-style normal !important
  font-weight 700 !important
  font-size 14px
  line-height 24px
  border-radius: 8px
  flex: none
  order: 0
  flex-grow: 0
  border none !important
  color $cAccent !important
  @media (max-width: $tabletVerWidth)
    width 100%
    margin 0 0 16px 0

.outlined
  border 1px solid $cPrimary !important
  color $cPrimary !important
  background: white

.submit
  border none
  color white
  background: $cPrimary
</style>

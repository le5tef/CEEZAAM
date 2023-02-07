<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import EmployeesCards from '@/ui/components/employees/EmployeesCards.vue'
import EmployeesSchedule from '@/ui/components/employees/EmployeesSchedule.vue'
import EmployeesMotivation from '@/ui/components/employees/EmployeesMotivation.vue'
import EmployeesPayroll from '@/ui/components/employees/EmployeesPayroll.vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTES_PATHS } from '@/constants'

const enum TabsEnum {
  LIST = 'list',
  SCHEDULE = 'schedule',
  MOTIVATIONS = 'motivations',
  PAYROLL = 'payroll',
}

const activeTab = ref<TabsEnum>(TabsEnum.LIST)

const route = useRoute()
const router = useRouter()

const tabRouteMap = {
  [ROUTES_PATHS.EMPLOYEES_LIST]: TabsEnum.LIST,
  [ROUTES_PATHS.EMPLOYEES_SCHEDULE]: TabsEnum.SCHEDULE,
  [ROUTES_PATHS.EMPLOYEES_MOTIVATIONS]: TabsEnum.MOTIVATIONS,
  [ROUTES_PATHS.EMPLOYEES_PAYROLL]: TabsEnum.PAYROLL,
}

const routeTabMap = {
  [TabsEnum.LIST]: ROUTES_PATHS.EMPLOYEES_LIST,
  [TabsEnum.SCHEDULE]: ROUTES_PATHS.EMPLOYEES_SCHEDULE,
  [TabsEnum.MOTIVATIONS]: ROUTES_PATHS.EMPLOYEES_MOTIVATIONS,
  [TabsEnum.PAYROLL]: ROUTES_PATHS.EMPLOYEES_PAYROLL,
}

function parseTabFromRoutePath() {
  activeTab.value = tabRouteMap[route.path] || activeTab.value
}

onMounted(async () => {
  parseTabFromRoutePath()
})
watch(() => route.path, parseTabFromRoutePath)

watch(
  () => activeTab.value,
  () => {
    router.push(routeTabMap[activeTab.value])
  }
)
</script>

<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Сотрудники" :name="TabsEnum.LIST">
        <EmployeesCards />
      </el-tab-pane>
      <el-tab-pane label="График" :name="TabsEnum.SCHEDULE">
        <EmployeesSchedule />
      </el-tab-pane>
      <el-tab-pane label="Мотивация" :name="TabsEnum.MOTIVATIONS">
        <EmployeesMotivation />
      </el-tab-pane>
      <el-tab-pane label="Расчёт зарплаты" :name="TabsEnum.PAYROLL">
        <div></div>
        <EmployeesPayroll />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important

:deep(.el-tabs__content)
  overflow visible

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
</style>

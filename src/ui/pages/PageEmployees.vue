<script lang="ts" setup>
import EmployeesAddShiftDialog from '@/ui/components/employees/EmployeesAddShiftDialog.vue'
import EmployeesAddAdministratorDialog from '@/ui/components/employees/EmployeesAddAdministatorDialog.vue'
import EmployeesAddEmployeeDialog from '@/ui/components/employees/EmployeesAddEmployeeDialog.vue'
import EmployeesAddMasterDialog from '@/ui/components/employees/EmployeesAddMasterDialog.vue'
import EmployeesDayDialog from '@/ui/components/employees/EmployeesDayDialog.vue'
import EmployeesCustomEmployee from '@/ui/components/employees/EmployeesEditEmployeeDialog.vue'
import EmployeesCardDialog from '@/ui/components/employees/EmployeesCardDialog.vue'
import EmployeesDismissalDialog from '@/ui/components/employees/EmployeesDismissalDialog.vue'
import EmployeesAbsenceDialog from '@/ui/components/employees/EmployeesAbsenceDialog.vue'
import EmployeesAddMotivationDialog from '@/ui/components/employees/EmployeesAddMotivationDialog.vue'
</script>

<template>
  <div class="page">
    <EmployeesAddShiftDialog />
    <EmployeesAddAdministratorDialog />
    <EmployeesAddEmployeeDialog />
    <EmployeesAddMasterDialog />
    <EmployeesDayDialog />
    <EmployeesCustomEmployee />
    <EmployeesCardDialog />
    <EmployeesDismissalDialog />
    <EmployeesAbsenceDialog />
    <EmployeesAddMotivationDialog />

    <div class="content">
      <div :class="$style.root">
        <router-view v-slot="{ Component }">
          <transition mode="out-in">
            <component :is="Component" class="transition-basic" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" module>
.root {
  margin-bottom 32px
}

.button
  cursor pointer
  margin-right 24px
  padding 13px 12px 13px 12px
  width 220px
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
  @media (max-width: $tabletVerWidth)
    width 100%
    margin 0 0 16px 0

.outlined
  border 1px solid $cPrimary
  color $cPrimary
  background: white

.submit
  border none
  color white
  background: $cPrimary

.actions
  display flex
  flex-direction row
  margin-bottom 24px
  @media (max-width $tabletVerWidth)
    flex-direction column
</style>

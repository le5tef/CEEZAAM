<script lang="ts" setup>
import { useClientsFiltersStore } from '@/store/clients'
import type { FilterChip } from '@/store/clients'

const filtersStore = useClientsFiltersStore()
const maxChips = 4
const closeChip = (chip: FilterChip) => {
  filtersStore.closeChip(chip)
  filtersStore.commitFilters()
}
</script>

<template>
  <div>
    <el-tag
      v-for="chip in filtersStore.filtersChips.slice(0, maxChips)"
      :key="chip.label"
      type="info"
      class="ma-1"
      closable
      @close="closeChip(chip)"
    >
      {{ chip.label }}
    </el-tag>
    <el-dropdown v-if="filtersStore.filtersChips.length > maxChips">
      <el-tag type="info" class="ma-1">
        Фильтры +{{ filtersStore.filtersChips.length - maxChips }}
      </el-tag>

      <template #dropdown>
        <div class="pa-2 d-flex flex-column">
          <el-tag
            v-for="chip in filtersStore.filtersChips.slice(
              maxChips,
              filtersStore.filtersChips.length
            )"
            :key="chip.label"
            type="info"
            class="mt-1"
            closable
            @close="closeChip(chip)"
          >
            {{ chip.label }}
          </el-tag>
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="stylus" module>

</style>
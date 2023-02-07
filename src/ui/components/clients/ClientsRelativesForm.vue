<script lang="ts" setup>
import { watch } from 'vue'
import { useClientsStore } from '@/store/clients/clients'
import { Delete, Plus } from '@element-plus/icons-vue'

const clientsStore = useClientsStore()

watch(
  () => clientsStore.temp.relatives,
  () => {
    if (clientsStore.temp.relatives.length === 0) {
      clientsStore.temp.relatives.push({})
    }
  }
)
</script>

<template>
  <div>
    <div :class="['heading', 'font-18']">Родственники</div>
    <div v-for="(relative, id) in clientsStore.temp.relatives" :key="id">
      <el-row :gutter="32">
        <el-col :lg="9" :md="8" :sm="12" :span="24" :xs="24">
          <el-form-item label="Родственники">
            <el-input v-model="relative.phone" size="large" />
          </el-form-item>
        </el-col>
        <el-col :lg="9" :md="8" :sm="12" :span="24" :xs="24">
          <el-form-item label="Кем приходится">
            <el-input v-model="relative.relative" size="large" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6" :sm="12" :span="24" :xs="24" class="d-flex align-center">
          <el-button
            v-if="clientsStore.temp.relatives?.length === 1"
            :class="$style.button"
            size="large"
            @click="clientsStore.addRelative()"
          >
            <el-icon :size="13" class="mr-1">
              <plus />
            </el-icon>
            Добавить родственника
          </el-button>
          <div v-else>
            <el-button text @click="clientsStore.addRelative()">
              <el-icon :size="20">
                <plus />
              </el-icon>
            </el-button>
            <el-button text @click="clientsStore.removeRelative(id)">
              <el-icon :size="20">
                <delete />
              </el-icon>
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-divider v-if="id + 1 !== clientsStore.temp.relatives?.length" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-input .el-select)
  width 100% !important
</style>

<style lang="stylus" module>

.button
  cursor pointer
  height 50px
  width 100% !important
  font-family 'Verdana' !important
  font-style normal
  font-weight 700 !important
  font-size 14px !important
  line-height 24px !important
  border-radius: 8px !important
  flex: none
  order: 0
  flex-grow: 0
  border none !important
  color $cPrimary !important
  @media (max-width: $tabletVerWidth)
    margin 0 0 16px 0
</style>

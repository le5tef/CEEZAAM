<script lang="ts" setup>
import { computed } from 'vue'
import { useClientsStore } from '@/store/clients/clients'
import { communicationWaysOptions } from '@/services/clients'
import type { CommunicationWaysEnum } from '@/enums'

const clientsStore = useClientsStore()

const selectedWays = computed<CommunicationWaysEnum[]>({
  get: () => clientsStore.temp.contacts.allowCommunicationWays.map((x) => x.channel),
  set: (val: CommunicationWaysEnum[]) =>
    (clientsStore.temp.contacts.allowCommunicationWays = val.map((x) => ({
      channel: x,
    }))),
})
</script>

<template>
  <div>
    <div :class="['heading', 'font-18']">Контакты</div>
    <el-row :gutter="32">
      <el-col :md="8" :sm="12" :span="24" :xs="24">
        <el-form-item label="Телефон" prop="contacts.phone">
          <el-input v-model="clientsStore.temp.contacts.phone" size="large" />
        </el-form-item>
      </el-col>
      <el-col :md="8" :sm="12" :span="24" :xs="24">
        <el-form-item label="Email" prop="contacts.email">
          <el-input v-model="clientsStore.temp.contacts.email" size="large" />
        </el-form-item>
      </el-col>
      <el-col :md="8" :sm="24" :span="24" :xs="24">
        <el-form-item label="Способы коммуникации">
          <el-select-v2
            v-model="selectedWays"
            :options="communicationWaysOptions"
            collapse-tags
            collapse-tags-tooltip
            filterable
            multiple
            placeholder="Не звонить и не писать"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-select)
  width 100% !important
  height 40px

:deep(.el-input)
  width 100% !important
  height 40px

:deep(.el-select-v2__wrapper)
  width 100% !important
  min-height 40px
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

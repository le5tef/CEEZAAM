<script lang="ts" setup>
import { useClientsStore } from '@/store/clients'
import dayjs from 'dayjs'
import CakeSvg from '@/ui/components/Icons/CakeSvg.vue'
import { EditPen, PhoneFilled, Calendar } from '@element-plus/icons-vue'
import { computed } from 'vue'
import ClientsContactsDropdownMenu from '@/ui/components/clients/ClientsContactsDropdownMenu.vue'
import { ROUTES_NAMES } from '@/constants'
import type { Client } from '@/entities/clients'
import { useDialogStore } from '@/store'

const clientsStore = useClientsStore()
const dialogStore = useDialogStore()
const isBirthdaySoon = (val: Date) => {
  const today = dayjs().startOf('day')
  const date = dayjs(val).set('year', today.year())
  const diff = Math.floor((date.diff(today, 'hours') + 6) / 24)
  const isSoon = diff > 0 && diff < 31
  const isToday = diff === 0
  console.log(diff, date)
  return {
    label: isSoon ? 'Скоро' : isToday ? 'Сегодня' : '',
    cake: isSoon || isToday,
    class: isToday ? 'red' : '',
  }
}

const phone = (val?: string) => {
  if (val) return '... ... ' + val.slice(val.length - 4, val.length)
  return ''
}

const visitsTypes = (val?: number) => {
  if (!val) return 'Не известно'
  if (val <= 1) return 'Разово'
  if (val <= 5) return 'Не часто'
  if (val <= 10) return 'Редко'
  if (val > 10) return 'Регулярно'
}

const textCutter = (val: string) => {
  val = val.trim()
  if (val && val.length > 16) return val.slice(0, 16) + '...'
  return val
}

const fullName = (client: Client) => {
  return textCutter(
    `${client?.general.lastName} ` +
      `${client?.general.firstName} ` +
      `${client?.general.patronymic}`
  )
}

const visits = (val?: number) => {
  if (!val || val === 0) return 'Нет визитов'
  if (val > 1000) return '< ' + (val % 1000) + ' тыс'
  if (val % 100 === 1) return val + ' визит'
  if (val % 100 >= 2 && val % 100 <= 4) return val + ' визита'
  return val + ' визитов'
}

const clients = computed(() =>
  clientsStore.clients.map((client) => {
    return {
      id: client.id,
      editableDescription: false,
      contacts: client.contacts,
      hasSubscription: !!client.subscription,
      hasCommunicationWays: !!client.contacts.allowCommunicationWays?.length,
      fullName: fullName(client),
      phone: phone(client.contacts.phone),
      visits: visits(client.subscription),
      visitsTypes: visitsTypes(client.visits),
      birthday: client.general.birthDate?.toLocaleDateString('ru-RU'),
      isBirthdaySoon: client.general.birthDate ? isBirthdaySoon(client.general.birthDate) : null,
      description: textCutter(client.additional.description || ''),
    }
  })
)
</script>

<template>
  <div>
    <el-table v-loading="clientsStore.clientsLoading" :data="clients">
      <el-table-column :min-width="200" label="ФИО" prop="fullName">
        <template #default="scope">
          {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column :min-width="170" label="Телефон" prop="phone">
        <template #default="scope">
          <div v-if="scope.row.phone" class="d-flex align-center">
            {{ scope.row.phone }}

            <el-dropdown :disabled="!scope.row.hasCommunicationWays">
              <el-icon
                :class="[scope.row.hasCommunicationWays ? $style.active : $style.disabled, 'ml-1']"
              >
                <PhoneFilled />
              </el-icon>
              <template #dropdown>
                <ClientsContactsDropdownMenu :client-contacts="scope.row?.contacts" />
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
      <el-table-column :min-width="150" label="Абонемент" prop="subscription">
        <template #default="scope">
          <div v-if="scope.row.hasSubscription" class="d-flex align-center">
            <div :class="[scope.row.hasSubscription ? $style.green : $style.red, 'mr-1']"></div>
            {{ scope.row.visits }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :min-width="130" label="Визиты" prop="visits">
        <template #default="scope">
          <el-tooltip
            v-if="scope.row.visits"
            :content="scope.row.visits.toString()"
            placement="right-start"
          >
            <el-button class="text-muted font-weight-700">{{ scope.row.visitsTypes }}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :min-width="150" label="Дата рождения" prop="birthDate">
        <template #default="scope">
          <div v-if="scope.row.birthday" class="d-flex align-center font-14">
            {{ scope.row.birthday }}
            <el-tooltip
              v-if="scope.row.isBirthdaySoon.cake"
              class="d-flex align-center"
              :content="scope.row.isBirthdaySoon.label"
              placement="right"
            >
              <div :class="[scope.row.isBirthdaySoon.class, 'ml-1']">
                <CakeSvg />
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column :min-width="200" label="Комментарий" prop="description">
        <template #default="scope">
          <div class="d-flex align-center">
            <div :class="$style.description">{{ scope.row.description }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="" width="100">
        <template #default="scope">
          <div style="display: flex; flex-direction: row">
            <div style="width: 50px">
              <router-link :to="{ name: ROUTES_NAMES.CLIENTS_EDIT, params: { id: scope.row.id } }">
                <el-button class="el-button--primary" text>
                  <el-icon>
                    <EditPen />
                  </el-icon>
                </el-button>
              </router-link>
            </div>
            <el-button
              class="el-button--primary"
              text
              @click="dialogStore.openDialog('ClientsVisit')"
            >
              <el-icon>
                <Calendar />
              </el-icon>
            </el-button>
          </div>
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
.red:deep(svg path)
  fill $cAccent
</style>

<style lang="stylus" module>
.wrapper
  padding 24px
  margin-top 24px
  background white
  overflow auto
  box-shadow 0 0 8px 0 rgba(26, 14, 62, 0.25)
  border-radius 8px

.green
  width 10px
  height 10px
  background green
  border-radius 50%

.red
  width 10px
  height 10px
  background red
  border-radius 50%


.active
  color $cAccent !important

.disabled
  color $cTextMuted !important

.a-disabled
  pointer-events none
  cursor default
  text-decoration none
  color $cTextMuted

.phoneActions
  display flex !important
  justify-content left
  align-items center
  @media (max-width $tabletVerWidth)
    margin-bottom 24px

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

import { defineStore } from 'pinia'
import { useClientsStore } from '@/store/clients/clients'
import {
  BoolEnum,
  CommunicationWaysEnum,
  DayOfWeekEnum,
  dayOfWeekReadable,
  SexEnum,
  SubscriptionEnum,
} from '@/enums'
import { communicationWayReadable, sexReadable } from '@/services/clients'
const filtersForm = {
  search: null as string | null,
  general: {
    sex: {
      label: sexReadable(SexEnum.ANY) as string,
      value: SexEnum.ANY as SexEnum,
    },
    categories: [] as string[],
    lastVisitPeriod: {
      label: 'Не важно' as string,
      value: {
        from: null as Date | null,
        to: null as Date | null,
      },
    },
  },
  contacts: {
    hasEmail: {
      label: 'Не важно' as string,
      value: BoolEnum.ANY as BoolEnum,
    },
    allowCommunicationWays: [] as { value: CommunicationWaysEnum; id: string }[] | null,
    howDidYouKnow: {
      label: 'Не важно' as string,
      value: '' as string,
    },
    distanceFromSaloon: {
      id: 0,
      label: 'Не важно',
      value: {
        from: null as number | null,
        to: null as number | null,
      },
    },
  },
  additional: {
    favoriteSaloon: {
      value: '' as string,
      label: 'Не важно' as string,
    },
    // какая-то заднитца
    favoriteMaster: [''] as string[],
    visitDays: [] as { value: DayOfWeekEnum; id: string }[] | null,
    visitHours: {
      id: 0 as number,
      label: 'Не важно' as string,
      value: {
        from: null as number | null,
        to: null as number | null,
      },
    },
    subscription: {
      label: 'Не важно' as string,
      value: null as SubscriptionEnum | null,
    },
    deposit: {
      label: 'Не важно' as string,
      value: BoolEnum.ANY as BoolEnum,
    },
    visitsAmount: {
      label: 'Не важно' as string,
      value: {
        from: null as number | null,
        to: null as number | null,
      },
    },
    spentMoney: {
      label: 'Не важно' as string,
      value: {
        from: null as number | null,
        to: null as number | null,
      },
    },
  },
}

type FiltersSection = 'additional' | 'general' | 'contacts'

export type FilterChip = {
  label: string
  path: [FiltersSection, string, string] | [FiltersSection, string]
}

export const useClientsFiltersStore = defineStore('clients/filters', {
  state: () => ({
    filters: structuredClone(filtersForm) as typeof filtersForm,
  }),
  getters: {
    filtersChips(): FilterChip[] {
      return [
        ...this.filtersAdditionalChips,
        ...this.filtersContactsChips,
        ...this.filtersGeneralChips,
      ]
    },
    filtersGeneralChips(): FilterChip[] {
      const clientStore = useClientsStore()
      const filters = this.filters.general
      const buttons: FilterChip[] = []

      if (filters.sex.value !== SexEnum.ANY)
        buttons.push({ label: filters.sex.label, path: ['general', 'sex'] })
      if (filters.lastVisitPeriod.value.to || filters.lastVisitPeriod.value.from) {
        buttons.push({
          label: `${filters.lastVisitPeriod.label}`,
          path: ['general', 'lastVisitPeriod'],
        })
      }
      for (const categoryId of filters.categories) {
        const category = clientStore.categories.find((x) => {
          return x.id === categoryId
        })
        if (!category) {
          throw Error('Category not found')
        }
        buttons.push({
          label: category.name,
          path: ['general', 'categories', categoryId],
        })
      }
      return buttons
    },
    filtersContactsChips(): FilterChip[] {
      const filters = this.filters.contacts
      const buttons: FilterChip[] = []
      if (filters.hasEmail.value !== BoolEnum.ANY) {
        buttons.push({ label: `Email: ${filters.hasEmail.label}`, path: ['contacts', 'hasEmail'] })
      }
      if (filters.allowCommunicationWays) {
        for (const way of filters.allowCommunicationWays) {
          buttons.push({
            label: `${communicationWayReadable(way.value)}`,
            path: ['contacts', 'allowCommunicationWays', way.id],
          })
        }
      }
      if (filters.howDidYouKnow && filters.howDidYouKnow.value) {
        buttons.push({ label: filters.howDidYouKnow.value, path: ['contacts', 'howDidYouKnow'] })
      }
      if (filters.distanceFromSaloon.value.to || filters.distanceFromSaloon.value.from) {
        buttons.push({
          label: filters.distanceFromSaloon.label,
          path: ['contacts', 'distanceFromSaloon'],
        })
      }
      return buttons
    },
    filtersAdditionalChips(): FilterChip[] {
      const filters = this.filters.additional
      const buttons: FilterChip[] = []
      // if(filters.favoriteMaster)
      // if(fitlers.favoriteSaloon)
      if (filters.visitDays) {
        for (const day of filters.visitDays) {
          buttons.push({
            label: `${dayOfWeekReadable(day.value)}`,
            path: ['additional', 'visitDays', day.id],
          })
        }
      }
      if (filters.visitHours.value.from || filters.visitHours.value.to) {
        buttons.push({ label: filters.visitHours.label, path: ['additional', 'visitHours'] })
      }
      if (filters.subscription.value) {
        buttons.push({
          label: `Абонемент: ${filters.subscription.label}`,
          path: ['additional', 'subscription'],
        })
      }
      if (filters.deposit.value !== BoolEnum.ANY) {
        buttons.push({
          label: `Депозит: ${filters.deposit.label}`,
          path: ['additional', 'deposit'],
        })
      }
      if (filters.visitsAmount.value.from || filters.visitsAmount.value.to) {
        buttons.push({
          label: `Визитов: ${filters.visitsAmount.label}`,
          path: ['additional', 'visitsAmount'],
        })
      }
      if (filters.spentMoney.value.from || filters.spentMoney.value.to) {
        buttons.push({ label: filters.spentMoney.label, path: ['additional', 'spentMoney'] })
      }
      return buttons
    },
  },
  actions: {
    setSearch(val: string | null) {
      this.filters.search = val
    },
    discardFilters() {
      this.filters = structuredClone(filtersForm)
    },
    async commitFilters() {
      const clientsStore = useClientsStore()
      await clientsStore.fetchClients()
    },
    closeChip(chip: FilterChip) {
      const [module, field, id] = chip.path
      if (module === 'general') {
        const filters = this.filters.general
        if (field === 'sex') {
          filters.sex = { ...filtersForm.general.sex }
        } else if (field === 'lastVisitPeriod') {
          filters.lastVisitPeriod = { ...filtersForm.general.lastVisitPeriod }
        } else if (field === 'categories') {
          filters.categories = filters.categories.filter((x) => x !== id)
        }
      } else if (module === 'contacts') {
        const filters = this.filters.contacts
        if (field === 'hasEmail') {
          filters.hasEmail = { ...filtersForm.contacts.hasEmail }
        } else if (field === 'distanceFromSaloon') {
          filters.distanceFromSaloon = { ...filtersForm.contacts.distanceFromSaloon }
        } else if (field === 'howDidYouKnow') {
          filters.howDidYouKnow = { ...filtersForm.contacts.howDidYouKnow }
        } else if (field === 'allowCommunicationWays' && filters.allowCommunicationWays) {
          filters.allowCommunicationWays = filters.allowCommunicationWays.filter((x) => x.id !== id)
        }
      } else if (module === 'additional') {
        const filters = this.filters.additional
        if (field === 'favoriteSaloon') {
          //
        } else if (field === 'favoriteMaster') {
          //
        } else if (field === 'subscription') {
          filters.subscription = { ...filtersForm.additional.subscription }
        } else if (field === 'deposit') {
          filters.deposit = { ...filtersForm.additional.deposit }
        } else if (field === 'visitsAmount') {
          filters.visitsAmount = { ...filtersForm.additional.visitsAmount }
        } else if (field === 'spentMoney') {
          filters.spentMoney = { ...filtersForm.additional.spentMoney }
        } else if (field === 'visitHours') {
          filters.visitHours = { ...filtersForm.additional.visitHours }
        } else if (field === 'visitDays' && filters.visitDays) {
          filters.visitDays = filters.visitDays.filter((x) => x.id !== id)
        }
      }
    },
  },
})

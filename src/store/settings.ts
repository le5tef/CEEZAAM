import type { CompanyOfficeSchema, UpdateCompanyOfficeSchema } from '@/client'
import { OfficeLinkTypeEnum } from '@/client'
import { defineStore } from 'pinia'
import { useCompanyStore } from '@/store/company'
import { ClientsCategory } from '@/entities/clients'
import { useClientsStore } from '@/store/clients'

export const peculiaritiesOptions = [
  'Наличие парковки (бесплатная, платная)',
  'Работаем с детьми',
  'Возможен выезд мастера',
  'Доступность для людей с ограниченными возможностями',
  'Обязательная предоплата за услуги',
]

export type Phone = {
  phone: string
  additional: string
  description: string
  isHidden: boolean
}

const addressForm = Object.freeze({
  address: '' as string,
  path: '' as string,
  yandexMaps: '' as string,
  googleMaps: '' as string,
  twoGis: '' as string,
})

const contactsForm = Object.freeze({
  phones: [
    {
      phone: '',
      additional: '',
      description: '',
      isHidden: false,
    },
  ] as Phone[],
  saloonEmail: '' as string,
  reportEmail: '' as string,
})

const socialMediaForm = Object.freeze({
  fb: '' as string,
  vk: '' as string,
  ig: '' as string,
  wa: '' as string,
  tg: '' as string,
  vb: '' as string,
  tt: '' as string,
  another: '' as string,
})

const themingForm = Object.freeze({
  accent: { hex: '' as string },
  primary: { hex: '' as string },
  logo: undefined as File | undefined,
})

const saloonSpecsForm = Object.freeze({
  peculiaritiesList: [] as string[],
  inputPeculiarity: [] as string[],
})

const findOfficeLink = (office: CompanyOfficeSchema, type: OfficeLinkTypeEnum): string =>
  office?.links ? office.links.find((x) => x.type === type)?.link || '' : ''

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    temp: {
      address: { ...addressForm },
      contacts: { ...contactsForm },
      socialMedia: { ...socialMediaForm },
      saloonSpecs: { ...saloonSpecsForm },
      theming: structuredClone(themingForm),
      clientsCategories: [] as ClientsCategory[],
    },
  }),
  getters: {
    categories(): ClientsCategory[] {
      const clientStore = useClientsStore()
      return clientStore.categories
    },
    currentOffice(): CompanyOfficeSchema | null {
      const companyStore = useCompanyStore()
      return companyStore.currentCompanyOffice
    },
    addressDefault() {
      const data = { ...addressForm }
      if (this.currentOffice) {
        data.address = this.currentOffice.address || ''
        data.path = this.currentOffice.address_note || ''
        if (this.currentOffice.links) {
          data.yandexMaps = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.YANDEX_MAPS)
          data.googleMaps = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.GOOGLE_MAPS)
          data.twoGis = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.DUBLE_GIS_MAPS)
        }
      }
      return data
    },
    contactsDefault() {
      const data = { ...contactsForm }
      const office = this.currentOffice
      if (office) {
        if (office.emails) {
          data.saloonEmail = office.emails.find((x) => !x.for_report && x.public)?.email || ''
          data.reportEmail = office.emails.find((x) => x.for_report && !x.public)?.email || ''
        }
        if (office.phones) {
          data.phones = office.phones.map((x) => ({
            phone: x.phone,
            additional: x.additional_number,
            isHidden: !x.public,
            description: x.description,
          }))
        }
      }
      return data
    },
    socialMediaDefault() {
      const data = { ...socialMediaForm }
      if (this.currentOffice && this.currentOffice.links) {
        data.fb = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.FACEBOOK)
        data.vk = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.VK)
        data.ig = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.INSTAGRAM)
        data.wa = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.WHATSAPP)
        data.tg = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.TELEGRAM)
        data.vb = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.VIBER)
        data.tt = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.TIKTOK)
        data.another = findOfficeLink(this.currentOffice, OfficeLinkTypeEnum.OTHER)
      }
      return data
    },
    specsDefault() {
      const data = { ...saloonSpecsForm }
      if (this.currentOffice && this.currentOffice.features) {
        data.peculiaritiesList = this.currentOffice.features
          .filter((x) => peculiaritiesOptions.includes(x.title))
          .map((x) => x.title)
        data.inputPeculiarity = this.currentOffice.features
          .filter((x) => !peculiaritiesOptions.includes(x.title))
          .map((x) => x.title)
      }
      return data
    },
    themingDefault() {
      const companyStore = useCompanyStore()
      const data = { ...themingForm }
      if (companyStore.currentCompany) {
        data.accent.hex = companyStore.currentCompany.accent_color
        data.primary.hex = companyStore.currentCompany.primary_color
      }
      return data
    },
    // clientsCategoriesDefault(){
    //     const data = {...clientsTypesForm,}
    //     if (this.currentOffice && this.currentOffice.clientsTypes) {
    //         data = this.currentOffice.clientsTypes
    //     }
    //     return data
    // }
  },
  actions: {
    init() {
      this.resetContacts()
      this.resetSpecs()
      this.resetTheming()
    },
    resetContacts() {
      this.temp.address = { ...this.addressDefault }
      this.temp.contacts = { ...this.contactsDefault }
      this.temp.socialMedia = { ...this.socialMediaDefault }
    },
    resetSpecs() {
      this.temp.saloonSpecs = { ...this.specsDefault }
    },
    resetClientsCategories() {
      // this.temp.clientsTypes = {...this.clientsTypesDefault}
    },
    resetTheming() {
      this.temp.theming = structuredClone(this.themingDefault)
    },
    addCategory() {
      this.temp.clientsCategories.push(ClientsCategory.empty())
    },
    removeClientsCategory(categoryId: number) {
      this.temp.clientsCategories = this.temp.clientsCategories.filter((x, id) => {
        return id !== categoryId
      })
    },
    async saveClientsCategories() {
      // await
    },
    async saveOffice(data: UpdateCompanyOfficeSchema) {
      if (!this.currentOffice) throw Error()
      const companyStore = useCompanyStore()
      await companyStore.updateOffice(this.currentOffice.id, data)
    },
    async saveContacts() {
      if (!this.currentOffice) throw Error()

      const officeData = {
        ...this.currentOffice,
        address: this.temp.address.address,
        address_note: this.temp.address.path,
        phones: this.temp.contacts.phones.map((x) => ({
          phone: x.phone,
          additional_number: x.additional,
          description: x.description,
          public: x.isHidden,
        })),
        emails: [
          {
            email: this.temp.contacts.reportEmail,
            description: 'Для отчётов',
            for_report: true,
            public: false,
          },
          {
            email: this.temp.contacts.saloonEmail,
            description: 'Салон',
            for_report: false,
            public: true,
          },
        ],
        links: [
          { link: this.temp.socialMedia.fb, type: OfficeLinkTypeEnum.FACEBOOK, public: true },
          { link: this.temp.socialMedia.vk, type: OfficeLinkTypeEnum.VK, public: true },
          { link: this.temp.socialMedia.ig, type: OfficeLinkTypeEnum.INSTAGRAM, public: true },
          { link: this.temp.socialMedia.wa, type: OfficeLinkTypeEnum.WHATSAPP, public: true },
          { link: this.temp.socialMedia.tg, type: OfficeLinkTypeEnum.TELEGRAM, public: true },
          { link: this.temp.socialMedia.vb, type: OfficeLinkTypeEnum.VIBER, public: true },
          { link: this.temp.socialMedia.tt, type: OfficeLinkTypeEnum.TIKTOK, public: true },
          { link: this.temp.socialMedia.another, type: OfficeLinkTypeEnum.OTHER, public: true },

          {
            link: this.temp.address.yandexMaps,
            type: OfficeLinkTypeEnum.YANDEX_MAPS,
            public: true,
          },
          {
            link: this.temp.address.googleMaps,
            type: OfficeLinkTypeEnum.GOOGLE_MAPS,
            public: true,
          },
          { link: this.temp.address.twoGis, type: OfficeLinkTypeEnum.DUBLE_GIS_MAPS, public: true },
        ],
      }
      await this.saveOffice(officeData)
    },
    async saveFeatures() {
      if (!this.currentOffice) throw Error()

      const officeData = {
        ...this.currentOffice,
        features: [
          ...this.temp.saloonSpecs.peculiaritiesList.map((x) => ({ title: x })),
          ...this.temp.saloonSpecs.inputPeculiarity.map((x) => ({ title: x })),
        ],
      }
      await this.saveOffice(officeData)
    },
    async saveTheming() {
      const companyStore = useCompanyStore()
      if (!companyStore.currentCompany) throw Error('Company not found')

      await companyStore.updateCompany(companyStore.currentCompany.id, {
        ...companyStore.currentCompany,
        logo: this.temp.theming.logo,
        primary_color: this.temp.theming.primary.hex,
        accent_color: this.temp.theming.accent.hex,
      })
    },
  },
})

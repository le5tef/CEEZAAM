<script lang="ts" setup>
import { Slider } from '@ckpack/vue-color'
import UploadInputImage from '@/ui/components/onboarding/UploadInputImage.vue'
import { computed, ref, watch, watchEffect } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { CompanyColorsSettings } from '@/entities/settings/company_colors'
import { UI } from '@/constants/ui'
import ActionButtons from '@/ui/components/settings/ActionButtons.vue'
import { useSettingsStore } from '@/store'
import type { RuleItem } from 'async-validator/dist-types/interface'

const src = ref<string | null>(null)

const settingsStore = useSettingsStore()

interface Props {
  modelValue: CompanyColorsSettings
  currentLogoSrc?: string
  customSave: boolean
}

const props = withDefaults(defineProps<Props>(), { customSave: false, currentLogoSrc: undefined })

const emit = defineEmits<{
  (event: 'update:modelValue', data: CompanyColorsSettings): void
  (event: 'submit'): void
}>()

const submit = async () => {
  if (!formRef.value) return
  const form_valid = await formRef.value.validate()
  if (form_valid && formRef.value) {
    await formRef.value.validate(async (valid) => {
      if (!valid) return
      emit('update:modelValue', formData.value)
      if (!props.customSave) {
        await settingsStore.saveTheming()
      } else {
        emit('submit')
      }
    })
  }
}

function reset() {
  settingsStore.resetTheming()
}

const formRef = ref<FormInstance>()
const requiredRule = {
  required: true,
  message: 'Обязательное поле',
  trigger: 'blur',
}
const sizeRule = {
  required: false,
  message: `Соотношение сторон картинки должно быть ${UI.LOGO_WIDTH} к ${UI.LOGO_HEIGHT}`,
  validator: () => {
    return (
      (imageSize.value &&
        imageSize.value.width / imageSize.value.height === UI.LOGO_WIDTH / UI.LOGO_HEIGHT) ||
      !formData.value.logo
    )
  },
}

const hexRule: RuleItem = {
  message: 'Формат hex',
  validator: (rule, v) => {
    const hexRegex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    return hexRegex.test(v)
  },
}

const formRules = ref<FormRules>({
  logo: [sizeRule],
  primary_color: [requiredRule, hexRule],
  accent_color: [requiredRule, hexRule],
})

const formData = ref<CompanyColorsSettings>(
  new CompanyColorsSettings({
    logo: null,
    primary_color: props.modelValue.primary_color,
    accent_color: props.modelValue.accent_color,
  })
)

const imageSize = ref<{ height: number; width: number } | null>(null)

const formErrorsLists = ref({
  logo: [] as string[],
  primary_color: [] as string[],
  accent_color: [] as string[],
})

const handleImage = (file: File | null) => {
  if (file) {
    formData.value.logo = file
    src.value = URL.createObjectURL(file)
    const img = new Image()
    img.onload = function () {
      imageSize.value = {
        height: img.height,
        width: img.width,
      }
    }
    console.log(imageSize)
    img.src = src.value
  } else {
    formData.value.logo = null
    src.value = null
  }
}

const formErrors = computed(() => {
  return {
    logo: formErrorsLists.value.logo.join(''),
    primary_color: formErrorsLists.value.primary_color.join(''),
    accent_color: formErrorsLists.value.accent_color.join(''),
  }
})

const parseModelValue = () => {
  formData.value.primary_color = props.modelValue.primary_color
  formData.value.accent_color = props.modelValue.accent_color
}
parseModelValue()

watch(() => props.modelValue, parseModelValue, { deep: true })

const primaryColorModel = ref<{ hex: string }>({ hex: formData.value.primary_color })
const accentColorModel = ref<{ hex: string }>({ hex: formData.value.accent_color })

watch(
  () => [primaryColorModel.value, accentColorModel.value],
  () => {
    formData.value.primary_color = primaryColorModel.value.hex
    formData.value.accent_color = accentColorModel.value.hex
  }
)

watchEffect(() => emit('update:modelValue', formData.value))

const backgroundPrimary = computed(() => ({ backgroundColor: formData.value.primary_color }))
const backgroundAccent = computed(() => ({ backgroundColor: formData.value.accent_color }))
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-position="top"
      size="large"
      @submit.prevent
    >
      <el-row :gutter="12">
        <el-col :md="8" :sm="12" :span="24">
          <el-form-item :error="formErrors.logo" label="Логотип" prop="logo">
            <UploadInputImage
              :acceptable-extensions="'image/png'"
              :color="formData.primary_color"
              :current-src="currentLogoSrc"
              @change="handleImage"
            />
          </el-form-item>
        </el-col>
        <el-col :md="0" :sm="12" :span="12"></el-col>
        <el-col :md="8" :sm="12" :span="24">
          <el-form-item
            :error="formErrors.primary_color"
            label="Цвет бокового меню"
            prop="primary_color"
          >
            <Slider v-model="primaryColorModel" />
            <el-input v-model="formData.primary_color" :class="$style.input" size="large" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :span="24">
          <el-form-item
            :error="formErrors.accent_color"
            label="Цвет бокового меню"
            prop="accent_color"
          >
            <Slider v-model="accentColorModel" />
            <el-input v-model="formData.accent_color" :class="$style.input" size="large" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Пример приложения">
        <div :class="$style.template">
          <div :class="$style.template__menu" :style="backgroundPrimary">
            <div :class="$style.template__menu__logo">
              <img :src="src || currentLogoSrc" alt="" />
            </div>
            <div :class="$style.template__box" :style="backgroundAccent"></div>
          </div>
          <div :class="$style.template__container">
            <div :class="[$style.template__col, 'align-end']">
              <div :class="$style.template__button" :style="backgroundPrimary"></div>
            </div>
            <div :class="[$style.template__col, 'justify-end']">
              <div :class="$style.template__buttons">
                <div :class="$style.template__small_button" :style="backgroundAccent"></div>
                <div :class="$style.template__small_button" :style="backgroundAccent"></div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <ActionButtons @reset="reset" @submit="submit" />
  </div>
</template>

<style lang="stylus" module>
.root
  margin-top 24px

.template
  width 66%
  height 291px
  border-radius 4px
  overflow hidden
  display flex
  box-shadow 0 0 8px rgba(26, 14, 62, 0.25)

  &__menu
    width 20%
    height 100%

    &__logo
      display flex
      justify-content center
      align-items center
      height 30%

  &__box
    width 100%
    height 20%

  &__container
    width 80%
    padding 5%
    display flex
    justify-content space-between

  &__col
    width 50%
    height 100%
    display flex

  &__button
    width 65%
    height 15%
    @media (max-width $phoneWidth)
      width 100%

  &__small_button
    width 45%
    height 100%

  &__buttons
    height 10%
    width 75%
    display flex
    justify-content space-between
    @media (max-width $phoneWidth)
      width 100%
  @media (max-width $tabletVerWidth)
    width 100%
    max-height 230px
    min-height 140px
</style>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ROUTES_PATHS } from '@/constants'
import { Logger } from '@/utils'
import { AuthService } from '@/services'
import { Message } from '@element-plus/icons-vue'

const logger = new Logger({ prefix: 'AuthFormRegistration.vue' })
const dataSent = ref(false)
const isLoading = ref(false)
const stateDefault = {
  login: '',
  password: '',
  passwordCopy: '',
  termsAccepted: false,
}
const state = ref<typeof stateDefault>({ ...stateDefault })
const emailIsValid = computed(() => AuthService.validateLogin(state.value.login))
const passwordIsValid = computed(() => AuthService.validatePassword(state.value.password))
const passwordCopyIsValid = computed(() => state.value.password === state.value.passwordCopy)
const termsIsAccepted = computed(() => state.value.termsAccepted)
const isValid = computed(
  () =>
    emailIsValid.value &&
    passwordIsValid.value &&
    passwordCopyIsValid.value &&
    termsIsAccepted.value
)
const toggleTerms = () => (state.value.termsAccepted = !state.value.termsAccepted)

async function submit() {
  if (!isValid.value) return

  logger.log('submit')
  isLoading.value = true
  await AuthService.register({
    email: state.value.login,
    password: state.value.password,
    password_replay: state.value.passwordCopy,
  })
  dataSent.value = true
  isLoading.value = false
}
</script>

<template>
  <div>
    <template v-if="dataSent">
      <div class="sz-auth__heading">Завершение регистрации</div>
      <div>
        Вам на&nbsp;почту {{ state.login }} было отправлено письмо. Перейдите по&nbsp;ссылке
        из&nbsp;письма для подтверждение регистрации.
      </div>
      <el-icon :class="$style.icon" :size="78" color="#9D94A8">
        <Message />
      </el-icon>
    </template>
    <template v-else>
      <div class="sz-auth__heading">Регистрация</div>
      <el-form label-position="top" @submit.prevent>
        <el-form-item label="Почта">
          <el-input v-model="state.login" autofocus type="email" @keyup.enter="submit" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="state.password" type="password" @keyup.enter="submit" />
          <span class="text-muted"> Используйте верхний и нижний регистры </span>
        </el-form-item>
        <el-form-item label="Повторите пароль">
          <el-input v-model="state.passwordCopy" type="password" @keyup.enter="submit" />
        </el-form-item>
        <el-form-item>
          <div :class="$style.termsRow">
            <el-checkbox v-model="state.termsAccepted" />
            <div :class="$style.terms" @click="toggleTerms">
              Согласен c
              <a class="no-reset" href="https://example.com" target="_blank"
                >Пользовательским соглашением</a
              >
              и
              <a class="no-reset" href="https://example.com" target="_blank"
                >Политикой конфиденциальности</a
              >
            </div>
          </div>
        </el-form-item>
        <el-button
          :disabled="!isValid || isLoading"
          :loading="isLoading"
          type="primary"
          @click="submit"
        >
          Зарегистрироваться
        </el-button>
      </el-form>
      <div :class="$style.info">
        Уже зарегистрированы?
        <router-link class="no-reset" :to="ROUTES_PATHS.AUTH_LOGIN">Войдите</router-link>
      </div>
    </template>
  </div>
</template>

<style lang="stylus" module>
.termsRow
  display flex

.terms
  text-align left
  padding-left 10px
  user-select none
  cursor pointer

.info
  margin-top 16px

.icon
  margin-top 32px
</style>

<script lang="ts" setup>
import { emailValidation, passwordValidation } from '@/constants/regex'
import { reactive, ref, onMounted, onUpdated } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, helpers } from '@vuelidate/validators'
import { ToastType, USER_AUTH } from '@/constants/data'
import { useRouter } from 'vue-router'
import { showToast } from '@/helpers/getToast'
import { useStore } from 'vuex'

const router = useRouter()
const vuexStore = useStore()

const visible = ref(false)
const initialState = {
  email: '',
  password: ''
}
const formData = reactive({
  email: '',
  emailRules: {
    required: (value: string) => !!value || 'Field is required',
    emailValidator: (value: string) => {
      if (value?.length > 0 && emailValidation.test(value)) return true

      return 'Invalid e-mail'
    }
  },
  password: '',
  passwordRules: {
    required: (value: string) => !!value || 'Field is required',
    passwordValidator: (value: string) => {
      if (value?.length > 0 && passwordValidation.test(value)) return true

      return 'Password must contain minimum 6 characters, at least one letter, one number and one special character'
    }
  },
  visible: false
})
const state = reactive({
  ...initialState
})
const rules = {
  email: { required, email },
  password: {
    required,
    minLength: minLength(6),
    containsPasswordRequirement: helpers.withMessage(
      () => `Password requires an uppercase, lowercase, number and special character`,
      (value: string) => passwordValidation.test(value)
    )
  }
}
const v$ = useVuelidate(rules, state)
const onSubmit = () => {
  if (!v$.value.$invalid) {
    // let user = {
    //   email: state.email as string,
    //   name: 'Demo'
    // }
    // if (email === import.meta.env.VITE_APP_EMAIL && password === import.meta.env.VITE_APP_PASSWORD) {
    //   localStorage.setItem(USER_AUTH, JSON.stringify(user))
    //   router.replace('/')
    // } else {
    //   showToast({ message: 'Invalid email or password', type: ToastType.Error })
    // }
    vuexStore.dispatch('handleLogin', state)
  }
}
onMounted(() => {
  const userState = JSON.parse(vuexStore.state.userStore.user)
  if (userState) {
    router.replace('/')
  }
})

const userState = JSON.parse(vuexStore.state.userStore.user)
</script>

<template>
  <v-sheet width="500" class="mx-auto">
    <v-card>
      <v-form @submit.prevent="onSubmit" fast-fail class="px-10 py-8">
        <h2 class="font-weight-bold text-center mb-3">Login</h2>
        <v-text-field
          v-model="state.email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          class="['mb-3']"
          :error-messages="v$.email.$errors.map((e) => e.$message) as string[]"
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.password"
          label="Password"
          placeholder="Enter your password"
          :type="visible ? 'text' : 'password'"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visible = !visible"
          :error-messages="v$.password.$errors.map((e) => e.$message) as string[]"
          class="mb-3"
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
        ></v-text-field>

        <v-btn type="submit" block variant="flat" class="text-none mb-4" color="primary" @click="v$.$validate"
          >Submit</v-btn
        >
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style></style>

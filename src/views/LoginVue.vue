<script lang="ts" setup>
import { passwordValidation } from '@/constants/regex'
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
const formRef = ref(null)
const visible = ref(false)
const initialState = {
  name: '',
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
  name: { required },
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, state)
const onSubmit = () => {
  console.log('sfsdf')
  v$.value.$validate
}
</script>

<template>
  <v-sheet width="500" class="mx-auto">
    <v-card>
      <v-form @submit.prevent fast-fail class="px-10 py-8">
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
          required
        ></v-text-field>

        <v-text-field
          v-model="state.password"
          label="Password"
          placeholder="Enter your password"
          :type="visible ? 'text' : 'password'"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visible = !visible"
          :error-messages="v$.password.$errors.map((e) => e.$message) as string[]"
          required
          class="mb-3"
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          variant="flat"
          class="text-none mb-4"
          color="primary"
          @click="v$.$validate"
          >Submit</v-btn
        >
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style></style>

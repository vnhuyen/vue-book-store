import { ToastType, USER_AUTH } from "@/constants/data";
import type {UserAuth} from "@/constants/types";
import {showToast} from "@/helpers/getToast";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore('user', () => {
    const user = ref(localStorage.getItem(USER_AUTH))
    function handleLogin(userAuth: UserAuth) {
        let user = {
            email: userAuth.email,
            name: 'Demo'
        }
        if (userAuth.email === import.meta.env.VITE_APP_EMAIL && userAuth.password === import.meta.env.VITE_APP_PASSWORD) {
          console.log(userAuth.email, import.meta.env.VITE_APP_EMAIL)
          localStorage.setItem(USER_AUTH, JSON.stringify(user))
        } else {
          showToast({ message: 'Invalid email or password', type: ToastType.Error })
        }
    }
    function clearUserInfo() {
        localStorage.removeItem(USER_AUTH)
    }
    return {user, handleLogin, clearUserInfo }
})
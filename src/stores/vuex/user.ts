import { ToastType, USER_AUTH } from "@/constants/data";
import type {UserAuth, UserInfo} from "@/constants/types";
import {showToast} from "@/helpers/getToast";

export const userStore = {
    state: () => ({
        user: localStorage.getItem(USER_AUTH) 
    }),
    mutations: {
        saveUserInfo(state: {user: UserInfo}, userInfo: UserInfo) {
            console.log("saveUserInfo", state, userInfo)
            state.user = userInfo
            location.reload()
        },
        clearUserInfo(state: {user?: UserInfo}) {
            state.user = undefined
            location.reload()
        }
    },
    actions: {
        handleLogin({commit}: any, userAuth: UserAuth) {
            let user = {
                email: userAuth.email,
                name: 'Demo'
            }
            if (userAuth.email === import.meta.env.VITE_APP_EMAIL && userAuth.password === import.meta.env.VITE_APP_PASSWORD) {
                localStorage.setItem(USER_AUTH, JSON.stringify(user))
                commit('saveUserInfo', user)
            } else {
                showToast({ message: 'Invalid email or password', type: ToastType.Error })
            }
        },
        handleLogout({commit}: any) {
            localStorage.removeItem(USER_AUTH)
            commit('clearUserInfo')
        }
    }
}
import { reactive, ref } from 'vue';
import {WALLET_ADDRESS} from "@/constants/data";
import {defineStore} from "pinia";

export const useWalletStore = defineStore('wallet', () => {
    const walletAddressStored = localStorage.getItem(WALLET_ADDRESS)
    const state = reactive({
        walletAddress: ref(walletAddressStored ? JSON.parse(walletAddressStored): null)
    });

    function saveWalletAddress(value:string) {
        localStorage.setItem(WALLET_ADDRESS, JSON.stringify(value))
        state.walletAddress = value;
    }
    function signOutWallet() {
        localStorage.removeItem(WALLET_ADDRESS)
        state.walletAddress = null;
    }
    return {state, saveWalletAddress,signOutWallet}
})
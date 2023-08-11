<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { ethers } from 'ethers'
import type { UserInfo } from '@/constants/types'
import { useCartStore } from '@/stores/cart'
import { useWalletStore } from '@/stores/wallet'
import { showToast } from '@/helpers/getToast'
import { ToastType, blockchainData } from '@/constants/data'
import { shortenAddress } from '@/helpers/functions'
const vuexStore = useStore()
const cartStore = useCartStore()
const walletStore = useWalletStore()
const walletAddress = ref()
const signer = ref()
const userInfo = computed<UserInfo>(() => {
  return JSON.parse(vuexStore.state.userStore.user)
})
// const walletAddress = computed(() => {
//   return walletStore.state.walletAddress
// })

const handleLogout = () => {
  walletStore.signOutWallet()
  vuexStore.dispatch('handleLogout')
}

const requestWalletAccount = async () => {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then((result: any) => {
      walletAddress.value = result[0]
    })
  } else {
    showToast({ message: 'Metamask is not installed', type: ToastType.Error })
  }
}

const getCurrentAccount = async () => {
  if (typeof window.ethereum != 'undefined') {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (accounts.length > 0) {
      walletAddress.value = accounts[0]
    } else {
      walletStore.signOutWallet()
      console.log('Please install MetaMask')
    }
  }
}

const addWalletListener = async () => {
  if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
    window.ethereum.on('accountsChanged', (accounts: any) => {
      walletAddress.value = accounts[0]
    })
  } else {
    walletAddress.value = ''
    console.log('Please install MetaMask')
  }
}

const executeContract = async () => {
  if (typeof window.ethereum != 'undefined') {
    console.log('window.ethereum')
    const provider = new (ethers as any).providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    console.log('signer', provider)
    const contract = new ethers.Contract(blockchainData.contractAddress, blockchainData.abi, signer)
    try {
      await contract.store(42)
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log('Please install MetaMask')
  }
}

onMounted(() => {
  getCurrentAccount()
})
watch(walletAddress, () => {
  console.log('watching')
  addWalletListener()
})
</script>

<template>
  <v-app-bar color="primary" prominent>
    <v-container fluid>
      <div class="d-flex align-center justify-space-between w-100">
        <div class="d-flex align-center">
          <RouterLink class="d-flex align-center text-white" to="/">
            <v-icon icon="$vuetify"></v-icon>
            <div class="text-h5 mr-5">Vue Book Store</div>
          </RouterLink>
        </div>
        <template v-if="userInfo">
          <div class="d-flex align-center">
            <v-card-title
              >Hello <span class="font-weight-bold">{{ userInfo?.name }}</span></v-card-title
            >
            <v-btn to="/cart" class="buttonCart">
              <v-badge :content="cartStore.items.length" color="error">
                <v-icon icon="mdi-cart" size="x-large"></v-icon>
              </v-badge>
            </v-btn>
            <template v-if="walletAddress">
              <v-card-title>
                {{ shortenAddress(walletAddress) }}
                <v-btn variant="outlined" class="mr-3" @click.stop="executeContract"> Execute </v-btn>
              </v-card-title>
            </template>
            <template v-else>
              <v-btn variant="outlined" class="mr-3" @click="requestWalletAccount"> Connect Wallet </v-btn>
            </template>
            <v-btn variant="outlined" @click="handleLogout"> Logout </v-btn>
          </div>
        </template>
        <template v-else>
          <v-btn variant="outlined" to="/login" class="ml-5"> Login </v-btn>
        </template>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style>
.router-link-active {
  color: white;
}
nav a {
  color: #8c9eff;
}
.buttonCart:hover,
.buttonCart:hover .v-btn__overlay,
.buttonCart.v-btn--active,
.buttonCart.v-btn--active .v-btn__overlay {
  background-color: transparent;
}
</style>

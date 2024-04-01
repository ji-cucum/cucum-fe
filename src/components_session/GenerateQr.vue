<template>
  <button @click.prevent="generateQRCode">Generate GR Code</button>
  <vue-qrcode :value="value" :key="value" @change="onDataUrlChange" />
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import VueQrcode from 'vue-qrcode'

const value = ref('')

async function generateQRCode() {
  if(value.value === "" )
    try {
      const res = await axios.post('/api/generate-qr')
      value.value = res.data.url
    } catch (error) {
      console.error('Error fetching data from backend:', error)
    } else if(value.value){
      value.value = ""
    }
  }
</script>

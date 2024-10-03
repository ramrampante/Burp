<template>
  <dashboard :Burp="Burp" />
</template>

<script>
import Vue from 'vue'
import Burp from '@Burp/core'
import { Dashboard } from '@Burp/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    Burp: () => new Burp(),
  },
}
</script>

<style src="@Burp/core/dist/style.css"></style>
<style src="@Burp/dashboard/dist/style.css"></style>

<template>
  <TheHeader />
  <main>
    <router-view />
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  components: { TheHeader, TheFooter }
}
</script>

<style>
#app {
  width: 100%;
}

main {
  padding: 12px;
}
</style>
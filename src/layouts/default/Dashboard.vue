<template>
  <v-app>
    <v-container fluid class="mx-2 my-2" style="height:100vh">
      <v-row>
        <AppBar class="app-bar"/>
        <router-view class="content"/>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import AppBar from './AppBar.vue'
</script>

<style lang="less">
.container {
  height: 100vh;
  display: flex;
}

.app-bar {
  padding-right: 1rem;
  flex: 1;
  height: 100vh;
}

.content {
  padding-left: 1rem;
  flex: 6;
}
</style>

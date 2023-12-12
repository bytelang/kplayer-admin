<template>
  <v-app>
    <v-container fluid style="height:100vh; padding: 0;">
      <v-row>
        <v-col cols="2">
          <AppBar class="app-bar"/>
        </v-col>
        <v-col cols="10">
          <router-view class="content"/>
        </v-col>
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
}

.app-bar {
  padding-right: 1rem;
  height: 100vh;
}

.content {
  padding-left: 1rem;
}
</style>

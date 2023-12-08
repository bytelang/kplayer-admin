<template>
  <v-card>
    <v-layout style="height: 100%">
      <v-navigation-drawer
        class="bg-deep-purple"
        theme="dark"
        permanent
        style="width: 100%"
      >
        <v-list color="transparent">
          <router-link to="/home" exact-active-class="active">
            <v-list-item prepend-icon="mdi-view-dashboard" title="主页"></v-list-item>
          </router-link>
          <router-link to="/playlist" exact-active-class="active">
            <v-list-item prepend-icon="mdi-cached" title="播放列表"></v-list-item>
          </router-link>
          <router-link to="/scene" exact-active-class="active">
            <v-list-item prepend-icon="mdi-star-half-full" title="场景"></v-list-item>
          </router-link>
          <router-link to="/instance" exact-active-class="active" :class="isActive(this, '/instance')">
            <v-list-item prepend-icon="mdi-page-last" title="实例"></v-list-item>
          </router-link>
          <router-link to="/output" exact-active-class="active">
            <v-list-item prepend-icon="mdi-radiobox-marked" title="输出"></v-list-item>
          </router-link>
          <router-link to="/server" exact-active-class="active">
            <v-list-item prepend-icon="mdi-calendar" title="服务"></v-list-item>
          </router-link>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 400px"></v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
let isActive = (item, reg) => {
  let path = item.$router.currentRoute.value.path;
  const regex = new RegExp(`^${reg}.*`);
  if (regex.test(path)) {
    return 'active';
  }
  return '';
}
</script>

<style lang="less" scoped>
a {
  color: white;
  text-decoration: none;
}

a:hover {
  .v-list-item {
    background: #c0b1ff;
    color: #fff;
  }
}

.v-card--variant-elevated {
  box-shadow: none;
}

.active {
  .v-list-item {
    background: #ffffff;
    color: #663bb3;
  }
}
</style>

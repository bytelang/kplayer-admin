<template>
  <div>
    <div class="text-center">
      <v-btn
        :disabled="loading"
        append-icon="mdi-refresh"
        text="Refresh"
        variant="outlined"
        @click="onClick"
      ></v-btn>
    </div>

    <v-data-table :loading="loading" :items="items" :headers="headers">
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.action="{item}" class="action">
        <v-row>
          <v-col cols="2" md="3">
            <v-btn size="small" color="info" @click="preview(item)">查看</v-btn>
          </v-col>
          <v-col cols="2" md="3">
            <v-btn size="small" color="error" @click="remove(item)">删除</v-btn>
          </v-col>
        </v-row>
      </template>

    </v-data-table>
  </div>
</template>
<script>
import {get} from "@/plugins/api";

export default {
  data() {
    return {
      loading: false,
      show_tip: false,
      color: '#663bb3',
      headers: [
        {title: '实例名称', value: 'name'},
        {title: '播放列表', value: 'playlist'},
        {title: '场景', value: 'scene'},
        {title: '服务端', value: 'server'},
        {title: '是否正在运行', value: 'is_launched'},
        {title: '创建时间', value: 'created_at'},
        {title: '操作', value: 'action'},
      ],
      items: [],
    }
  },
  methods: {
    preview(item) {
      this.$router.push({name: "InstanceDetail", params: {name: item.name}});
    },
    remove() {
      alert('Todo')
    },
    getInstanceList() {
      get("/proxy/instance").then(data => {
        let list = [];
        for (let item in data) {
          let assign = item = Object.assign({name: item}, data[item]);
          list.push(assign);
        }
        console.log(list);
        this.items = list;
      }).catch(err => {
      });
    }
  },
  mounted() {
    this.getInstanceList();
  }
}
</script>

<style lang="less">
.action {
  button {
    margin: 0 1rem;
  }
}
</style>

<template>
  <v-data-table
    :headers="headers"
    fixed-header='true'
    fixed-footer='true'
    :items="playlist.media_list">
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>
          {{ item.path.SingleSource !== undefined ? item.path.SingleSource.path : item.path }}
        </td>
        <td style="min-width: 5rem;">{{ item.seek }}</td>
        <td style="min-width: 5rem;">{{ item.end }}</td>
        <td style="min-width: 5rem;">{{ item.duration }}</td>
        <td style="min-width: 5rem;">{{ Object.keys(item.streams).length }}</td>
        <td style="min-width: 10rem;">
          <v-row>
            <v-col>
              <v-btn size="small" color="primary" @click="play(item)">播放</v-btn>
            </v-col>
            <v-col>
              <v-btn size="small" color="error" @clock="remove(item)">删除</v-btn>
            </v-col>
          </v-row>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import {defineComponent} from "vue";
import {get, post} from "@/plugins/api";

export default defineComponent({
  data() {
    return {
      headers: [
        {title: 'ID', value: 'name'},
        {title: '路径', value: 'path'},
        {title: '起始', value: 'seek'},
        {title: '结束', value: 'end'},
        {title: '时长', value: 'duration'},
        {title: '流数量', value: 'streams'},
        {title: '操作', value: 'actions'}
      ],
      playlist: [],
    }
  },
  methods: {
    getInstanceList: function () {
      get(`/proxy/instance/${this.instance_name}/playlist`).then(data => {
        this.playlist = data.transform_get_play_list.playlist;
      }).catch(err => {
      });
    },
    play: function (item) {
      let media_name = item.name;
      post(`/proxy/instance/${this.instance_name}/playlist/select`, {
        name: media_name,
      }).then(data => {
        console.log(data)
      }).catch(err => {
      });
    }
  },
  props: {
    instance_name: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.getInstanceList();
  }
})


</script>

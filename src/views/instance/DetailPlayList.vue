<template>
  <v-data-table
    :headers="headers"
    fixed-header='true'
    fixed-footer='true'
    @update:page="handlePagination"
    :items="playlist.media_list">
    <template v-slot:item="{ item, index }">
      <tr :class="current_media.media.name === item.name ? 'active': ''">
        <td>{{ item.name }}<span></span></td>
        <td>
          {{ item.path.SingleSource !== undefined ? item.path.SingleSource.path : item.path }}
        </td>
        <td style="min-width: 5rem;">{{ item.seek }}</td>
        <td style="min-width: 5rem;">{{ item.end }}</td>
        <td style="min-width: 5rem;">{{ item.duration }}</td>
        <td style="min-width: 5rem;">{{ Object.keys(item.streams).length }}</td>
        <td style="min-width: 25rem;">
          <v-row>
            <v-col>
              <v-btn size="small" color="primary" @click="move(item,1, 0)"
                     :disabled="index=== (this.currentPage*10)">置顶
              </v-btn>
            </v-col>
            <v-col>
              <v-btn size="small" color="primary" @click="move(item,index, 0)"
                     :disabled="index=== (this.currentPage*10)">上移
              </v-btn>
            </v-col>
            <v-col>
              <v-btn size="small" color="primary" @click="move(item,index, 1)"
                     :disabled="index+(this.currentPage*10)  === playlist.media_list.length-1">下移
              </v-btn>
            </v-col>
            <v-col>
              <v-btn size="small" color="primary" @click="play(item)">播放</v-btn>
            </v-col>
            <v-col>
              <v-btn size="small" color="error" @click="remove(item)">删除</v-btn>
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
      current_media: null,
      currentPage: 0,
    }
  },
  methods: {
    getInstanceList: function () {
      get(`/proxy/instance/${this.instance_name}/playlist`).then(data => {
        this.playlist = data.transform_get_play_list.playlist;
      }).catch(err => {
      });
    },
    loadCurrentMedia() {
      get(`/proxy/instance/${this.instance_name}/playlist/current`).then(info => {
        this.current_media = info.transform_current_media;

        this.range[0] = this.current_media.media.seek === -1 ? 0 : this.current_media.media.seek;
        this.range[1] = this.current_media.media.end === -1 ? this.current_media.media.duration : this.current_media.media.end;

        console.log(this.range);
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
    },
    remove: function (item) {
      let media_name = item.name;
      post(`/proxy/instance/${this.instance_name}/playlist/remove`, {
        name: media_name,
      }).then(data => {
        this.getInstanceList();
      }).catch(err => {
      });
    },
    move: function (item, index, action) {
      let media_name = item.name;
      if (action === 0) {
        index -= 1;
      } else {
        index += 1;
      }

      if (index < 0) {
        console.log("invalid media index");
      }
      post(`/proxy/instance/${this.instance_name}/playlist/move`, {
        name: media_name,
        index: index,
      }).then(data => {
        this.getInstanceList();
      }).catch(err => {
      });
    },
    handlePagination(page) {
      this.currentPage = page - 1;
      console.log(this.currentPage);
    },
  },
  props: {
    instance_name: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.getInstanceList();
    this.loadCurrentMedia();
  }
})
</script>

<style lang="less" scoped>
.active {
  background-color: #ac87ff;
}
</style>

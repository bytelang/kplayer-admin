<template>
  <v-row>
    <v-col cols="4" md="5">
      <v-card>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="preview">状态预览</v-tab>
          <v-tab value="playlist">播放列表</v-tab>
          <v-tab value="encode">编码参数</v-tab>
          <v-tab value="scene">场景设置</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="preview">
              <v-card title="运行状态" subtitle="展示播放实例的基础信息" class="custom-shadow">
                <v-table v-if="information.version !== undefined">
                  <tbody>
                  <tr>
                    <td>实例名称:</td>
                    <td>{{ instance_name }}</td>
                    <td>flv.js加载:</td>
                    <td>{{ flvPlayer !== null }}</td>
                  </tr>
                  <tr>
                    <td>播放列表:</td>
                    <td>{{ information.playlist }}</td>
                    <td>正在运行:</td>
                    <td>{{ information.osed_at !== 0 ? '是' : '否' }}</td>
                  </tr>
                  <tr>
                    <td>libkplayer:</td>
                    <td>{{ information.version.libkplayer.tag }}</td>
                    <td>插件支持版本:</td>
                    <td>{{ information.version.plugin_support }}</td>
                  </tr>
                  <tr>
                    <td>创建时间:</td>
                    <td>{{ information.created_at }}</td>
                    <td>开始播放时间:</td>
                    <td>{{ information.launched_at }}</td>
                  </tr>
                  <tr>
                    <td>结束时间:</td>
                    <td>{{ information.closed_at === 0 ? '/' : information.closed_at }}</td>
                  </tr>
                  </tbody>
                </v-table>
              </v-card>
              <v-card title="运行状态" subtitle="展示播放实例的基础信息" class="custom-shadow">
                <v-table v-if="current_media !== null">
                  <tbody>
                  <tr>
                    <td>实例名称:</td>
                    <td colspan="3">{{ instance_name }}</td>
                  </tr>
                  <tr>
                    <td>媒体路径:</td>
                    <td colspan="3">
                      <span v-if="current_media.media.path.SingleSource !== null">
                        {{ current_media.media.path.SingleSource.path }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>起始时间:</td>
                    <td>{{ current_media.media.seek }}</td>
                    <td>停止时间:</td>
                    <td>{{ current_media.media.end }}</td>
                  </tr>
                  <tr>
                    <td>当前播放位置:</td>
                    <td>{{ current_media.media.position }} / {{ current_media.media.duration }}</td>
                    <td>是否使用缓存:</td>
                    <td colspan="3">{{ current_media.cache_reader === null ? '否' : '是' }}</td>
                  </tr>
                  <tr>
                    <td>缓存文件路径:</td>
                    <td colspan="3">{{ current_media.cache_reader === null ? '/' : information.cache_reader.path }}</td>
                  </tr>
                  </tbody>
                </v-table>
              </v-card>
              <v-card title="实例操作" subtitle="控制实例的播放行为" class="custom-shadow">
                <v-row>
                  <v-col align="end">
                    <v-btn color="info" prepend-icon="mdi-skip-previous" @click="prev">前一首</v-btn>
                  </v-col>
                  <v-col offset="3">
                    <v-btn color="info" append-icon="mdi-skip-next" @click="skip">后一首</v-btn>
                  </v-col>
                </v-row>
                <v-divider style="margin: 1rem"></v-divider>
                <v-row v-if="current_media !== null" justify="center">
                  <v-col>
                    <v-range-slider
                      v-model="range"
                      :max="current_media.media.duration"
                      :min="0"
                      :step="1"
                      hide-details
                      thumb-label="always"
                      class="align-center action"
                    >
                    </v-range-slider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center">
                    <v-btn color="info" @click="setRange">设置播放范围</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-window-item>
            <v-window-item value="playlist">
            </v-window-item>
            <v-window-item value="encode">
            </v-window-item>
            <v-window-item value="scene">
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="8" md="7">
      <v-sheet class="display" :elevation="3">
        <video id="videoElement" controls autoplay></video>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import "https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.js";
import {get, post} from "@/plugins/api";

export default {
  data() {
    return {
      instance_name: this.$route.params.name,
      tab: 'preview',
      panel: ['state', 'operate', 'relevance'],
      information: {},
      current_media: null,
      flvPlayer: null,
      range: [-1, -1],
    }
  },
  methods: {
    loadInformation() {
      get(`/proxy/instance/${this.instance_name}/info`).then(info => {
        this.information = info.transform_get_basic_info.info;
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
    prev() {
      post(`/proxy/instance/${this.instance_name}/playlist/prev`).then(info => {
        console.log(info)
      }).catch(err => {
      });
    },
    skip() {
      post(`/proxy/instance/${this.instance_name}/playlist/skip`).then(info => {
        console.log(info)
      }).catch(err => {
      });
    },
    setRange() {
      post(`/proxy/instance/${this.instance_name}/playlist/seek`, {
        seek: this.range[0],
        end: this.range[1],
      }).then(info => {
        console.log(info)
      }).catch(err => {
      });
    }
  },
  created() {
    // api
    this.loadInformation();
    this.loadCurrentMedia();
  },
  mounted() {
    if (flvjs.isSupported()) {
      let videoElement = document.getElementById('videoElement');
      let flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: `http://127.0.0.1:8080/live/${this.instance_name}.flv`,
        isLive: true,
      });
      flvPlayer.attachMediaElement(videoElement);
      // flvPlayer.load();
      // set object
      this.flvPlayer = flvPlayer;
    }
  }
}
</script>

<style scoped lang="less">
.display {
  margin: 0 2rem;
}

#videoElement {
  width: 100%;
}

.custom-shadow {
  border: 1px solid #eee;
  border-radius: 7px;
  margin: 0 1rem 0.8rem 1rem;
  box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.2);

  .action {
    padding: 0 2rem;
  }

  padding-bottom: 2rem;
}
</style>

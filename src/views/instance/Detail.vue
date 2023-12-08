<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-tabs
          v-model="tab"
          bg-color="primary"
        >
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
              <v-card title="实例操作" subtitle="控制实例的播放行为" style="margin-top: 50px;">
                <v-row>
                  <v-col align="end">
                    <v-btn color="info" prepend-icon="mdi-skip-previous">前一首</v-btn>
                  </v-col>
                  <v-col offset="3">
                    <v-btn color="info" append-icon="mdi-skip-next">后一首</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
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
    <v-col cols="8">
      <v-sheet class="display" :elevation="3">
        <video id="videoElement" controls></video>
      </v-sheet>
    </v-col>
  </v-row>

</template>

<script>
import "https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.js";
import {get} from "@/plugins/api";

export default {
  data() {
    return {
      instance_name: this.$route.params.name,
      tab: 'preview',
      panel: ['state', 'operate', 'relevance'],
      information: {},
      flvPlayer: null,
    }
  },
  methods: {
    loadInformation() {
      get(`/proxy/instance/${this.instance_name}/info`).then(info => {
        this.information = info.transform_get_basic_info.info;
      }).catch(err => {
      });
    }
  },
  created() {
    // api
    this.loadInformation();
  },
  mounted() {
    if (flvjs.isSupported()) {
      let videoElement = document.getElementById('videoElement');
      let flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://127.0.0.1:8080/live/default-instance.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      // flvPlayer.load();
      // flvPlayer.play();
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
  box-shadow: 15px 5px 10px rgba(0, 0, 0, 0.2);
}
</style>

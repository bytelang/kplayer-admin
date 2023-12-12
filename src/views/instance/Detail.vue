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
              <DetailPreview :instance_name="instance_name"/>
            </v-window-item>
            <v-window-item value="playlist">
              <DetailPlayList :instance_name="instance_name"/>
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
        <video id="videoElement" controls></video>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import "https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.js";
import {get, post} from "@/plugins/api";
import DetailPlayList from "./DetailPlayList.vue";
import DetailPreview from "./DetailPreview.vue";
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      instance_name: this.$route.params.name,
      tab: 'preview',
      panel: ['state', 'operate', 'relevance'],
      flvPlayer: null,
    }
  },
  components: {
    DetailPreview,
    DetailPlayList,
  },
  methods: {
  },
  created() {
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
});
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

  padding-bottom: 2rem;
}
</style>

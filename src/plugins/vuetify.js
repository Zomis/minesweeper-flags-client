import Vue from "vue";
import Vuetify from "vuetify/lib";
import { ResizeObserver } from 'vue-resize'
import "vuetify/src/stylus/app.styl";
import 'vue-resize/dist/vue-resize.css'

Vue.use(Vuetify, {
  iconfont: "md"
});

Vue.component('resize-observer', ResizeObserver);

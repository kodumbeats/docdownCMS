import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

export default createStore({
  state: {
    markdown: "",
    html: ""
  },
  mutations: {
    saveMd(state, m) {
      state.markdown = m;
    },
    saveHtml(state, h) {
      state.html = h;
    }
  },
  actions: {
    saveMd(context: any, m: string) {
      context.commit("saveMd", m);
    },
    saveHtml(context: any, h: string) {
      context.commit("saveHtml", h);
    }
  },
  modules: {},
  plugins: [
    new VuexPersistence({
      key: "docdownCMS",
      storage: window.localStorage
    }).plugin
  ]
});

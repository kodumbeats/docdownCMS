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
      state.markdown = h;
    }
  },
  actions: {
    saveMd(context: any) {
      context.commit("saveMd");
    },
    saveHtml(context: any) {
      context.commit("saveHtml");
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

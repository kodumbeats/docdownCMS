import { createStore } from "vuex";

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
  modules: {}
});

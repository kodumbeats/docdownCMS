import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

export default createStore({
  state: {
    markdown: "",
    html: "",
    saved: "",
    revisions: [] as any
  },
  getters: {
    getRevisions(state) {
      return state.revisions;
    }
  },
  mutations: {
    saveRevision(state, r: string) {
      state.revisions.push(r);
    },
    saveMd(state, m: string) {
      state.markdown = m;
    },
    saveHtml(state, h: string) {
      state.html = h;
    },
    saveDoc(state, m: string) {
      state.saved = m;
    }
  },
  actions: {
    saveRevision(context: any, r: string) {
      context.commit("saveRevision", r);
    },
    saveMd(context: any, m: string) {
      context.commit("saveMd", m);
    },
    saveHtml(context: any, h: string) {
      context.commit("saveHtml", h);
    },
    saveDoc(context: any, m: string) {
      context.commit("saveDoc", m);
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

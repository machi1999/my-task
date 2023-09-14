import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// localStorageに保存したリストを取得
const savedLists = localStorage.getItem("trello-lists");
const store = new Vuex.Store({
  state: {
    lists: savedLists
      ? JSON.parse(savedLists)
      : [
          {
            title: "Backlog",
            cards: [{ body: "English" }, { body: "Mathematics" }],
          },
          {
            title: "Todo",
            cards: [{ body: "Science" }],
          },
          {
            title: "Doing",
            cards: [],
          },
        ],
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards: [] });
    },
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1);
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body });
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1);
    },
    updateList(state, payload) {
      state.lists = payload.lists;
    },
    // edit
    // updateListTitle(state, payload) {
    //   state.lists[payload.listIndex].title = payload.newTitle;
    // },
    updateListTitle(state, payload) {
      state.lists[payload.listIndex].title = payload.newTitle;
    },
  },
  actions: {
    addlist(context, payload) {
      context.commit("addlist", payload);
    },
    removelist(context, payload) {
      context.commit("removelist", payload);
    },
    addCardToList(context, payload) {
      context.commit("addCardToList", payload);
    },
    removeCardFromList(context, payload) {
      context.commit("removeCardFromList", payload);
    },
    // updateList(context, payload) {
    //   context.commit("updateList", payload);
    // },
    updateListTitle(context, payload) {
      context.commit("updateListTitle", payload);
    },
  },

  getters: {
    totalCardCount(state) {
      let count = 0;
      state.lists.map((content) => (count += content.cards.length));
      return count;
    },
  },
});


store.subscribe((mutation, state) => {
  // データの状態の更新後にlocalStorageにデータの状態を保存
  localStorage.setItem("trello-lists", JSON.stringify(state.lists));
});

export default store;

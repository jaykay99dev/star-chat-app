import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: null,
    // { username: string }: User
    user: null,
    // { sid: User }
    usersMap: {},
    /*
    ChatMessage
    {
      key: uuid
      type: string
      data: { username?: string, message: string }
    }
    */
    // ChatMessage[]
    chatMessages: [],
  },
  getters: {
    // User[]
    users: (state) => {
      return Object.values(state.usersMap);
    },
  },
  mutations: {
    setSocket: (state, socket) => {
      state.socket = socket;
    },
    pushUser: (state, [sid, user]) => {
      Vue.set(state.usersMap, sid, user);
    },
    deleteUser: (state, sid) => {
      Vue.delete(state.usersMap, sid);
    },
    saveUsers: (state, usersMap) => {
      delete usersMap[state.socket.id];
      state.usersMap = usersMap;
    },
    saveUser: (state, user) => {
      state.user = user;
    },

    pushMessage: (state, chatMessage) => {
      state.chatMessages.push(chatMessage);
    },
  },
  actions: {},
});

import { ActionTree, GetterTree, MutationTree } from '@/index';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/*
 * State
 */

export interface IState {
  date: Date;
}

const state: IState = {
  date: new Date()
};

/*
 * Getters
 */

interface IGetters {
  time: number;
}

const getters: GetterTree<IGetters, IState> = {
  time: state => state.date.getTime()
};

/*
 * Mutations
 */

interface IMutations {
  setDate: (payload: Date) => void;
}

const mutations: MutationTree<IMutations, IState> = {
  setDate: (state, payload) => {
    state.date = payload;
  }
};

/*
 * Actions
 */

interface IActions {
  set: (payload: Date) => void;
  diff: (payload: Date) => number;
}

// Notice that it is annotated according to the type declared by the interface.
const actions: ActionTree<IActions, IState, IGetters, IMutations> = {
  set: async ({ commit }, payload) => {
    commit('setDate', payload);
  },
  diff: async ({ getters }, payload) => {
    return getters.time - payload.getTime();
  }
};

/*
 * Export
 */

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

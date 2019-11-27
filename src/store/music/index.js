import state from './state.js'
import mutations from './mutation.js'
import getters from './getter.js'
import actions from './action.js'

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

/* 注意这里的对象名称需要加s,仅state不需要 */
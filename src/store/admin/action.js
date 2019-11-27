import axios from 'axios'
import { adminUrl } from "@/views/admin/url";
export default {
    // bk-mothods
    getzymData({ commit }) {
        axios.get(`${adminUrl}/bk/getZym`).then(res => {
            if (res.data.ok) {
                commit('setzymData', res.data.data)
            }
        })
    },
    getjsbData({ commit }) {
        axios.get(`${adminUrl}/bk/getJsb`).then(res => {
            if (res.data.ok) {
                commit('setJsbData', res.data.data)
            }
        })
    },
    getqdData({ commit }) {
        axios.get(`${adminUrl}/bk/getqd`).then(res => {
            if (res.data.ok) {
                commit('setqdData', res.data.data)
            }
        })
    },



    // ss-mothods
    getSsData({ commit }) {
        axios.get(`${adminUrl}/ss/getSs`).then(res => {
            if (res.data.ok) {
                commit('setSsData', res.data.data)
            }
        })
    },

    // rz-mothods    
    getRzData({ commit }) {
        axios.get(`${adminUrl}/rz/getRz`).then(res => {
            if (res.data.ok) {
                commit('setRzData', res.data.data)
            }
        })
    },

    // xc-methods

    getXcData({ commit }) {
        axios.get(`${adminUrl}/xc/getXc`).then(res => {
            if (res.data.ok) {
                commit('setXcData', res.data.data)
            }
        })
    },

    //sp-methods
    getSpData({ commit }) {
        axios.get(`${adminUrl}/sp/getSp`).then(res => {
            if (res.data.ok) {
                commit('setSpData', res.data.data)
            }
        })
    },

    //grzl-methods
    getGrzlData({ commit }) {
        axios.get(`${adminUrl}/zl/getzl`).then(res => {
            if (res.data.ok) {
                commit('setGrzlData', res.data.data)
            }
        })
    },
    getJnsData({ commit }) {
        axios.get(`${adminUrl}/zl/getJns`).then(res => {
            if (res.data.ok) {
                commit('setJnsData', res.data.data)
            }
        })
    },
    getGzjyData({ commit }) {
        axios.get(`${adminUrl}/zl/getGzjy`).then(res => {
            if (res.data.ok) {
                commit('setGzjyData', res.data.data)
            }
        })
    },
    getXmjyData({ commit }) {
        axios.get(`${adminUrl}/zl/getxmjy`).then(res => {
            if (res.data.ok) {
                commit('setXmjyData', res.data.data)
            }
        })
    },

    // skill-methods
    getSkillData({ commit }, data) {
        axios.get(`${adminUrl}/skill/getskilldata`, {
            params: data
        }).then(res => {
            if (res.data.ok) {
                commit('setSkillData', res.data.data)
            }
        })
    }

}
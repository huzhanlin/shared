export default {
    nextSings(state) {  // 音乐播放器下一首歌曲的方法
        let listLength = state.singList.length;
        let length = state.childLength
        if (listLength > 1) {
            if (length === listLength - 1) {
                state.childLength = 0
            } else {
                state.childLength++
            }
        }
    },

    preSings(state) {// 音乐播放器上一首歌曲的方法
        let listLength = state.singList.length;
        let length = state.childLength
        if (listLength > 0) {
            if (length === 0) {
                state.childLength = listLength - 1
            } else {
                state.childLength--
            }
        }
    },

    addSingList(state, data) {// 添加音乐到音乐播放器列表上
        let oldListData = state.singList;

        for (let i = 0; i < oldListData.length; i++) {

            if (data[0].url === oldListData[i][0].url) {
                oldListData.splice(i, 1)
            }

        }
        state.singList.unshift(data)
    },

    addSingData(state, data) {  // 添加音乐到数据列表上
        let oldListData = state.singData;
        let init = false;
        for (let i = 0; i < oldListData.length; i++) {
            if (data.id === oldListData[i].id) {
                init = true
            }
        }
        if (!init) {
            state.singData.unshift(data)
        }
    },


    palyedToggle(state, data) { // 修改音频控制器的播放状态
        state.palyed = data
    },


    setType(state, data) { // 设置播放模式
        state.type = data
    },


    setChildLength(state, data) { // 设置列表的下标
        state.childLength = data
    },


    setPlayingImg(state, data) { // 设置正在播放的歌曲图片
        state.playingImg = data
    },

    initSessionMusicData(state) {
        let data = JSON.parse(localStorage.getItem('musicListData'));
        if (data && data.length) {
            state.sessionMusicData = data
        }
    },


    clearSingData(state) {
        // 清除音乐播放器的数据
        state.singData = [];
        state.singList = [];
        state.childLength = 0;
        state.playingImg = ""
    },

    clearSessionMusicData(state) {
        localStorage.setItem("musicListData", JSON.stringify([]));
        state.singData = [];
        state.singList = [];
        state.childLength = 0;
        state.playingImg = ""
        state.sessionMusicData = [];
    },



    setSearchHotData(state, data) {
        //设置热搜词的方法
        state.searchHotData = data
    },


    setNewUserListData(state, data) {
        // 设置收藏的数据列表为全局状态
        state.newUserListData = data
    }

}
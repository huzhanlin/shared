export default {
    playIngData(state) {
        let list = state.singList;
        let index = state.childLength;
        return list[index] || {}
    },

    historyListData(state) {        
        let singData = state.singData[0];
        let sessionMusicData = state.sessionMusicData;
        if (singData) {
            for (let i = 0; i < sessionMusicData.length; i++) {
                if (sessionMusicData[i].id === singData.id) {
                    return sessionMusicData
                }
            }
            sessionMusicData.unshift(singData);
            localStorage.setItem("musicListData", JSON.stringify(sessionMusicData));
            
            
            return sessionMusicData;
        } else {
            return sessionMusicData;
        }
    }
}
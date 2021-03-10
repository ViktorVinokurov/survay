import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        overlay: false,
        snackbar: {
            flag: false,
            color: '',
            text: '',
        },
        survay: []
    },
    getters: {
        get: state => state,
        survay:state => state.survay
    },
    mutations: {
        set(state, payload) {
            state[payload.prop] = payload.value
        },
        setSurvay(state, payload){
            state.survay.push(payload)
        },
        editSurvay(state, payload){
            Object.assign(state.survay[payload.index], payload.item)
        },
        delSurvay(state, payload){
            state.survay.splice(payload.index, 1)
        }
    },
    actions: {
        set({commit}, payload) {
            commit('set', payload)
        },
        async setSurvay({commit}, payload) {
            await commit('setSurvay', payload)
            await commit('set', {prop: 'overlay', value: true})
            let response = await fetch(`http://localhost:8080/survayAPI/Survay?func=setSurvay&dataSurvay=${JSON.stringify(payload)}`)
            try {
                await commit('set', {prop: 'overlay', value: false})
                if (response.status === 200) {
                    commit('set', {
                        prop: 'snackbar', value: {
                            flag: true,
                            color: 'success',
                            text: 'данные успешно записаны'
                        }
                    })
                    let json = await response.json()
                    return json
                }
            } catch (e) {
                console.log(e);
                await commit('set', {prop: 'overlay', value: false})
            }
        },
        async editSurvay({commit}, payload){
            await commit('editSurvay', payload)
            await commit('set', {prop: 'overlay', value: true})
            let response = await fetch(`http://localhost:8080/survayAPI/Survay?func=editSurvay&dataSurvay=${JSON.stringify(payload)}`)
            try {
                await commit('set', {prop: 'overlay', value: false})
                if (response.status === 200) {
                    commit('set', {
                        prop: 'snackbar', value: {
                            flag: true,
                            color: 'success',
                            text: 'данные успешно обновлены'
                        }
                    })
                    let json = await response.json()
                    return json
                }
            } catch (e) {
                console.log(e);
                await commit('set', {prop: 'overlay', value: false})
            }
        },
        async delSurvay({commit}, payload){
            await commit('delSurvay', payload)
            await commit('set', {prop: 'overlay', value: true})
            let response = await fetch(`http://localhost:8080/survayAPI/Survay?func=delSurvay&id=${payload.index}`)
            try {
                await commit('set', {prop: 'overlay', value: false})
                if (response.status === 200) {
                    commit('set', {
                        prop: 'snackbar', value: {
                            flag: true,
                            color: 'success',
                            text: 'данные успешно удалены'
                        }
                    })
                    let json = await response.json()
                    return json
                }
            } catch (e) {
                console.log(e);
                await commit('set', {prop: 'overlay', value: false})
            }
        },
    },
    modules: {}
})

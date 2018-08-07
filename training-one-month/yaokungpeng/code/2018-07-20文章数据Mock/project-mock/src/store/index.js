import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex); 

const state =  {
    allPages: {
        userid01:[ {
            'avatar':'', 
            'title':'', 
            'author':'', 
            'date':'', 
            'content':''
            }
        ]
    }
}

const getters =  {
    getAllPages(state) {return state.allPages}
}


const actions =  {
    reqAllPages( {state, commit}) {
        axios.get('/api/pages').then((rec) =>  {
            console.log(rec.data); 
            commit('recAllPages', rec.data); 
        }); 
    }
}


const mutations =  {
    recAllPages(state, params) {        
        state.allPages = JSON.parse(JSON.stringify(params)); 
    }
}


export default new Vuex.Store( {
    state, 
    getters, 
    actions, 
    mutations
})
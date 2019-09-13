import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ITrackRecord } from "./interfaces"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tracks: [] as ITrackRecord[]
	},
	mutations: {
		UPDATE_DATA(state, payload: { tracks: ITrackRecord[] })
		{
			state.tracks = payload.tracks
			console.log(payload.tracks.slice(0, 10))
		}
	},
	actions: {
		async LOAD_DATA()
		{
			let res = await axios('/all.json')
			let data = res.data as ITrackRecord[]
			data.sort((a,b) => a.id - b.id)
			data.forEach(x => x.path = `https://ib17.hip-hop.ru${x.path}`)
			this.commit('UPDATE_DATA', { tracks: data })
		}
	}
})

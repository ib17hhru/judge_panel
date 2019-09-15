import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ITrackRecord } from "./interfaces"

Vue.use(Vuex)

export interface ITrackRating
{
	id: number

	score: number
	comment: string

	score552?: string
}

export default new Vuex.Store({
	state: {
		inited: false,
		tracks: [] as ITrackRecord[],
		trackObj: {} as { [key: number]: ITrackRecord },
		judging: {
			currentTrackId: NaN,
			ratings: [] as ITrackRating[],
			notRatedIds: [] as number[],
		}
	},
	mutations: {
		SET_INITED(state, { inited }: { inited: boolean })
		{
			state.inited = inited
		},
		UPDATE_DATA(state, payload: { tracks: ITrackRecord[] })
		{
			state.tracks = payload.tracks
			state.trackObj = payload.tracks.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), { } as typeof state.trackObj)
			console.log(payload.tracks.slice(0, 10))
		},
		JUDGE_SET_CURRENT_TRACK(state, { id }: { id: number })
		{
			state.judging.currentTrackId = id
		},
		JUDGE_CLEAR_CURRENT_TRACK(state)
		{
			state.judging.currentTrackId = NaN
		},
		JUDGE_SET_RATINGS(state, { ratings }: { ratings: ITrackRating[] })
		{
			state.judging.ratings = ratings
		},
		JUDGE_ADD_RATING(state, { rating }: { rating: ITrackRating })
		{
			state.judging.ratings.push(rating)
		},
		JUDGE_SELECT_NEW_TRACK({ judging }, { idx }: { idx: number })
		{
			let oldTrackId = judging.currentTrackId
			let [newTrackId] = judging.notRatedIds.splice(idx, 1)
			if (!isNaN(oldTrackId))
				judging.notRatedIds.push(oldTrackId)
			
			judging.currentTrackId = newTrackId
		},
		JUDGE_POPULATE_NOT_RATED(state)
		{
			let knownTrackIds = [
				...state.judging.ratings.map(x => x.id),
				...(isNaN(state.judging.currentTrackId) ? [] : [state.judging.currentTrackId]),
				...state.judging.notRatedIds
			]
			let newTracks = state.tracks.filter(x => !knownTrackIds.includes(x.id))
			state.judging.notRatedIds.push(...newTracks.map(x => x.id))
		},
	},
	actions: {
		STORAGE_LOAD_JUDGE()
		{
			const J_SAVE = { cur: null as null | number, ratings: [] as ITrackRating[] }
			let ju = JSON.parse(localStorage.getItem('judge') || JSON.stringify(J_SAVE)) as typeof J_SAVE
			let cur = (typeof ju.cur === "number") ? ju.cur : NaN
			this.commit('JUDGE_SET_CURRENT_TRACK', { id: cur })
			this.commit('JUDGE_SET_RATINGS', { ratings: ju.ratings })
		},
		STORAGE_SAVE_JUDGE()
		{
			let data = {
				cur: this.state.judging.currentTrackId,
				ratings: this.state.judging.ratings,
				v: '0.1',
			}
			localStorage.setItem('judge', JSON.stringify(data))
		},
		async INIT()
		{
			await this.dispatch('LOAD_DATA')
			await this.dispatch('STORAGE_LOAD_JUDGE')
			this.commit('JUDGE_POPULATE_NOT_RATED')
			this.commit('SET_INITED', { inited: true })
		},
		async LOAD_DATA()
		{
			let res = await axios('/all.json')
			let data = res.data as ITrackRecord[]
			data.sort((a,b) => a.id - b.id)
			data.forEach(x => x.path = `https://ib17.hip-hop.ru${x.path}`)
			this.commit('UPDATE_DATA', { tracks: data })
		},
		async JUDGE_INIT()
		{
			if (isNaN(this.state.judging.currentTrackId))
				await this.dispatch('JUDGE_SELECT_NEW_TRACK')
		},
		async JUDGE_SELECT_NEW_TRACK()
		{
			if (!this.state.judging.notRatedIds.length)
				return
			
			let idx = Math.floor(Math.random() * this.state.judging.notRatedIds.length)
			this.commit('JUDGE_SELECT_NEW_TRACK', { idx })
			this.dispatch('STORAGE_SAVE_JUDGE')
			await Promise.resolve()
		},
		async JUDGE_SKIP_TRACK()
		{
			await this.dispatch('JUDGE_SELECT_NEW_TRACK')
		},
		async JUDGE_RATE_CURRENT_TRACK(store, payload: { score: number, comment: string })
		{
			this.commit('JUDGE_ADD_RATING', { rating: { id: this.state.judging.currentTrackId, ...payload } })
			this.commit('JUDGE_CLEAR_CURRENT_TRACK')
			this.dispatch('JUDGE_SELECT_NEW_TRACK')
			await Promise.resolve()
		}
	}
})

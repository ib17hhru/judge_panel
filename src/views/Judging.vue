<template>
	<div class="judging">
		<div class="hero">
			<div class="hero-body">
				<h1 class="title">Оценка треков</h1>
			</div>
		</div>
		<div v-if="!loaded">Загружаем панель судьи...</div>
		<div
			v-else
			class="columns is-centered"
		>
			<div
				v-if="!currentTrack"
				class="column"
			>
				Больше нет доступных для судейства треков
			</div>
			<div
				v-else
				class="column columns"
			>
				<div class="column is-8">
					<single-audio
						class="small-audio"
						:src="currentTrack.path"
					/>
					<!-- Текущий трек: {{ JSON.stringify(currentTrack) }} -->
				</div>
				<div class="column">
					hello
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SingleAudio from "../components/SingleAudio.vue"
import { ITrackRecord } from '../interfaces'
import store from '../store'

export default Vue.extend({
	data()
	{
		return {
			loaded: false
		}
	},
	async mounted()
	{
		await store.dispatch('JUDGE_INIT')
		this.loaded = true
	},
	computed: {
		currentTrack(): ITrackRecord | null
		{
			let id = store.state.judging.currentTrackId
			return isNaN(id) ? null : store.state.trackObj[id]
		}
	},
	components: {
		SingleAudio,
	}
})
</script>

<style lang="less" scoped>
.small-audio {
	height: 2rem;
	width: 100%;
}
</style>

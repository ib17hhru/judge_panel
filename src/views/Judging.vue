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
		>
			<div
				v-if="!currentTrack"
				class="columns"
			>
				<div class="columns is-centered">
					Больше нет доступных для судейства треков
				</div>
			</div>
			<div
				v-else
				class="columns is-centered"
			>
				<div class="column is-8">
					<single-audio
						class="small-audio"
						:src="currentTrack.path"
					/>
					<!-- Текущий трек: {{ JSON.stringify(currentTrack) }} -->
				</div>
				<div class="column">
					<div class="score">
						<span :class="getStarClass(1)" @click.stop="onStarClick(1)">
							<span :class="getStarClass(2)" @click.stop="onStarClick(2)">
								<span :class="getStarClass(3)" @click.stop="onStarClick(3)">
									<span :class="getStarClass(4)" @click.stop="onStarClick(4)">
										<span :class="getStarClass(5)" @click.stop="onStarClick(5)"/>
									</span>
								</span>
							</span>
						</span>
					</div>
					<div class="columns">
						<div class="column">
							<button class="button is-link">Оценить</button>
						</div>
						<div class="column">
							<button class="button is-light">Пропустить</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import SingleAudio from '../components/SingleAudio.vue'
import { ITrackRecord } from '../interfaces'
import store from '../store'

export default Vue.extend({
	data()
	{
		return {
			loaded: false,
			score: 0,
			comment: '',
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
	methods: {
		onStarClick(idx: number)
		{
			this.score = idx
		},
		getStarClass(idx: number)
		{
			return {
				star: true,
				'is-size-1': true,
				selected: (idx <= this.score),
			}
		},
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
button.button {
	width: 90%;
}
div.score {
	margin-bottom: 40px;
}
.empty-star {
	&:before {
		content: '☆'
	}
}
.full-star {
	&:before {
		content: '★';
	}
}
span.star {
	.empty-star;
	color: rgb(199, 186, 0);
	&.selected {
		.full-star;
	}
	&:hover {
		.full-star;
		color: rgba(199, 186, 0, 0.5);
		cursor: pointer;
	}
}
</style>

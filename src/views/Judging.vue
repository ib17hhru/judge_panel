<template>
	<div class="judging container is-fullwidth">
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
				v-if="!hasTrack"
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
				<div class="column is-8 left-column">
					<single-audio
						v-if="currentTrack"
						class="small-audio"
						:src="currentTrack.path"
					/>
					<textarea
						name="comment" id="" cols="30" rows="10"
						class="textarea"
						v-model="comment"
					></textarea>
					<!-- Текущий трек: {{ JSON.stringify(currentTrack) }} -->
				</div>
				<div class="column">
					<div class="score is-size-1">
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
							<button
								class="button is-link"
								:disabled="submitting"
								@click="onSubmit"
							>Оценить</button>
						</div>
						<div class="column">
							<button
								class="button is-light"
								:disabled="submitting"
								@click="onSkip"
							>Пропустить</button>
						</div>
					</div>
					<div class="total-ratings">
						Всего оценено: <span class="total-rated">{{ratedCount}}</span> из {{totalCount}} треков.
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
			submitting: false,
		}
	},
	async mounted()
	{
		await store.dispatch('JUDGE_INIT')
		this.loaded = true
	},
	computed: {
		hasTrack(): boolean
		{
			let id = store.state.judging.currentTrackId
			return !isNaN(id)
		},
		currentTrack(): ITrackRecord | null
		{
			let id = store.state.judging.currentTrackId
			return isNaN(id) ? null : store.state.trackObj[id]
		},
		ratedCount(): number
		{
			return store.state.judging.ratings.length
		},
		totalCount(): number
		{
			return store.state.tracks.length
		},
	},
	methods: {
		resetForm()
		{
			this.score = 0
			this.comment = ''
		},
		async onSkip()
		{
			this.submitting = true
			await store.dispatch('JUDGE_SKIP_TRACK')
			this.resetForm()
			this.submitting = false
		},
		async onSubmit()
		{
			this.submitting = true
			await store.dispatch('JUDGE_RATE_CURRENT_TRACK', {
				score: this.score,
				comment: this.comment,
			})
			this.resetForm()
			this.submitting = false
		},
		onStarClick(idx: number)
		{
			this.score = idx
		},
		getStarClass(idx: number)
		{
			return {
				star: true,
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
@import "../assets/colors.less";

.left-column {
	margin-left: 2rem;
}
.small-audio {
	width: 100%;
}
button.button {
	width: 100%;
}
textarea {
	width: 100%;
}
div.score {
	text-align: center;
}
.total-rated {
	font-weight: bold;
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
	.star-yellow;
	// color: rgb(199, 186, 0);
	&.selected {
		.full-star;
	}
	&:hover {
		.full-star;
		.star-dark-yellow;
		// color: rgb(146, 136, 0);
		cursor: pointer;
	}
}
</style>

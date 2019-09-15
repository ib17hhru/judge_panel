<template>
	<div class="myratings container is-fullwidth">
		<div class="columns is-centered">
			<div
				v-if="!ratings.length"
				class="column is-half"
			>
				<p>Вы пока не оценили ни одного трека.</p>
				<p><router-link to="/judging">Перейти к судейству</router-link></p>
			</div>
			<div
				v-else
				class="column"
			>
				<table class="table is-fullwidth">
					<thead>
						<tr>
							<th class="id-trunc">ID</th>
							<th>Имя</th>
							<th>Оценка/комментарий</th>
							<th class="audio-trunc"></th>
							<!-- <th>Слушать</th> -->
						</tr>
					</thead>
					<tbody>
						<template
							v-for="rating in ratingsFull"
						>
							<tr
								:key="rating.id"
							>
								<td class="id-trunc">{{rating.id}}</td>
								<td class="name-trunc">
									<span class="rapper-name">{{rating.track.user.profile.name}}</span>
									<span class="rapper-username">({{rating.track.user.username}})</span>
								</td>
								<td class="comment-trunc">
									<span class="is-size-3 small-stars">{{starsStr(rating.score)}}</span><br/>
									{{rating.comment.split('\n').join(' ')}}
								</td>
								<td class="audio-trunc">
									&#x25b6;
									<!-- <single-audio
										class="small-audio"
										:src="rating.track.path"
									/> -->
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SingleAudio from '../components/SingleAudio.vue'
import store, { ITrackRating } from '../store'
import { ITrackRecord } from '../interfaces'

export default Vue.extend({
	data()
	{
		return {

		}
	},
	computed: {
		ratings(): ITrackRating[]
		{
			let ratings = store.state.judging.ratings
			if (ratings.length > 20)
				ratings = ratings.slice(ratings.length - 20)
			else
				ratings = ratings.slice()

			ratings.reverse()

			return ratings
		},
		ratingsFull(): (ITrackRating & { track: ITrackRecord })[]
		{
			return this.ratings.map(x => ({ ...x, track: store.state.trackObj[x.id] }))
		}
	},
	methods: {
		starsStr(score: number)
		{
			return '★'.repeat(score) + '☆'.repeat(5 - score)
		},
	},
	components: {
		SingleAudio
	}
})
</script>

<style lang="less" scoped>
@import "../assets/colors.less";

.small-stars {
	.star-yellow;
	line-height: 1rem;
}

.rapper-name {
	font-weight: bold;
}
.rapper-username {
	margin-left: 0.3rem;
	color: gray;
}
.audio-width {
	// min-width: 20rem;
}
.small-audio {
	height: 2rem;
	// width: 20rem;
}
.trunc {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.comment-trunc {
	.trunc;
	max-width: 40vw;
	width: 40vw;
}
.name-trunc {
	.trunc;
	max-width: 20vw;
	width: 20vw;
}
.id-trunc {
	.trunc;
	max-width: 5rem;
	width: 3rem;
}
.audio-trunc {
	max-width: 2rem;
	width: 2rem;
}
</style>

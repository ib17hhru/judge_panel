<template>
	<div class="home container is-fullwidth">
		<div v-if="!tracksLoaded">
			Loading tracks...
		</div>
		<div
			v-else
			class="columns is-centered"
		>
			<table class="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Никнейм</th>
						<th>Прослушать</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="track in tracks"
						:key="track.id"
					>
						<td>{{track.id}}</td>
						<td>
							<span class="rapper-name">{{track.user.profile.name}}</span>
							<span class="rapper-username">({{track.user.username}})</span>
						</td>
						<td>
							<single-audio
								class="small-audio"
								:src="track.path"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SingleAudio from '../components/SingleAudio.vue'
import { ITrackRecord } from '../interfaces'

export default Vue.extend({
	computed: {
		tracks(): ITrackRecord[]
		{
			return this.$store.state.tracks.slice(0, 10)
		},
		tracksLoaded(): boolean
		{
			return !!this.tracks.length
		}
	},
	components: {
		SingleAudio
	},
})
</script>

<style lang="less" scoped>
.rapper-name {
	font-weight: bold;
}
.rapper-username {
	margin-left: 0.3rem;
	color: gray;
}
.small-audio {
	height: 2rem;
}
</style>

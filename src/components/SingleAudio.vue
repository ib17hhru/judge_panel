<template>
	<audio
		controls
		:src="src"
		@play.capture="onAudioPlay"
	>
		Your browser does not support the
		<code>audio</code> element.
	</audio>
</template>

<script lang="ts">
import Vue from 'vue'
import { stopAllAudioExcept } from "../utils"

export default Vue.extend({
	props: {
		src: String
	},
	methods: {
		onAudioPlay(e: Event)
		{
			stopAllAudioExcept(e.target as HTMLAudioElement)
		}
	}
})
</script>

<template>
	<div v-if="!inited">
		Загрузка...
	</div>
	<div v-else id="app" class="container">
		<div id="nav">
			<router-link to="/">Список треков</router-link> |
			<router-link to="/judging">Судейство</router-link>
		</div>
		<router-view/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'bulma/css/bulma.css'

export default Vue.extend({
	data: function()
	{
		return { }
	},
	computed: {
		inited()
		{
			return this.$store.state.inited
		}
	},
	mounted()
	{
		this.$store.dispatch('INIT')
	}
})
</script>

<style lang="less">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// text-align: center;
	color: #2c3e50;
}
#nav {
	padding: 30px;
	text-align: center;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>

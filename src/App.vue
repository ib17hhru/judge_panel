<template>

	<div v-if="!inited">
		<h5 class="subtitle">
			Независимая судейская панель 17-го независимого батла hip-hop.ru
		</h5>
		Загрузка...
	</div>
	<div v-else id="app" class="container">
		<div id="nav">
			<h5 class="subtitle">
				Независимая судейская панель 17-го независимого батла hip-hop.ru
			</h5>
			<router-link to="/">Список треков</router-link> |
			<router-link to="/judging">Судейство</router-link> |
			<router-link to="/myratings">Мои оценки</router-link>
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
		color: #42b983;
		white-space: nowrap;
		&.router-link-exact-active {
			color: #2c3e50;
		}
	}
}
</style>

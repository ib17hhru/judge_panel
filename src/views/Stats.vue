<template>
	<div class="container">
		<div class="columns is-centered">
			<div class="column content is-three-quarters">
				<div class="hero">
					<div class="hero-body">
						<h1 class="title">Статистика</h1>
					</div>
				</div>
				<div>
					<h3 class="subtitle">Мои оценки:</h3>
					<table class="ratings-table is-size-2">
						<tr
							v-for="idx in [5,4,3,2,1]"
							:key="idx"
						>
							<td class="table-stars">{{'★'.repeat(idx)}}</td>
							<td class="table-count">
								<span class="light-gray">&times;</span>{{getRatingsCount(idx)}}
								<span class="is-size-6 dark-gray">({{percent(getRatingsPercent(idx))}})</span>
							</td>
						</tr>
					</table>
				</div>
				<div>
					Всего оценено: <span class="total-rated">{{ratedCount}}</span> из {{totalCount}} треков ({{percent(ratedPercent)}}).
				</div>
				<hr/>
				<p>По окончании судейства отборочного раунда здесь появится:</p>
				<ul>
					<li>Подробная статистика с графиками.</li>
					<li>Возможность сравнить свои оценки с оценками других судей.</li>
				</ul>
				<p>До конца судейства осталось:</p>
				<div>
					<!-- 
					<span class="clock-val">{{left.d}}</span>
					<span class="clock-name">дней</span>
					<span class="clock-val">{{left.h}}</span>
					<span class="clock-name">часов</span>
					<span class="clock-val">{{left.m}}</span>
					<span class="clock-name">минут</span>
					<span class="clock-val">{{left.s}}</span>
					<span class="clock-name">секунд</span>
					 -->
					<h5 class="clock-name subtitle is-5">пока неизвестно, следим за новостями от организаторов</h5>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { appendZeroes } from '../utils'
import store from '../store'

export default Vue.extend({
	computed: {
		left(): { d: string, h: string, m: string, s: string}
		{
			return {
				d: appendZeroes(1, 2),
				h: appendZeroes(2, 2),
				m: appendZeroes(3, 2),
				s: appendZeroes(4, 2),
			}
		},
		ratedCount(): number
		{
			return store.state.judging.ratings.length
		},
		totalCount(): number
		{
			return store.state.tracks.length
		},
		ratedPercent(): number
		{
			return this.ratedCount / this.totalCount
		},
	},
	methods: {
		percent(val: number, precision: number = 2, trim: boolean = true)
		{
			let p = (val * 100).toFixed(precision)
			if (trim)
				p = p.replace(/\.?0*$/, '')
			return p + '%'
		},
		getRatingsCount(score: number)
		{
			return store.state.judging.ratings.filter(x => x.score == score).length
		},
		getRatingsPercent(score: number)
		{
			let count = this.getRatingsCount(score)
			let total = this.ratedCount
			if (!total)
				return 0
			
			return count / total
		}
	},
})
</script>

<style lang="less" scoped>
.total-rated {
	font-weight: bold;
}
.clock-name {
	text-transform: uppercase;
}
.ratings-table {
	max-width: 30rem;
}
.narrow-td {
	padding: 0;
	border: none;
}
.table-stars {
	@import "../assets/colors.less";
	.star-yellow;
	.narrow-td;
	max-width: 5rem;
}
.table-count {
	.narrow-td;
	text-align: left;
}
.light-gray {
	color: rgba(0,0,0,0.25);
}
.dark-gray {
	color: rgba(0,0,0,0.5);
}
</style>

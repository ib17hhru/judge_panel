<template>
	<div class="container">
		<div class="hero">
			<div class="hero-body">
				<h1 class="title">Статистика</h1>
			</div>
		</div>
		<div class="columns is-centered">
			<div class="column content">
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
		}
	}
})
</script>

<style lang="less" scoped>
.clock-name {
	text-transform: uppercase;
}
</style>

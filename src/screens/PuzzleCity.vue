<template>
  <LevernoisGameView @done="onDone" />
</template>

<script setup lang="ts">
import { state, goNext } from '../store'
import LevernoisGameView from '../components/levernois/LevernoisGameView.vue'

const onDone = () => {
  state.success.city = true
  state.cityAnswer = 'Levernois'
  goNext('puzzle-city')
}
</script>


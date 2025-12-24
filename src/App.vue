<template>
  <main class="container">
    <Intro v-if="state.step==='intro'" />
    <PuzzleActivity v-else-if="state.step==='puzzle-activity'" />
    <PuzzleDate v-else-if="state.step==='puzzle-date'" />
    <PuzzleCity v-else-if="state.step==='puzzle-city'" />
    <FinalReveal v-else />
  </main>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { state } from './store'
import Intro from './screens/Intro.vue'
import PuzzleActivity from './screens/PuzzleActivity.vue'
import PuzzleDate from './screens/PuzzleDate.vue'
import PuzzleCity from './screens/PuzzleCity.vue'
import FinalReveal from './screens/FinalReveal.vue'

// Scroll to top when step changes
watch(() => state.step, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

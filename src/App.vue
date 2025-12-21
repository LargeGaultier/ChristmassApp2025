<template>
  <main class="container">
    <Intro v-if="state.step==='intro'" />
    <PuzzleActivity v-else-if="state.step==='puzzle-activity'" />
    <PuzzleDate v-else-if="state.step==='puzzle-date'" />
    <PuzzleCity v-else-if="state.step==='puzzle-city'" />
    <FinalPlace v-else-if="state.step==='final-place'" />
    <FinalReveal v-else />
  </main>
</template>

<script setup lang="ts">
import { state } from './store'
import Intro from './screens/Intro.vue'
import PuzzleActivity from './screens/PuzzleActivity.vue'
import PuzzleDate from './screens/PuzzleDate.vue'
import PuzzleCity from './screens/PuzzleCity.vue'
import FinalPlace from './screens/FinalPlace.vue'
import FinalReveal from './screens/FinalReveal.vue'
</script>

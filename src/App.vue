<template>
  <main class="container">
    <Transition name="page" mode="out-in">
      <component :is="currentComponent" :key="state.step" />
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { state } from './store'
import Intro from './screens/Intro.vue'
import PuzzleActivity from './screens/PuzzleActivity.vue'
import PuzzleDate from './screens/PuzzleDate.vue'
import PuzzleCity from './screens/PuzzleCity.vue'
import FinalReveal from './screens/FinalReveal.vue'

const currentComponent = computed(() => {
  const componentMap: Record<string, any> = {
    'intro': Intro,
    'puzzle-activity': PuzzleActivity,
    'puzzle-date': PuzzleDate,
    'puzzle-city': PuzzleCity,
    'final-reveal': FinalReveal
  }
  return componentMap[state.step] || FinalReveal
})

// Scroll to top when step changes
watch(() => state.step, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

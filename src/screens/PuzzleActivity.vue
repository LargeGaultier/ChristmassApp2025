<template>
  <div class="activity-container">
    <!-- Game phase -->
    <section class="card" v-if="!gameComplete">
      <div class="header">
        <div class="badge">Étape 1</div>
        <h2 class="title">Trouver les Paires</h2>
        <p class="subtitle">Retourne les cartes pour découvrir l'activité mystère !</p>
      </div>
      <MemoryGrid ref="memoryGrid" />
    </section>

    <!-- Reveal phase -->
    <ActivityReveal 
      v-else
      :activity-image="activityImage"
      :activity-text="activityText"
      :on-replay="resetGame"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import MemoryGrid from './Memory/MemoryGrid.vue'
import ActivityReveal from './Memory/ActivityReveal.vue'

const memoryGrid = ref<InstanceType<typeof MemoryGrid> | null>(null)
const activityImage = ref('/src/assets/PuzzleActivity-1.png')
const activityText = ref('🍽️ alors vous avez trouvé ?')
const gameComplete = ref(false)

const isGameCompleteComputed = computed(() => {
  return memoryGrid.value?.isGameComplete ?? false
})

// Watch for game completion
watch(isGameCompleteComputed, (newVal) => {
  if (newVal) {
    gameComplete.value = true
  }
})

const resetGame = () => {
  gameComplete.value = false
  memoryGrid.value = null
  setTimeout(() => {
    memoryGrid.value = null
  }, 0)
}
</script>

<style scoped>
.activity-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  padding: 16px 16px 0;
}

.title {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  margin: 8px 0 0 0;
}

.subtitle {
  color: #6b7280;
  margin: 8px 0 0 0;
  font-weight: 600;
  font-size: 14px;
}

.badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 6px 12px;
  background: white;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  font-weight: 700;
  font-size: 12px;
  color: #e63946;
}

.badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2a9d8f;
}
</style>

<style scoped>
.activity-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  padding: 16px 16px 0;
}

.title {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  margin: 8px 0 0 0;
}

.subtitle {
  color: #6b7280;
  margin: 8px 0 0 0;
  font-weight: 600;
  font-size: 14px;
}

.badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 6px 12px;
  background: white;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  font-weight: 700;
  font-size: 12px;
  color: #e63946;
}

.badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2a9d8f;
}
</style>

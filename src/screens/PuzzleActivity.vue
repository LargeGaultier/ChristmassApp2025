<template>
  <div class="activity-container">
    <ProgressBar current-step="puzzle-activity" />
    
    <!-- Game phase -->
    <section class="card" v-if="!gameComplete">
      <!-- Introduction section -->
      <div class="intro-section">
        <div class="intro-header">
          <h2 class="intro-title">Indice d'Éli</h2>
          <p class="intro-text">Éli a trouvé un indice, mais elle ne peut pas le donner toute seule.</p>
        </div>
        
        <p class="intro-description">Des cartes avec de drôles de personnages sont cachées sous le sapin.<br>Retrouve les paires pour découvrir l'activité.</p>
        
        <img :src="introImageSrc" alt="Indice" class="intro-image" />
      </div>

      <!-- Game header -->
      <div class="header">
        <div class="badge">Étape 1</div>
        <h2 class="title">Trouver les Paires</h2>
        <p class="subtitle">Retourne les cartes pour découvrir l'activité mystère !</p>
      </div>

      <!-- Memory grid -->
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
import MemoryGrid from '../components/memory/MemoryGrid.vue'
import ActivityReveal from '../components/memory/ActivityReveal.vue'
import ProgressBar from '../components/ProgressBar.vue'
import activityImageSrc from '../assets/PuzzleActivity-1.png'
import introImageSrc from '../assets/PuzzleActivity-Intro.png'

const memoryGrid = ref<InstanceType<typeof MemoryGrid> | null>(null)
const activityImage = ref(activityImageSrc)
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
  overflow-y: auto;
}

/* Intro section */
.intro-section {
  padding: 24px 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
  border-radius: 20px;
  margin: 16px 16px 0;
  border: 2px solid #fbbf24;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.15);
  position: relative;
  overflow: hidden;
}

.intro-section::before {
  content: '🎮';
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 80px;
  opacity: 0.1;
}

.intro-header {
  margin-bottom: 16px;
}

.intro-title {
  font-size: 28px;
  font-weight: 900;
  margin: 0;
  color: #b45309;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.intro-text {
  font-size: 15px;
  color: #92400e;
  margin: 8px 0 0 0;
  font-weight: 600;
}

.intro-description {
  font-size: 16px;
  color: #78350f;
  margin: 16px 0;
  line-height: 1.6;
  font-weight: 500;
}

.intro-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 12px;
  display: block;
}

/* Header section */
.header {
  padding: 16px 16px 12px;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

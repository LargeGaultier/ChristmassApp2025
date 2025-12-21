<template>
  <div class="city-container">
    <!-- Introduction section -->
    <div class="intro-section">
      <div class="intro-header">
        <h2 class="intro-title">Indice de Théa</h2>
        <p class="intro-text">Théa a compris où se cache le prochain indice.</p>
      </div>
      
      <p class="intro-description">Elle va vous poser plusieurs énigmes.<br>À chaque bonne réponse, une partie du nom de la ville apparaîtra.<br><br>Répondez correctement pour deviner la ville.</p>
      
      <img src="/src/assets/PuzzleCity-1.png" alt="Indice de Théa" class="intro-image" />
    </div>

    <!-- Game section -->
    <div class="game-section">
      <LevernoisGameView @done="onDone" />
    </div>
  </div>
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

<style scoped>
.city-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* Intro section */
.intro-section {
  padding: 20px 16px;
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
  border-radius: 16px;
  margin: 16px 16px 0;
}

.intro-header {
  margin-bottom: 12px;
}

.intro-title {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
  color: #be185d;
  line-height: 1.2;
}

.intro-text {
  font-size: 14px;
  color: #831843;
  margin: 8px 0 0 0;
  font-weight: 600;
}

.intro-description {
  font-size: 16px;
  color: #9d174d;
  margin: 12px 0;
  line-height: 1.5;
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

/* Game section */
.game-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>


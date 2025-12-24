<template>
  <div class="city-container">
    <ProgressBar current-step="puzzle-city" />
    
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
import ProgressBar from '../components/ProgressBar.vue'

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
  padding: 24px 20px;
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
  border-radius: 20px;
  margin: 16px 16px 0;
  border: 2px solid #ec4899;
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.15);
  position: relative;
  overflow: hidden;
}

.intro-section::before {
  content: '🗺️';
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
  color: #be185d;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.intro-text {
  font-size: 15px;
  color: #831843;
  margin: 8px 0 0 0;
  font-weight: 600;
}

.intro-description {
  font-size: 16px;
  color: #831843;
  margin: 16px 0;
  line-height: 1.6;
  font-weight: 500;
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


<template>
  <div class="date-container">
    <!-- Introduction section -->
    <div class="intro-section">
      <div class="intro-header">
        <h2 class="intro-title">Indice de Charlotte</h2>
        <p class="intro-text">Charlotte a trouvé un indice.</p>
      </div>
      
      <p class="intro-description">Elle a découvert de vieilles photos de famille, mais tout est mélangé.<br>Pour comprendre l'histoire, il faut les remettre dans le bon ordre.<br><br>Aidez Charlotte à reconstituer la chronologie pour révéler le prochain indice.</p>
      
      <img src="/src/assets/Puzzle-Date-1.png" alt="Photos de famille" class="intro-image" />
    </div>

    <!-- Chrono game -->
    <div class="game-section">
      <ChronoGameView />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChronoGameView from '../components/chrono/ChronoGameView.vue'
</script>

<style scoped>
.date-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* Intro section */
.intro-section {
  padding: 20px 16px;
  background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
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
  color: #0369a1;
  line-height: 1.2;
}

.intro-text {
  font-size: 14px;
  color: #0c4a6e;
  margin: 8px 0 0 0;
  font-weight: 600;
}

.intro-description {
  font-size: 16px;
  color: #164e63;
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

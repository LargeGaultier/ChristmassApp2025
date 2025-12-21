<template>
  <section class="card">
    <div class="header">
      <div class="badge"><span class="dot"></span> 🎄 L’enquête du cadeau de Noël</div>
      <h1 class="title">Le cadeau de Noël est prêt…mais il faut le deviner.
</h1>
      <p class="subtitle">
        Les détectives Éli, Charlotte et Théa ont préparé une série d’énigmes pour vous aider.
        <br>
        Chaque jeu vous rapproche de la réponse.</p>
    </div>
    <div class="section">
      <img class="image" alt="Illustration détective" :src="introBg" />
    </div>

    <!-- Enigma selector -->
    <div class="enigma-selector" v-if="false">
      <p class="selector-title">Choisissez votre mission :</p>
      <div class="enigma-grid">
        <button 
          v-for="enigma in enigmas" 
          :key="enigma.id"
          class="enigma-card"
          :class="{ active: selectedEnigma === enigma.id }"
          @click="selectedEnigma = enigma.id"
        >
          <div class="enigma-icon">{{ enigma.icon }}</div>
          <div class="enigma-name">{{ enigma.name }}</div>
          <div class="enigma-difficulty">{{ enigma.difficulty }}</div>
        </button>
      </div>
    </div>

    <div class="footer">
      <button class="primary-btn" @click="onStart">Commencer la mission</button>
      <p class="subtitle" style="text-align:center; margin-top:8px;">Joyeux Noël !</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { state, goNext } from '../store'
import introBg from '../assets/intro-detective.png'

interface Enigma {
  id: string
  name: string
  icon: string
  difficulty: string
}

const enigmas: Enigma[] = [
  { id: 'memory', name: 'Mémory', icon: '🎴', difficulty: 'Facile' },
  { id: 'chrono', name: 'Chronologie', icon: '⏰', difficulty: 'Moyen' },
  { id: 'city', name: 'Ville', icon: '🗺️', difficulty: 'Moyen' }
]

const selectedEnigma = ref('memory')

const onStart = () => { 
  state.success.intro = true
  state.selectedEnigma = selectedEnigma.value
  
  // Navigate to the selected enigma's screen
  switch(selectedEnigma.value) {
    case 'memory':
      state.step = 'puzzle-activity'
      break
    case 'chrono':
      state.step = 'puzzle-date'
      break
    case 'city':
      state.step = 'puzzle-city'
      break
    default:
      state.step = 'puzzle-activity'
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  padding: 24px 16px 16px;
}

.badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-weight: 700;
  font-size: 12px;
  color: #e63946;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2a9d8f;
  display: inline-block;
}

.title {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2;
  margin: 12px 0 0;
  color: #1f2d3d;
}

.subtitle {
  color: #6b7280;
  margin: 8px 0 0;
  font-weight: 600;
}

.section {
  flex: 0;
  padding: 16px;
}

.image {
  width: 100%;
  height: auto;
  max-width: 280px;
  margin: 0 auto;
  display: block;
  border-radius: 12px;
}

.enigma-selector {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

.selector-title {
  font-weight: 700;
  color: #1f2d3d;
  font-size: 14px;
  margin: 0;
  text-align: center;
}

.enigma-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.enigma-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.enigma-card:active {
  transform: scale(0.98);
}

.enigma-card.active {
  border-color: #e63946;
  background: #fff9f7;
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
}

.enigma-icon {
  font-size: 32px;
}

.enigma-name {
  font-weight: 700;
  color: #1f2d3d;
  font-size: 14px;
  text-align: center;
}

.enigma-difficulty {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
}

.footer {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  border-radius: 999px;
  border: none;
  background: #e63946;
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.primary-btn:hover {
  background: #d62828;
  transform: translateY(-2px);
}

.primary-btn:active {
  transform: translateY(0);
}
</style>

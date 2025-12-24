<template>
  <section class="card">
    <div class="header">
      <div class="header-bg">
        <div class="snowflakes">❄️</div>
        <div class="snowflakes">❄️</div>
        <div class="snowflakes">❄️</div>
      </div>
      
      <div class="header-content">
        <div class="badge">
          <span class="dot"></span>
          <span>🎄 L'enquête du cadeau de Noël</span>
        </div>
        
        <h1 class="title">
          <span class="title-line">Le cadeau de Noël</span>
          <span class="title-line">est prêt…</span>
          <span class="title-emphasis">mais il faut le deviner !</span>
        </h1>
        
        <p class="subtitle">
          🕵️ Les détectives <strong>Éli, Charlotte et Théa</strong> ont préparé une série d'énigmes pour vous aider.
        </p>
        
        <div class="hint-box">
          <div class="hint-icon">💡</div>
          <p class="hint-text">Chaque jeu vous rapproche de la réponse</p>
        </div>
      </div>
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
      <p class="christmas-greeting">🎄 Joyeux Noël ! 🎄</p>
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
  position: relative;
  padding: 0;
  overflow: hidden;
}

.header-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #e63946 0%, #d62828 50%, #c1121f 100%);
  z-index: 0;
}

.header-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
}

.snowflakes {
  position: absolute;
  font-size: 24px;
  animation: fall linear infinite;
  opacity: 0.6;
  z-index: 1;
}

.snowflakes:nth-child(1) {
  left: 20%;
  animation-duration: 8s;
  animation-delay: 0s;
}

.snowflakes:nth-child(2) {
  left: 50%;
  animation-duration: 10s;
  animation-delay: 2s;
}

.snowflakes:nth-child(3) {
  left: 80%;
  animation-duration: 12s;
  animation-delay: 4s;
}

@keyframes fall {
  0% {
    top: -10%;
    transform: translateX(0) rotate(0deg);
  }
  100% {
    top: 110%;
    transform: translateX(20px) rotate(360deg);
  }
}

.header-content {
  position: relative;
  z-index: 2;
  padding: 32px 20px 40px;
}

.badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 700;
  font-size: 13px;
  color: #e63946;
  backdrop-filter: blur(10px);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2a9d8f;
  display: inline-block;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

.title {
  font-size: 36px;
  font-weight: 900;
  line-height: 1.1;
  margin: 24px 0 0;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-line {
  display: block;
}

.title-emphasis {
  display: block;
  color: #fbbf24;
  font-size: 38px;
  margin-top: 8px;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(251, 191, 36, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  50% {
    text-shadow: 0 0 20px rgba(251, 191, 36, 0.8), 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

.subtitle {
  color: rgba(255, 255, 255, 0.95);
  margin: 20px 0 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.subtitle strong {
  color: #fbbf24;
  font-weight: 800;
}

.hint-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.hint-icon {
  font-size: 28px;
  animation: bounce-hint 2s ease-in-out infinite;
}

@keyframes bounce-hint {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.hint-text {
  margin: 0;
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
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

.christmas-greeting {
  text-align: center;
  margin: 12px 0 0;
  font-size: 20px;
  font-weight: 800;
  color: #16a34a;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
</style>

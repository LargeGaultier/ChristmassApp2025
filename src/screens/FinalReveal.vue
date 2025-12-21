<template>
  <section class="card">
    <div class="header">
      <div class="badge">Mission Complète</div>
      <h2 class="title">🎉 Bravo les Détectives !</h2>
      <p class="subtitle">Vous avez résolu tous les mystères. Le Père Noël est très fier de vous.</p>
      <img class="image" alt="Célébration" :src="revealImg" />
    </div>

    <div class="results-section">
      <div class="result-item">
        <span class="result-label">📅 LA DATE</span>
        <strong class="result-value">25/05/2026</strong>
      </div>
      <div class="result-item">
        <span class="result-label">🍽️ LE RESTAURANT</span>
        <strong class="result-value">La Table de Levernois</strong>
      </div>
    </div>

    <div class="footer">
      <button class="primary-btn" @click="restart">Rejouer la Mission</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { state } from '../store'
import revealImg from '../assets/FinalReveal-1.png'

function restart() {
  state.step = 'intro'
  state.success = { intro: false, activity: false, date: false, city: false }
  state.dateAnswer = undefined
  state.cityAnswer = undefined
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 16px;
}

.header {
  margin-bottom: 24px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  color: white;
  margin-bottom: 12px;
}

.title {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2;
  margin: 12px 0 8px 0;
  color: #1f2d3d;
}

.subtitle {
  color: #6b7280;
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
}

.image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 16px;
  margin-top: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.results-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0;
  border-top: 2px solid #e5e7eb;
  border-bottom: 2px solid #e5e7eb;
  margin: 20px 0;
}

.result-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);
  border-radius: 12px;
  border-left: 4px solid #e63946;
}

.result-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
}

.result-value {
  font-size: 20px;
  font-weight: 800;
  color: #1f2d3d;
}

.footer {
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

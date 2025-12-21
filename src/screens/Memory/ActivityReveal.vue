<template>
  <section class="card">
    <div class="header">
      <h2 class="title">🎉 Activité Révélée !</h2>
      <p class="subtitle">Bravo d'avoir trouvé toutes les paires !</p>
    </div>
    
    <div class="reveal-section">
      <img :src="activityImage" :alt="activityText" class="activity-image" />
      <p class="activity-text">{{ activityText }}</p>
    </div>

    <div class="footer">
      <button class="primary-btn" @click="onContinue">Continuer vers la Date →</button>
      <button class="secondary-btn" @click="onRestart">Rejouer le Memory</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { state, goNext } from '../../store'

interface Props {
  activityImage: string
  activityText: string
  onReplay?: () => void
}

const props = defineProps<Props>()

const onContinue = () => {
  state.success.activity = true
  state.activityAnswer = 'restaurant'
  goNext('puzzle-activity')
}

const onRestart = () => {
  if (props.onReplay) {
    props.onReplay()
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

.title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
  color: #1f2d3d;
}

.subtitle {
  color: #6b7280;
  margin-top: 8px;
  font-weight: 600;
}

.reveal-section {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.activity-image {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.activity-text {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: #1f2d3d;
  margin: 0;
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

.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #1f2d3d;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-btn:hover {
  border-color: #e63946;
  background: #fff9f7;
}
</style>

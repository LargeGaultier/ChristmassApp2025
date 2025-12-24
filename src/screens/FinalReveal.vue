<template>
  <section class="card">
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
    
    <div class="header">
      <div class="badge">Mission Complète</div>
      <h2 class="title">🎉 Bravo les Détectives !</h2>
      <p class="subtitle">Vous avez résolu tous les mystères. Le Père Noël est très fier de vous.</p>
      <img class="image" alt="Célébration" :src="revealImg" />
    </div>

    <div class="results-section">
      <div class="invitation-card">
        <div class="invitation-header">
          <div class="stars">✨ ⭐ ✨</div>
          <p class="invitation-from">Anaïs, Charlotte et Gaultier</p>
          <p class="invitation-verb">vous invitent à</p>
        </div>
        
        <div class="invitation-main">
          <div class="restaurant-name">La Table de Levernois</div>
          <p class="invitation-description">
            Pour un repas gastronomique en famille
          </p>
        </div>

        <div class="invitation-footer">
          <div class="christmas-wish">🎄 Joyeux Noël 🎄</div>
        </div>
      </div>

      <div class="result-item date-item">
        <span class="result-label">📅 LA DATE</span>
        <strong class="result-value">25/04/2026</strong>
      </div>
    </div>

    <div class="footer">
      <button class="primary-btn" @click="restart">Rejouer la Mission</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { state } from '../store'
import revealImg from '../assets/FinalReveal-1.png'

const confettiCanvas = ref<HTMLCanvasElement | null>(null)

interface Confetti {
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
}

let animationId: number | null = null
const confettis: Confetti[] = []

const colors = ['#e63946', '#f59e0b', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']

function createConfetti(): Confetti {
  return {
    x: Math.random() * window.innerWidth,
    y: -10,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedX: (Math.random() - 0.5) * 2,
    speedY: Math.random() * 2 + 1,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10
  }
}

function animateConfetti() {
  const canvas = confettiCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Add new confetti occasionally
  if (Math.random() < 0.3 && confettis.length < 100) {
    confettis.push(createConfetti())
  }

  // Update and draw confetti
  for (let i = confettis.length - 1; i >= 0; i--) {
    const c = confettis[i]
    
    c.y += c.speedY
    c.x += c.speedX
    c.rotation += c.rotationSpeed

    // Remove if out of bounds
    if (c.y > canvas.height || c.x < -20 || c.x > canvas.width + 20) {
      confettis.splice(i, 1)
      continue
    }

    // Draw confetti
    ctx.save()
    ctx.translate(c.x, c.y)
    ctx.rotate((c.rotation * Math.PI) / 180)
    ctx.fillStyle = c.color
    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size)
    ctx.restore()
  }

  animationId = requestAnimationFrame(animateConfetti)
}

function resizeCanvas() {
  const canvas = confettiCanvas.value
  if (!canvas) return
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  // Initial burst of confetti
  for (let i = 0; i < 50; i++) {
    confettis.push(createConfetti())
  }
  
  animateConfetti()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

function restart() {
  state.step = 'intro'
  state.success = { intro: false, activity: false, date: false, city: false }
  state.dateAnswer = undefined
  state.cityAnswer = undefined
}
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 16px;
  position: relative;
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
  gap: 20px;
  padding: 24px 0;
  border-top: 2px solid #e5e7eb;
  border-bottom: 2px solid #e5e7eb;
  margin: 20px 0;
}

.invitation-card {
  background: linear-gradient(135deg, #fff9f7 0%, #ffe8e8 100%);
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 8px 24px rgba(230, 57, 70, 0.15);
  border: 3px solid #e63946;
  position: relative;
  overflow: hidden;
}

.invitation-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, -20px); }
}

.invitation-header {
  text-align: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.stars {
  font-size: 24px;
  margin-bottom: 12px;
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.invitation-from {
  font-size: 18px;
  font-weight: 800;
  color: #1f2d3d;
  margin: 8px 0 4px;
  font-style: italic;
}

.invitation-verb {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  margin: 0;
  text-transform: lowercase;
}

.invitation-main {
  text-align: center;
  padding: 20px 0;
  border-top: 2px dashed #e63946;
  border-bottom: 2px dashed #e63946;
  margin: 16px 0;
  position: relative;
  z-index: 1;
}

.restaurant-name {
  font-size: 26px;
  font-weight: 900;
  color: #e63946;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.invitation-description {
  font-size: 16px;
  font-weight: 600;
  color: #1f2d3d;
  margin: 0;
  line-height: 1.5;
}

.invitation-footer {
  text-align: center;
  margin-top: 20px;
  position: relative;
  z-index: 1;
}

.christmas-wish {
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

.result-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);
  border-radius: 12px;
  border-left: 4px solid #e63946;
}

.date-item {
  background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
  border-left: 4px solid #f59e0b;
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

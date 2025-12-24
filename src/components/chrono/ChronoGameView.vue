<template>
  <section class="chrono-container">
    <!-- Header -->
    <div class="header">
      <div class="badge">Étape 2</div>
      <h2 class="title">Remets l'Histoire en Ordre</h2>
      <p class="subtitle">Clique sur les photos pour les placer dans la bonne chronologie</p>
    </div>

    <!-- Error message -->
    <div v-if="isComplete && !isCorrect" class="error-banner">
      ❌ L'ordre n'est pas correct. Réorganise les photos.
    </div>

    <!-- Game area -->
    <div class="game-area">
      <!-- Timeline with slots -->
      <ChronoTimeline :placed-images="placedImages" @remove="removeImage" />

      <!-- Available images -->
      <ChronoSelection :available-images="availableImages" @select="selectImage" />
    </div>

    <!-- Success Modal -->
    <Transition name="modal">
      <div v-if="isComplete && isCorrect" class="modal-overlay" @click="onContinue">
        <div class="modal-content" @click.stop>
          <div class="confetti">🎉</div>
          <h2 class="modal-title">Bravo !</h2>
          <p class="modal-subtitle">L'ordre est parfait !</p>
          
          <div class="date-reveal-box">
            <div class="calendar-icon">📅</div>
            <div class="date-info">
              <p class="date-label">La date révélée :</p>
              <p class="date-value">25/04/2026</p>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="primary-btn" @click="onContinue">
              Continuer vers la Ville →
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { state, goNext } from '../../store'
import ChronoTimeline from './ChronoTimeline.vue'
import ChronoSelection from './ChronoSelection.vue'

interface ChronoImage {
  id: number
  src: string
  order: number
}

const placedImages = ref<(ChronoImage | null)[]>([null, null, null, null, null, null])
const availableImages = ref<ChronoImage[]>([])

const isComplete = computed(() => {
  return placedImages.value.every(img => img !== null)
})

const isCorrect = computed(() => {
  return placedImages.value.every((img, idx) => img?.order === idx + 1)
})

const loadImages = async () => {
  try {
    const images = import.meta.glob('/src/assets/chrono/*.jpg', { eager: true })
    const loadedImages: ChronoImage[] = []
    
    Object.entries(images).forEach(([path, module]: [string, any]) => {
      // Extract order from filename (1.jpg -> 1)
      const filename = path.split('/').pop()
      const order = parseInt(filename?.split('.')[0] || '0', 10)
      
      loadedImages.push({
        id: order,
        src: module.default || module,
        order
      })
    })

    // Shuffle images
    availableImages.value = loadedImages.sort(() => Math.random() - 0.5)
  } catch (error) {
    console.error('Erreur chargement images chrono:', error)
  }
}

const selectImage = (image: ChronoImage) => {
  // Find first empty slot
  const emptyIdx = placedImages.value.findIndex(img => img === null)
  if (emptyIdx !== -1) {
    placedImages.value[emptyIdx] = image
    availableImages.value = availableImages.value.filter(img => img.id !== image.id)
  }
}

const removeImage = (index: number) => {
  const image = placedImages.value[index]
  if (image) {
    placedImages.value[index] = null
    availableImages.value.push(image)
  }
}

const onContinue = () => {
  state.success.date = true
  state.dateAnswer = '25/05/2026'
  state.step = 'puzzle-city'
}

onMounted(() => {
  loadImages()
})
</script>

<style scoped>
.chrono-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(135deg, #fff6e9 0%, #f7f7fb 100%);
}

.header {
  padding: 16px 16px 12px;
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

.title {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  margin: 8px 0 0 0;
  color: #1f2d3d;
}

.subtitle {
  color: #6b7280;
  margin: 8px 0 0 0;
  font-weight: 600;
  font-size: 14px;
}

.error-banner {
  margin: 12px 16px 0;
  padding: 12px 16px;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #991b1b;
  font-weight: 700;
  text-align: center;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.game-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  overflow-y: auto;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.confetti {
  font-size: 64px;
  margin-bottom: 16px;
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.modal-title {
  font-size: 32px;
  font-weight: 900;
  margin: 0 0 8px;
  text-align: center;
  color: #1f2d3d;
}

.modal-subtitle {
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 24px;
  text-align: center;
}

.date-reveal-box {
  background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  border: 3px solid #fbbf24;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
  display: flex;
  align-items: center;
  gap: 16px;
}

.calendar-icon {
  font-size: 48px;
  animation: bounce-icon 2s ease-in-out infinite;
}

@keyframes bounce-icon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.date-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-label {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #92400e;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.date-value {
  margin: 0;
  font-size: 28px;
  font-weight: 900;
  color: #92400e;
}

.modal-footer {
  margin-top: 24px;
  width: 100%;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  border: none;
  background: #e63946;
  color: white;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
}

.primary-btn:hover {
  background: #d62828;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(230, 57, 70, 0.4);
}

.primary-btn:active {
  transform: translateY(0);
}

/* Transition pour la modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  animation: slideUp 0.4s ease-out;
}

.modal-leave-active .modal-content {
  animation: slideDown 0.3s ease-in;
}

@keyframes slideDown {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
}
</style>

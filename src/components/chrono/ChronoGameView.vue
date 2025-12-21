<template>
  <section class="chrono-container">
    <!-- Header -->
    <div class="header">
      <div class="badge">Étape 2</div>
      <h2 class="title">Remets l'Histoire en Ordre</h2>
      <p class="subtitle">Clique sur les photos pour les placer dans la bonne chronologie</p>
    </div>

    <!-- Success message -->
    <div v-if="isComplete && isCorrect" class="success-banner success">
      <div>✅ Bravo ! L'ordre est parfait !</div>
      <div class="revealed-date">📅 La date révélée : <strong>25/05/2026</strong></div>
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

    <!-- Action button -->
    <div v-if="isComplete && isCorrect" class="footer">
      <button class="primary-btn" @click="onContinue">Continuer vers la Ville →</button>
    </div>
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

.success-banner {
  margin: 12px 16px 0;
  padding: 12px 16px;
  background: #d1fae5;
  border: 1px solid #a7f3d0;
  border-radius: 12px;
  color: #065f46;
  font-weight: 700;
  text-align: center;
  animation: slideDown 0.3s ease-out;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.revealed-date {
  font-size: 14px;
  font-weight: 600;
  color: #047857;
}

.revealed-date strong {
  font-size: 16px;
  color: #065f46;
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

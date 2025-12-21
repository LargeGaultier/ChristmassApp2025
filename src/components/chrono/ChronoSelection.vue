<template>
  <div class="chrono-selection">
    <div class="selection-label">
      <span class="label-text">Images Disponibles</span>
      <span v-if="availableImages.length > 0" class="image-count">{{ availableImages.length }} restant</span>
    </div>
    
    <div v-if="availableImages.length > 0" class="selection-grid">
      <div 
        v-for="image in availableImages"
        :key="image.id"
        class="image-card"
        @click="$emit('select', image)"
      >
        <img :src="image.src" :alt="`Image ${image.id}`" />
        <div class="click-hint">Clique pour placer</div>
      </div>
    </div>
    
    <div v-else class="all-placed">
      <div class="check-icon">✓</div>
      <p>Toutes les images sont placées !</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ChronoImage {
  id: number
  src: string
  order: number
}

defineProps<{
  availableImages: ChronoImage[]
}>()

defineEmits<{
  select: [image: ChronoImage]
}>()
</script>

<style scoped>
.chrono-selection {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.selection-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
}

.label-text {
  font-weight: 700;
  color: #1f2d3d;
  font-size: 14px;
}

.image-count {
  font-size: 12px;
  color: #6b7280;
  background: white;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 600;
}

.selection-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 380px) {
  .selection-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.image-card {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #e5e7eb;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.image-card:active {
  border-color: #e63946;
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.2);
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.image-card:active img {
  transform: scale(1.05);
}

.click-hint {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-card:active .click-hint {
  opacity: 1;
}

.all-placed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  background: #f0fdf4;
  border: 2px dashed #bbf7d0;
  border-radius: 12px;
  text-align: center;
}

.check-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.all-placed p {
  color: #166534;
  font-weight: 600;
  margin: 0;
}
</style>

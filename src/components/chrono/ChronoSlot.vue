<template>
  <div class="chrono-slot" :class="{ empty: !image, filled: !!image, incorrect: image && image.order !== position, correct: image && image.order === position }">
    <div class="slot-position">{{ position }}</div>
    
    <div v-if="image" class="slot-image" @click.stop>
      <img :src="image.src" :alt="`Position ${position}`" />
      <div v-if="image.order !== position" class="error-badge">❌</div>
      <div class="remove-hint">Clique pour retirer</div>
    </div>
    <div v-else class="slot-empty">
      <div class="empty-icon">+</div>
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
  image: ChronoImage | null
  position: number
}>()
</script>

<style scoped>
.chrono-slot {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  border: 2px dashed #e5e7eb;
  background: white;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.chrono-slot.empty:active {
  border-color: #e63946;
  background: #fff9f7;
}

.chrono-slot.filled {
  border-style: solid;
  border-color: #2a9d8f;
  background: transparent;
}

.chrono-slot.correct {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.chrono-slot.incorrect {
  border-color: #ef4444;
  background: #fef2f2;
}

.chrono-slot.incorrect img {
  opacity: 0.7;
}

.slot-position {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(31, 45, 61, 0.8);
  color: white;
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.slot-image {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.chrono-slot.filled:active .slot-image img {
  transform: scale(0.95);
}

.error-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  z-index: 5;
}

.remove-hint {
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

.chrono-slot.filled:active .remove-hint {
  opacity: 1;
}

.slot-empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
}

.empty-icon {
  font-size: 32px;
  color: #d1d5db;
  font-weight: 700;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>

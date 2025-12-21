<template>
  <div class="chrono-timeline">
    <div class="timeline-label">
      <span class="label-text">Chronologie</span>
      <span class="slot-count">{{ placedImages.filter(img => img !== null).length }}/{{ placedImages.length }}</span>
    </div>
    
    <div class="timeline-grid">
      <ChronoSlot 
        v-for="(image, idx) in placedImages"
        :key="idx"
        :image="image"
        :position="idx + 1"
        @click="image && $emit('remove', idx)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChronoSlot from './ChronoSlot.vue'

interface ChronoImage {
  id: number
  src: string
  order: number
}

defineProps<{
  placedImages: (ChronoImage | null)[]
}>()

defineEmits<{
  remove: [index: number]
}>()
</script>

<style scoped>
.chrono-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.timeline-label {
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

.slot-count {
  font-size: 12px;
  color: #6b7280;
  background: white;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 600;
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 380px) {
  .timeline-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<template>
  <button 
    class="memory-card"
    :class="{ flipped: isFlipped, matched: isMatched }"
    @click="onClick"
    :disabled="isMatched || isLocked"
  >
    <div class="card-inner">
      <div class="card-front">
        <div class="card-back-pattern">?</div>
      </div>
      <div class="card-back">
        <img v-if="image" :src="image" :alt="`Card ${id}`" />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">

interface Props {
  id: number
  image: string | null
  isFlipped: boolean
  isMatched: boolean
  isLocked: boolean
}

defineProps<Props>()
const emit = defineEmits<{ click: [] }>()

const onClick = () => {
  emit('click')
}
</script>

<style scoped>
.memory-card {
  aspect-ratio: 16 / 9;
  border: none;
  padding: 0;
  cursor: pointer;
  perspective: 1000px;
  position: relative;
  background: transparent;
}

.memory-card:disabled {
  cursor: not-allowed;
}

.memory-card.matched {
  pointer-events: none;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.memory-card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 700;
}

.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-back {
  transform: rotateY(180deg);
  background: white;
  padding: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-back-pattern {
  font-size: 32px;
}
</style>

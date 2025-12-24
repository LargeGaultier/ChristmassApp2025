<template>
  <div class="progress-bar">
    <div class="progress-steps">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="step"
        :class="{ 
          active: index <= currentStepIndex,
          current: index === currentStepIndex
        }"
      >
        <div class="step-circle">
          <span v-if="index < currentStepIndex" class="check">✓</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="step-label">{{ step.label }}</div>
      </div>
      <div class="progress-line" :style="{ width: progressWidth }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentStep: string
}

const props = defineProps<Props>()

const steps = [
  { id: 'puzzle-activity', label: 'Activité' },
  { id: 'puzzle-date', label: 'Date' },
  { id: 'puzzle-city', label: 'Ville' }
]

const currentStepIndex = computed(() => {
  const index = steps.findIndex(s => s.id === props.currentStep)
  return index >= 0 ? index : -1
})

const progressWidth = computed(() => {
  if (currentStepIndex.value < 0) return '0%'
  const progress = (currentStepIndex.value / (steps.length - 1)) * 100
  return `${progress}%`
})
</script>

<style scoped>
.progress-bar {
  padding: 16px 20px 12px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.progress-steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 400px;
  margin: 0 auto;
}

.progress-line {
  position: absolute;
  top: 16px;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #e63946 0%, #d62828 100%);
  transition: width 0.5s ease;
  z-index: 0;
  border-radius: 2px;
}

.progress-steps::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  height: 3px;
  background: #e5e7eb;
  z-index: 0;
  border-radius: 2px;
}

.step {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  border: 3px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.step.active .step-circle {
  border-color: #e63946;
  color: #e63946;
  background: #fff9f7;
}

.step.current .step-circle {
  background: #e63946;
  color: white;
  box-shadow: 0 0 0 4px rgba(230, 57, 70, 0.2);
  animation: pulse-circle 2s ease-in-out infinite;
}

@keyframes pulse-circle {
  0%, 100% {
    box-shadow: 0 0 0 4px rgba(230, 57, 70, 0.2);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(230, 57, 70, 0.1);
  }
}

.check {
  font-size: 16px;
}

.step-label {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-align: center;
  transition: color 0.3s ease;
}

.step.active .step-label {
  color: #1f2d3d;
}

.step.current .step-label {
  color: #e63946;
  font-weight: 700;
}
</style>

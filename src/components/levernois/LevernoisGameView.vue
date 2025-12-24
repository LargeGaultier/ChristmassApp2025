<template>
  <section class="game">
    <div class="header">
      <div class="badge">Étape 3</div>
      <h2 class="title">Devine le Lieu</h2>
      <p class="subtitle"></p>
    </div>

    <div class="content">
      <StepLe v-if="currentStep === 1" @success="onStepSuccess" />
      <StepVer v-else-if="currentStep === 2" @success="onStepSuccess" />
      <StepNoixRiddle v-else-if="currentStep === 3" @success="onStepSuccess" />

      <FinalReveal v-if="showFinal" @done="onDone" />
    </div>

    <SyllableReveal v-if="revealSyllable" :syllable="revealSyllable" @hidden="onRevealHidden" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StepLe from './StepLe.vue'
import StepVer from './StepVer.vue'
import StepNoixRiddle from './StepNoixRiddle.vue'
import SyllableReveal from './SyllableReveal.vue'
import FinalReveal from './FinalReveal.vue'

const currentStep = ref(1)
const revealSyllable = ref<string | null>(null)
const showFinal = ref(false)

const emit = defineEmits<{ done: [] }>()

const onStepSuccess = (syllable: string) => {
  revealSyllable.value = syllable
}

const onRevealHidden = () => {
  if (currentStep.value < 3) {
    currentStep.value += 1
    revealSyllable.value = null
  } else {
    // Completed steps → show final
    revealSyllable.value = null
    showFinal.value = true
  }
}

const onDone = () => {
  emit('done')
}
</script>

<style scoped>
.game { display: flex; flex-direction: column; height: 100%; }
.header { padding: 16px; }
.badge { display: inline-flex; gap: 8px; align-items: center; padding: 6px 12px; background: white; border-radius: 999px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); font-weight: 700; font-size: 12px; color: #e63946; }
.title { font-size: 24px; font-weight: 800; margin: 8px 0 0; }
.subtitle { color: #6b7280; font-weight: 600; margin: 8px 0 0; }
.content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
</style>

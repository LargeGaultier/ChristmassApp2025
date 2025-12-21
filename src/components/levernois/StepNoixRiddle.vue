<template>
  <section class="step">
    <h3 class="title">Étape 3 — NOIS</h3>
    <div class="riddle">
      <p>Je suis petit mais je nourris,</p>
      <p>J’ai une coque mais je ne suis pas un œuf,</p>
      <p>Je tombe de l’arbre mais je ne suis pas un fruit tendre,</p>
      <p>On me casse pour découvrir mon trésor.</p>
      <p class="question">Qui suis-je ?</p>
    </div>

    <div class="choices">
      <button v-for="opt in options" :key="opt.label" class="choice" @click="choose(opt)">
        {{ opt.label }}
      </button>
    </div>

    <p v-if="error" class="error">Ce n'est pas la bonne réponse.</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Option { label: string; ok: boolean }
const options: Option[] = [
  { label: 'NOIX', ok: true },
  { label: 'NOISETTE', ok: false },
  { label: 'ŒUF', ok: false },
  { label: 'GLAND', ok: false },
]

const error = ref(false)
const emit = defineEmits<{ success: [syllable: string] }>()

const choose = (opt: Option) => {
  if (opt.ok) {
    error.value = false
    emit('success', 'NOIS')
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.step { padding: 16px; }
.title { margin: 0 0 8px; font-weight: 800; font-size: 18px; color: #1f2d3d; }
.riddle { background: white; border-radius: 12px; padding: 12px; border: 1px solid #e5e7eb; }
.question { font-weight: 800; margin-top: 8px; }
.choices { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px; }
.choice { padding: 14px; border-radius: 12px; border: 2px solid #e5e7eb; font-weight: 800; background: white; }
.error { text-align: center; color: #e63946; font-weight: 700; margin-top: 8px; }
</style>

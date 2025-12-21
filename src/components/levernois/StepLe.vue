<template>
  <section class="step">
    <h3 class="title">Étape 1 — LE</h3>
    <p class="sentence"><span class="blank">___</span> village est entouré de champs</p>

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
  { label: 'LE', ok: true },
  { label: 'LA', ok: false },
  { label: 'UN', ok: false },
  { label: 'UNE', ok: false },
]

const error = ref(false)

const emit = defineEmits<{ success: [syllable: string] }>()

const choose = (opt: Option) => {
  if (opt.ok) {
    error.value = false
    emit('success', 'LE')
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.step { padding: 16px; }
.title { margin: 0 0 8px; font-weight: 800; font-size: 18px; color: #1f2d3d; }
.sentence { text-align: center; font-weight: 700; }
.blank { display: inline-block; min-width: 48px; border-bottom: 3px solid #e63946; margin-right: 6px; }
.choices { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px; }
.choice { padding: 14px; border-radius: 12px; border: 2px solid #e5e7eb; font-weight: 800; background: white; }
.error { text-align: center; color: #e63946; font-weight: 700; margin-top: 8px; }
</style>

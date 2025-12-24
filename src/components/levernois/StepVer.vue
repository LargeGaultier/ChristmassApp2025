<template>
  <section class="step">
    <h3 class="title">Étape 2</h3>
    <p class="subtitle">Choisis l'élément vert</p>

    <div class="cards">
      <button v-for="item in items" :key="item.label" class="card" @click="choose(item)">
        <div class="icon">{{ item.icon }}</div>
        <div class="label">{{ item.label }}</div>
      </button>
    </div>

    <p v-if="error" class="error">Essaie encore.</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Item { label: string; icon: string; correct: boolean }
const items: Item[] = [
  { label: 'champ', icon: '🌾', correct: false },
  { label: 'herbe', icon: '🌿', correct: true },
  { label: 'arbre', icon: '🌳', correct: false },
  { label: 'eau', icon: '🟦', correct: false },
]

const error = ref(false)
const emit = defineEmits<{ success: [syllable: string] }>()

const choose = (item: Item) => {
  if (item.correct) {
    error.value = false
    emit('success', 'VER')
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.step { padding: 16px; }
.title { margin: 0 0 8px; font-weight: 800; font-size: 18px; color: #1f2d3d; }
.subtitle { text-align: center; color: #6b7280; font-weight: 700; margin: 0 0 12px; }
.cards { display: grid; grid-template-columns: 2fr 2fr; gap: 12px; }
.card { padding: 16px; border-radius: 12px; border: 2px solid #e5e7eb; background: white; display: flex; flex-direction: column; gap: 8px; align-items: center; }
.icon { font-size: 28px; }
.label { font-weight: 700; }
.error { text-align: center; color: #e63946; font-weight: 700; margin-top: 8px; }
</style>

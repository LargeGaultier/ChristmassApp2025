<template>
  <section class="final">
    <h2 class="title">LEVERNOIS</h2>
    <p class="subtitle">📍 Levernois</p>
    <p class="subtitle">🍽️ La Table de Levernois</p>

    <div class="footer">
      <button class="primary" @click="$emit('done')">Continuer</button>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.final { padding: 24px; display: flex; flex-direction: column; align-items: center; }
.title { font-size: 28px; font-weight: 900; letter-spacing: 3px; margin: 0 0 8px; }
.subtitle { margin: 0; color: #1f2d3d; font-weight: 700; }
.footer { margin-top: 16px; width: 100%; }
.primary { width: 100%; padding: 16px; border: none; border-radius: 12px; background: #e63946; color: #fff; font-weight: 800; }
</style>

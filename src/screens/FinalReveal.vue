<template>
  <section class="card">
    <div class="header">
      <div class="badge">Mission Complète</div>
      <h2 class="title">Bravo les Détectives !</h2>
      <p class="subtitle">Vous avez résolu le mystère du renne disparu. Le Père Noël est très fier de vous.</p>
      <img class="image" alt="Enfants heureux" :src="revealImg" />
    </div>
    <div class="section">
      <div class="secondary-btn" style="justify-content:space-between;">
        <span>CODE SECRET RÉVÉLÉ</span>
        <strong>JOYEUX</strong>
      </div>
    </div>
    <div class="footer">
      <button class="primary-btn" @click="restart">Rejouer la Mission</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { state } from '../store'
import revealImg from '../assets/final-reveal.png'

function restart() {
  state.step = 'intro'
  state.success = { intro: false, mission: false, date: false, city: false, place: false }
  state.dateAnswer = undefined
  state.cityAnswer = undefined
  state.placeAnswer = undefined
}
</script>

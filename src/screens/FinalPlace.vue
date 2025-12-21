<template>
  <section class="card">
    <div class="header">
      <div class="badge">Énigme Finale</div>
      <img class="image" alt="Illustration enquête" :src="enigmImg" />
      <h2 class="title">Où se cache la magie ?</h2>
      <p class="subtitle">« Mes chers détectives, murmure Maman Noël, vous avez rassemblé tous les morceaux de l’étoile. Regardez bien les indices. L’endroit que nous cherchons n’est pas sur une carte, mais au cœur de la maison… »</p>
      <div class="secondary-btn" style="margin-top:8px;">Indice : là où la chaleur rassemble la famille.</div>
    </div>
    <div class="section option-grid">
      <button class="option" @click="select('La Cuisine')"><label>La Cuisine</label></button>
      <button class="option" @click="select('La Chambre')"><label>La Chambre</label></button>
      <button class="option" @click="select('La Cheminée')"><label>La Cheminée</label></button>
      <button class="option" @click="select('Le Jardin')"><label>Le Jardin</label></button>
    </div>
    <div class="section">
      <p class="success" v-if="ok">C’est cela : la magie commence ici ✨</p>
      <p class="error" v-else-if="selected">Ce n’est pas le bon endroit.</p>
    </div>
    <div class="footer">
      <button class="primary-btn" :disabled="!ok" @click="onContinue">Continuer l’aventure →</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { state, goNext } from '../store'
import type { PlaceOption } from '../store'
import enigmImg from '../assets/final-enigme.png'

const selected = ref<PlaceOption | undefined>(undefined)
const select = (p: PlaceOption) => { selected.value = p }
const ok = computed(() => selected.value === 'La Cheminée')
const onContinue = () => { if (!ok.value) return; state.success.place = true; state.placeAnswer = 'La Cheminée'; goNext('final-place') }
</script>

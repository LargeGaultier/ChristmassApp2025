<template>
  <section class="card">
    <div class="header">
      <div class="badge"><span class="dot"></span> MISSION SECRÈTE</div>
      <h1 class="title">L’Enquête du Père Noël</h1>
      <p class="subtitle">Trois indices majeurs ont disparu. Aide-nous à les retrouver pour sauver Noël !</p>
    </div>
    <div class="section">
      <ul style="list-style:none; padding:0; margin:0; display:grid; gap:12px;">
        <li class="secondary-btn locked">Indice 1 — À déverrouiller</li>
        <li class="secondary-btn locked">Indice 2 — À déverrouiller</li>
        <li class="secondary-btn locked">Indice 3 — À déverrouiller</li>
      </ul>
    </div>
    <div class="footer">
      <button class="primary-btn" @click="onFindFirst">Trouver le premier</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { state, goNext } from '../store'
const onFindFirst = () => { state.success.mission = true; goNext('mission') }
</script>

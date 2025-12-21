<template>
  <teleport to="body">
    <div v-if="visible" class="overlay">
      <div class="snow"></div>
      <div class="content">
        <div class="syllable">{{ syllable }}</div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ syllable: string; duration?: number }>()
const emit = defineEmits<{ hidden: [] }>()
const visible = ref(true)

onMounted(() => {
  const d = props.duration ?? 800
  setTimeout(() => { visible.value = false; emit('hidden') }, d)
})
</script>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.content { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 12px 48px rgba(0,0,0,0.3); animation: pop 0.6s ease-out; }
.syllable { font-size: 32px; font-weight: 900; color: #1f2d3d; letter-spacing: 2px; }
@keyframes pop { from { transform: scale(0.9); opacity: 0 } to { transform: scale(1); opacity: 1 } }
.snow { position: absolute; inset: 0; background-image: radial-gradient(white 1px, transparent 1px); background-size: 24px 24px; opacity: 0.2; }
</style>

<template>
  <div class="memory-grid">
    <MemoryCard 
      v-for="card in cards"
      :key="card.id"
      :id="card.id"
      :image="card.isFlipped || card.isMatched ? card.image : null"
      :is-flipped="card.isFlipped || card.isMatched"
      :is-matched="card.isMatched"
      :is-locked="isLocked"
      @click="selectCard(card.id)"
    />

    <!-- Modal match reveal -->
    <Teleport to="body" v-if="matchedCard">
      <div class="match-overlay" @click="closeMatch">
        <div class="match-modal" @click.stop>
          <img :src="matchedCard.image" :alt="matchedCard.pairId" class="match-image" />
          <button class="close-btn" @click="closeMatch">✕</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MemoryCard from './MemoryCard.vue'

const FLIP_DELAY = 2000 // Adjustable delay in ms

interface Card {
  id: number
  image: string
  pairId: number
  isFlipped: boolean
  isMatched: boolean
}

const cards = ref<Card[]>([])
const flipped = ref<number[]>([])
const matched = ref<number[]>([])
const isLocked = ref(false)
const matchedCard = ref<Card | null>(null)

// Load images dynamically
async function loadImages() {
  const imageModules = import.meta.glob('/src/assets/memory/*.{png,jpg,jpeg}', { eager: true })
  const images: string[] = []

  for (const [path, module] of Object.entries(imageModules)) {
    images.push((module as any).default || module)
  }

  return images.slice(0, 8) // Get first 8 images
}

// Initialize game
async function initGame() {
  const images = await loadImages()

  // Create pairs
  const pairs: Card[] = []
  for (let i = 0; i < images.length; i++) {
    pairs.push({
      id: i * 2,
      image: images[i],
      pairId: i,
      isFlipped: false,
      isMatched: false,
    })
    pairs.push({
      id: i * 2 + 1,
      image: images[i],
      pairId: i,
      isFlipped: false,
      isMatched: false,
    })
  }

  // Shuffle
  cards.value = pairs.sort(() => Math.random() - 0.5)
}

// Select card
const selectCard = async (cardId: number) => {
  if (isLocked.value) return
  if (flipped.value.includes(cardId)) return
  if (matched.value.includes(cardId)) return

  // Flip the card
  const card = cards.value.find(c => c.id === cardId)
  if (!card) return
  
  card.isFlipped = true
  flipped.value.push(cardId)

  if (flipped.value.length === 2) {
    isLocked.value = true

    const [card1Id, card2Id] = flipped.value
    const card1 = cards.value.find(c => c.id === card1Id)!
    const card2 = cards.value.find(c => c.id === card2Id)!

    // Check match
    if (card1.pairId === card2.pairId) {
      // Match found
      card1.isMatched = true
      card2.isMatched = true
      matched.value.push(card1Id, card2Id)
      matchedCard.value = card1
      flipped.value = []
      isLocked.value = false
    } else {
      // No match - wait then flip back
      await new Promise(resolve => setTimeout(resolve, FLIP_DELAY))
      card1.isFlipped = false
      card2.isFlipped = false
      flipped.value = []
      isLocked.value = false
    }
  }
}

const closeMatch = () => {
  matchedCard.value = null
}

const isGameComplete = computed(() => matched.value.length === 16)

onMounted(() => {
  initGame()
})

defineExpose({ isGameComplete })
</script>

<style scoped>
.memory-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px;
}

.match-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.match-modal {
  position: relative;
  max-width: 320px;
  width: 90%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.match-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #1f2d3d;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.close-btn:hover {
  background: #f3f4f6;
  transform: scale(1.1);
}
</style>

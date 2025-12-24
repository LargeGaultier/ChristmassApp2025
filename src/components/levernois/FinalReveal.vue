<template>
  <Transition name="modal">
    <div class="modal-overlay" @click="$emit('done')">
      <div class="modal-content" @click.stop>
        <div class="confetti">🎉</div>
        <h2 class="title">Nous allons à :</h2>
        <div class="reveal-box">
          <p class="location">📍 Levernois</p>
          <p class="restaurant">🍽️ La Table de Levernois</p>
        </div>
        
        <div class="footer">
          <button class="primary" @click="$emit('done')">
            Continuer →
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineEmits<{ done: [] }>()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.confetti {
  font-size: 64px;
  margin-bottom: 16px;
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.title {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 1px;
  margin: 0 0 24px;
  text-align: center;
  color: #1f2d3d;
}

.reveal-box {
  background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  border: 3px solid #e63946;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.15);
}

.location {
  margin: 0 0 12px;
  color: #1f2d3d;
  font-weight: 800;
  font-size: 22px;
  text-align: center;
}

.restaurant {
  margin: 0;
  color: #1f2d3d;
  font-weight: 800;
  font-size: 22px;
  text-align: center;
}

.footer {
  margin-top: 24px;
  width: 100%;
}

.primary {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 16px;
  background: #e63946;
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
}

.primary:hover {
  background: #d62828;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(230, 57, 70, 0.4);
}

.primary:active {
  transform: translateY(0);
}

/* Transition pour la modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  animation: slideUp 0.4s ease-out;
}

.modal-leave-active .modal-content {
  animation: slideDown 0.3s ease-in;
}

@keyframes slideDown {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
}
</style>

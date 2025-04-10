<script setup>
import { ref, watch } from 'vue';
import audioSrc from '@/assets/base_question.mp3'

const props = defineProps({ response: String });
const emit = defineEmits(['update:response', 'next', 'back']);

const editedResponse = ref(props.response);
const validationError = ref('');

watch(editedResponse, val => {
  emit('update:response', val);
  if (val.trim())
    validationError.value = '';
});

const isPlaying = ref(false)
const hasPlayed = ref(false)
let audio = null

const handleNext = () => {
  if (!hasPlayed.value) {
    validationError.value = 'You need to listen to the audio before proceeding.';
  } else if (!editedResponse.value || !editedResponse.value.trim()) {
    validationError.value = 'This field is required';
  } else {
    stopAudio();
    emit('next');
  }
};

const handleBack = () => {
    stopAudio();
    emit('back');
};

function startPlayback() {
  if (!audio) {
    audio = new Audio(audioSrc)
    audio.volume = 1.0

    // Handle audio finish
    audio.addEventListener('ended', () => {
      hasPlayed.value = true
      isPlaying.value = false
    })
  }

  playAudio()
}

function playAudio() {
  if (audio && !isPlaying.value) {
    isPlaying.value = true
    audio.currentTime = 0
    audio.play().catch((err) => {
      console.warn('Autoplay failed:', err)
    })
  }
}

function stopAudio() {
  if (audio && !audio.ended) {
    audio.currentTime = 0;
    audio.pause();
    isPlaying.value = false;
  }
}

</script>

<template>
  <div class="page">
    <h2 class="mb-4">Your Mental Wellbeing Experience</h2>
    <p class="mt-3">Click Play to listen to the question, then type your response in the text box below.</p>

    <!-- Play / Replay Button -->
    <button class="btn btn-success mb-3 d-flex align-items-center gap-2"
      @click="startPlayback"
      :disabled="isPlaying">
      <div v-if="isPlaying" class="audio-bars">
        <span></span><span></span><span></span><span></span>
      </div>
      <i v-else class="fas" :class="hasPlayed ? 'fa-reply' : 'fa-play'"></i>
      <span>{{ hasPlayed ? 'Replay' : 'Play' }}</span>
    </button>

    <div class="mb-4">
      <textarea 
        class="form-control" 
        rows="6"
        v-model="editedResponse"
        placeholder="Type your response here..."
      ></textarea>
      <div class="text-danger mt-1" v-if="validationError">
        <i class="bi bi-exclamation-circle me-2"></i>{{ validationError }}
      </div>
    </div>
    
    <div class="footer-buttons">
      <button class="btn btn-outline-secondary" @click="handleBack">Back</button>
      <button class="btn btn-primary" @click="handleNext">Next</button>
    </div>
  </div>
</template>
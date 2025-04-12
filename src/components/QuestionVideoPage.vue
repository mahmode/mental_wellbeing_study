<script setup>
import { ref, watch } from 'vue';
import videoSrc from '@/assets/base_question.mp4';

const props = defineProps({ response: String, title: String });
const emit = defineEmits(['update:response', 'next', 'back']);

const editedResponse = ref(props.response);
const validationError = ref('');

watch(editedResponse, val => {
  emit('update:response', val);
  if (val.trim()) {
    validationError.value = '';
  }
});

const videoRef = ref(null);
const hasPlayed = ref(false);
const isPlaying = ref(false);

const handleNext = () => {
  if (!hasPlayed.value) {
    validationError.value = 'You need to watch the video before proceeding.';
  } else if (!editedResponse.value || !editedResponse.value.trim()) {
    validationError.value = 'This field is required';
  } else {
    emit('next');
  }
};

const handleBack = () => {
  emit('back');
};

function startPlayback() {
  const video = videoRef.value;
  if (video) {
    video.currentTime = 0;
    video.play().then(() => {
      isPlaying.value = true;
    }).catch((err) => {
      console.warn('Autoplay failed:', err);
    });
  }
}

function handleVideoEnd() {
  hasPlayed.value = true;
  isPlaying.value = false;
}

</script>

<template>
  <div class="page">
    <h2 class="mb-4">{{ title }}</h2>
    <p class="mt-3">Click Play to watch a video of the question, then type your response in the text box below.</p>

    <!-- Video Player -->
    <div class="mb-3 position-relative">
      <video
        ref="videoRef"
        :src="videoSrc"
        class="w-100"
        style="max-height: 400px; background: black;"
        @ended="handleVideoEnd"
        @play="isPlaying = true"
        @pause="isPlaying = false"
      ></video>

      <button class="btn-play-replay" @click="startPlayback" v-if="!isPlaying">
        <div class="circle-background">
          <i class="fas" :class="hasPlayed ? 'fa-reply' : 'fa-play'"></i>
        </div>
      </button>
    </div>

    <div class="mb-4">
      <textarea
        class="form-control"
        rows="6"
        v-model="editedResponse"
        placeholder="Type your response here..."
      ></textarea>
      <div class="text-danger mt-1" v-if="validationError">
        <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationError }}
      </div>
    </div>

    <div class="footer-buttons">
      <button class="btn btn-outline-secondary" @click="handleBack">Back</button>
      <button class="btn btn-primary" @click="handleNext">Next</button>
    </div>
  </div>
</template>

<style scoped>
/* Container for positioning */
.position-relative {
  position: relative;
}

/* Play/replay button styling */
.btn-play-replay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.circle-background {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: white;
  font-size: 3rem;
  transition: background-color 0.3s ease;
}

.circle-background:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.fas {
  pointer-events: none;
}

/* Add a subtle semi-transparent overlay to the video to highlight the play button */
video {
  position: relative;
  width: 100%;
  height: auto;
}
</style>
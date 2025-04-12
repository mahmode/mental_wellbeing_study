<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  response: String,
  title: String,
  description: { type: Array, default: () => [] }
});
const emit = defineEmits(['update:response', 'next', 'back']);

const editedResponse = ref(props.response);
const validationError = ref('');

watch(editedResponse, val => {
  emit('update:response', val);
  if (val.trim()) {
    validationError.value = '';
  }
});

const handleNext = () => {
  if (!editedResponse.value || !editedResponse.value.trim()) {
    validationError.value = 'This field is required';
  } else {
    emit('next');
  }
};

</script>

<template>
  <div class="page">
    <h2 class="mb-4">{{ title }}</h2>
    <p v-for="(paragraph, index) in description" :key="index">
      {{ paragraph }}
    </p>
    
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
      <button class="btn btn-outline-secondary" @click="$emit('back')">Back</button>
      <button class="btn btn-primary" @click="handleNext">Next</button>
    </div>
  </div>
</template>
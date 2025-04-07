<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ response: String });
const emit = defineEmits(['update:response', 'next', 'back']);

const editedResponse = ref(props.response);
watch(editedResponse, val => emit('update:response', val));
</script>

<template>
  <div class="page">
    <h2 class="mb-4">Advancing Mental Wellbeing Research</h2>
    <p>Your response is valuable! By sharing your thoughts, you're contributing to scientific research that helps improve our understanding of mental well-being. Would you be willing to provide more details or elaborate on your previous response?</p>
    
    <div class="mb-4">
      <textarea 
        class="form-control" 
        rows="6"
        v-model="editedResponse"
        placeholder="Type your response here..."
      ></textarea>
    </div>
    
    <div class="footer-buttons">
      <button class="btn btn-outline-secondary" @click="$emit('back')">Back</button>
      <button class="btn btn-primary" @click="$emit('next')">Next</button>
    </div>
  </div>
</template>
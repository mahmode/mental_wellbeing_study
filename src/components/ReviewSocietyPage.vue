<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ response: String });
const emit = defineEmits(['update:response', 'next', 'back']);

const editedResponse = ref(props.response);
watch(editedResponse, val => emit('update:response', val));
</script>

<template>
  <div class="page">
    <h2 class="mb-4">Contributing to a Better Society</h2>
    <p>This research aims to improve lives and create positive change in society. Your insights are invaluable. Do you have any additional thoughts to share?</p>
    
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
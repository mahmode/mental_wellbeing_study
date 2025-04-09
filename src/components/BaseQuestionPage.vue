<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ response: String });
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
    <h2 class="mb-4">Your Mental Wellbeing Experience</h2>
    <p>We are interested in your thoughts and experiences regarding mental wellbeing.</p>
    <p>Please share any thoughts or experiences you've had regarding your mental wellbeing. This could include challenges you've faced, coping strategies you've found helpful, or any other relevant experiences.</p>
    
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
      <button class="btn btn-outline-secondary" @click="$emit('back')">Back</button>
      <button class="btn btn-primary" @click="handleNext">Next</button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  response: String
})

defineEmits(['update:response', 'next', 'back'])
</script>

<template>
  <div class="page">
    <h2 class="mb-4">Your Mental Wellbeing Experience</h2>
    <p>Please share any thoughts or experiences you've had regarding your mental wellbeing. This could include challenges you've faced, coping strategies you've found helpful, or any other relevant experiences.</p>
    
    <div class="mb-4">
      <textarea 
        class="form-control" 
        rows="5"
        :value="response"
        @input="$emit('update:response', $event.target.value)"
        placeholder="Type your response here..."
      ></textarea>
    </div>
    
    <div class="footer-buttons">
      <button class="btn btn-outline-secondary" @click="$emit('back')">Back</button>
      <button class="btn btn-primary" @click="$emit('next')">Next</button>
    </div>
  </div>
</template>
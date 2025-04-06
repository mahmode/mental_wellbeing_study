<script setup>
import { ref } from 'vue';

const props = defineProps({
  response: String
});

const emit = defineEmits(['update:response', 'next']);

const isEditing = ref(false);
const editedResponse = ref(props.response);

const handleEdit = () => {
  isEditing.value = true;
};

const handleSave = () => {
  emit('update:response', editedResponse.value);
  isEditing.value = false;
};

const handleCancel = () => {
  editedResponse.value = props.response;
  isEditing.value = false;
};
</script>

<template>
  <div class="page">
    <h2 class="mb-4">Advancing Mental Wellbeing Research</h2>
    
    <p>Your response is valuable! By sharing your thoughts, you're contributing to scientific research that helps improve our understanding of mental well-being. Would you be willing to provide more details or elaborate on your previous response?</p>
    
    <!-- Display Mode -->
    <div v-if="!isEditing">
      <div class="card mb-4">
        <div class="card-body">
          <p class="card-text" style="white-space: pre-wrap;">{{ editedResponse || "[No response provided]" }}</p>
        </div>
      </div>
      
      <button class="btn btn-secondary" @click="handleEdit">
        <i class="bi bi-pencil-square"></i> Edit Response
      </button>
      
      <div class="footer-buttons">
        <button class="btn btn-outline-secondary" @click="$emit('back')">Back</button>
        <button class="btn btn-primary" @click="$emit('next')">
          Next
        </button>
      </div>
    </div>
    
    <!-- Edit Mode -->
    <div v-else>
      <div class="mb-4">
        <textarea 
          class="form-control" 
          v-model="editedResponse"
          rows="6"
          placeholder="Type your response here..."
        ></textarea>
      </div>
      
      <div class="footer-buttons">
        <button class="btn btn-outline-secondary" @click="handleCancel">
          Cancel
        </button>
        <button class="btn btn-primary" @click="handleSave">
          <i class="bi bi-check-circle"></i> Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-left: 4px solid #667eea;
}

textarea {
  min-height: 200px;
}

.footer-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}
</style>
<script setup>
import { ref, watch } from 'vue';

const consent = ref('');
const showError = ref(false);

const emit = defineEmits(['next']);

watch(consent, (newValue) => {
  if (newValue)
    showError.value = false;
});

const handleNext = () => {
  showError.value = !consent.value;
  if (consent.value)
    emit('next');
};
</script>

<template>
  <div class="page">
    <h2 class="mb-4 mt-5">Welcome to our study</h2>
    <p>Thank you for choosing to participate in this study on <strong>student mental wellbeing</strong>. This research aims to explore how people describe their mental well-being in different contexts. Your responses will help advance our understanding of mental wellbeing.</p>
    <p>The study is conducted by researchers at the University of Oulu, Finland (Doctoral researcher Mahmoud Ali, supervised by Prof. <a href="https://scholar.google.com/citations?user=Qzl_9xYAAAAJ" target="_blank">Simo Hosio</a> at the Faculty of Information Technology and Electrical Engineering).</p>
    <p>For inquiries, you may contact us at <a href="mailto:mahmoud.ali@oulu.fi">mahmoud.ali@oulu.fi</a></p>
    
    By proceeding with this survey, you confirm that:
    <ul class="list-unstyled check-list">
      <li> You have read and understood the study’s purpose.</li>
      <li> You voluntarily agree to participate.</li>
      <li> You understand that your responses will remain confidential.</li>
    </ul>

    <div class="mt-4 consent-radio">
      <div class="form-check required">
        <input 
          class="form-check-input" 
          type="radio" 
          id="consent-yes" 
          v-model="consent" 
          value="yes"
          required
        >
        <label class="form-check-label" for="consent-yes">
          I have read and consent to participate in this study
        </label>
      </div>
      
      <!-- Error message -->
      <transition name="fade">
        <div v-if="showError" class="alert alert-danger mt-3">
          <i class="bi bi-exclamation-circle me-2"></i>
          You must provide consent to continue
        </div>
      </transition>
    </div>
    
    <div class="footer-buttons">
      <div></div>
      <button class="btn btn-primary" @click="handleNext">
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.check-list li::before {
  content: "✔️";
  margin-right: 8px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Error message styling */
.alert-danger {
  border-left: 3px solid #dc3545;
  display: flex;
  align-items: center;
}

.consent-radio .form-check-input {
  width: 1.2em;
  height: 1.2em;
}

.consent-radio .form-check-label {
  font-weight: 500;
}

.required .form-check-label::after {
  content: " *";
  color: #dc3545; /* Bootstrap danger color */
  font-weight: bold;
}
</style>
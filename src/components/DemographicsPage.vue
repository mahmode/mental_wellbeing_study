<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:demographics', 'next', 'back']);

const props = defineProps({
  demographics: Object
});

const validationErrors = ref({});

const clearError = (field) => {
  if (validationErrors.value[field]) {
    delete validationErrors.value[field];
  }
};

const validateForm = () => {
  const errors = {};

  if (!props.demographics.age) errors.age = 'Age is required';
  if (!props.demographics.gender) errors.gender = 'Gender is required';
  if (props.demographics.gender == 'other' && !props.demographics.customGender)
    errors.customGender = 'Please specify your gender';

  if (!props.demographics.education) errors.education = 'Education is required';
  if (props.demographics.education == 'other' && !props.demographics.customEducation)
    errors.customEducation = 'Please specify your education';

  if (!props.demographics.field) errors.field = 'Field of study is required';
  if (!props.demographics.employment) errors.employment = 'Employment status is required';
  if (props.demographics.employment == 'other' && !props.demographics.customEmployment)
    errors.customEmployment = 'Please specify your employment';

  if (!props.demographics.living) errors.living = 'Living situation is required';
  if (!props.demographics.diagnosed) errors.diagnosed = 'Diagnosis question is required';
  if (props.demographics.feeling == 0) errors.feeling = 'Feeling rating is required';
  
  validationErrors.value = errors;
  return Object.keys(errors).length == 0;
};

const handleNext = () => {
  if (validateForm()) {
    emit('next');
  }
};
</script>

<template>
  <div class="page">
    <div class="page-content">
      <h2 class="mb-4">Demographic Information</h2>
      <p>Before we begin, we'd like to ask a few basic questions about you. This information will help us understand the diversity of participants in this study.</p>

      <div class="mb-4">
        <label class="form-label">How old are you?</label>
        <input 
          type="number" 
          class="form-control"
          min="0"
          max="100"
          placeholder="Enter your age"
          :value="demographics.age"
          @input="$emit('update:demographics', { ...demographics, age: $event.target.value }); clearError('age')"
        >
        <div class="text-danger" v-if="validationErrors.age">
          <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.age }}
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">What is your gender?</label>
        <select class="form-select" 
          :value="demographics.gender"
          @change="$emit('update:demographics', { ...demographics, gender: $event.target.value }); clearError('gender')">
          <option value="" disabled>Select your gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        <div class="text-danger" v-if="validationErrors.gender">
          <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.gender }}
        </div>

        <div v-if="demographics.gender == 'other'" class="mt-2">
          <label class="form-label">Please specify</label>
          <input type="text" class="form-control"
            :value="demographics.customGender || ''"
            @input="$emit('update:demographics', { ...demographics, customGender: $event.target.value }); clearError('customGender')" />
          <div class="text-danger" v-if="validationErrors.customGender">
            <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.customGender }}
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">What level of education are you currently pursuing?</label>
        <select 
          class="form-select" 
          :value="demographics.education"
          @change="$emit('update:demographics', { ...demographics, education: $event.target.value }); clearError('education')"
        >
          <option value="" disabled>Select your education level</option>
          <option value="high-school">High School</option>
          <option value="bachelors">Bachelor's Degree</option>
          <option value="masters">Master's Degree</option>
          <option value="phd">PhD/Doctorate</option>
          <option value="other">Other</option>
        </select>
        <div class="text-danger" v-if="validationErrors.education">
          <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.education }}
        </div>

        <div v-if="demographics.education == 'other'" class="mt-2">
          <label class="form-label">Please specify</label>
          <input type="text" class="form-control"
            :value="demographics.customEducation || ''"
            @input="$emit('update:demographics', { ...demographics, customEducation: $event.target.value }); clearError('customEducation')" />
          <div class="text-danger" v-if="validationErrors.customEducation">
            <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.customEducation }}
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">What is your current field of study?</label>
        <input 
          type="text" 
          class="form-control" 
          :value="demographics.field"
          @input="$emit('update:demographics', { ...demographics, field: $event.target.value }); clearError('field')"
        >
        <div class="text-danger" v-if="validationErrors.field">
          <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.field }}
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Do you have a part-time or full-time job in addition to your studies?</label>
        <select class="form-select" :value="demographics.employment"
          @change="$emit('update:demographics', { ...demographics, employment: $event.target.value }); clearError('employment')">
          <option value="" disabled>Select your employment status</option>
          <option value="full-time">Yes, full-time employed</option>
          <option value="part-time">Yes, part-time employed</option>
          <option value="unemployed">No, I'm not employed</option>
          <option value="other">Other</option>
        </select>
        <div class="text-danger" v-if="validationErrors.employment">
          <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.employment }}
        </div>

        <div v-if="demographics.employment == 'other'" class="mt-2">
          <label class="form-label">Please specify</label>
          <input type="text" class="form-control"
            :value="demographics.customEmployment || ''"
            @input="$emit('update:demographics', { ...demographics, customEmployment: $event.target.value }); clearError('customEmployment')" />
          <div class="text-danger" v-if="validationErrors.customEmployment">
            <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.customEmployment }}
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Do you live alone or with others?</label>
        <select 
          class="form-select" 
          :value="demographics.living"
          @change="$emit('update:demographics', { ...demographics, living: $event.target.value }); clearError('living')"
        >
          <option value="" disabled>Select your living situation</option>
          <option value="alone">Alone</option>
          <option value="roommates">With roommates</option>
          <option value="family">With family</option>
          <option value="partner">With partner/spouse</option>
        </select>
        <div class="text-danger" v-if="validationErrors.living">
          <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.living }}
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Have you ever been diagnosed with a mental health condition?</label>
        <select 
          class="form-select" 
          :value="demographics.diagnosed"
          @change="$emit('update:demographics', { ...demographics, diagnosed: $event.target.value }); clearError('diagnosed')"
        >
          <option value="" disabled>Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unsure">I'm not sure</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        <div class="text-danger" v-if="validationErrors.diagnosed">
          <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.diagnosed }}
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Overall, how good have you been feeling during the past two weeks? (1 = Very bad, 7 = Very good)</label>
        <input type="range" class="form-range" min="0" max="7" step="1" :value="demographics.feeling"
          @input="$emit('update:demographics', { ...demographics, feeling: $event.target.value }); clearError('feeling')" />

        <div class="mood-labels">
          <span>-</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
        </div>
        <div class="text-danger" v-if="validationErrors.feeling">
          <i class="fas fa-circle-exclamation me-1 mt-2"></i>{{ validationErrors.feeling }}
        </div>
      </div>

      <div class="footer-buttons">
        <button class="btn btn-outline-secondary" @click="$emit('back')">Back</button>
        <button class="btn btn-primary" @click="handleNext">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-range {
  height: 10px;
  -webkit-appearance: none;
  appearance: none;
  background: silver;
  border-radius: 5px;
  padding: .05rem .07rem;
}

.form-range::-webkit-slider-thumb {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #764ba2;
  -webkit-appearance: none;
  position: relative;
  top: -20%;
}

.form-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #764ba2;
  position: relative;
  top: -20%;
}

.form-range::-ms-thumb {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #764ba2;
  position: relative;
  top: -20%;
}

.mood-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 .4rem;
}
.text-danger {
  color: #dc3545;
  font-size: 0.9rem;
}
</style>
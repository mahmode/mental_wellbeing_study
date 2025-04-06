<script setup>
const emit = defineEmits(['update:demographics', 'next', 'back']);

const props = defineProps({
  demographics: Object
})

const updateFeeling = (value) => {
  emit('update:demographics', { ...props.demographics, feeling: value });
};

</script>

<template>
  <div class="page">
    <div class="page-content">
      <h2 class="mb-4">Demographic Information</h2>
      <p>Before we begin, we'd like to ask a few basic questions about you. This information will help us understand the diversity of participants in this study.</p>
    
      <div class="mb-4">
        <label class="form-label">Which age group do you belong to?</label>
        <select 
          class="form-select" 
          :value="demographics.age"
          @change="$emit('update:demographics', { ...demographics, age: $event.target.value })"
        >
          <option value="" disabled selected>Select your age group</option>
          <option value="20-">Younger than 20</option>
          <option value="20s">20 - 29</option>
          <option value="30s">30 - 39</option>
          <option value="40s">40 - 49</option>
          <option value="50s">50 - 59</option>
          <option value="60+">60 or older</option>
        </select>
      </div>
    
      <div class="mb-4">
        <label class="form-label">What is your gender?</label>
        <select class="form-select" 
          :value="demographics.gender"
          @change="$emit('update:demographics', { ...demographics, gender: $event.target.value })">
          <option value="" disabled>Select your gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>

        <!-- Conditional input for 'Other' -->
        <div v-if="demographics.gender === 'other'" class="mt-2">
          <label class="form-label">Please specify</label>
          <input type="text" class="form-control"
            :value="demographics.customGender || ''"
            @input="$emit('update:demographics', { ...demographics, customGender: $event.target.value })" />
        </div>
      </div>
    
      <div class="mb-4">
        <label class="form-label">What level of education are you currently pursuing?</label>
        <select 
          class="form-select" 
          :value="demographics.education"
          @change="$emit('update:demographics', { ...demographics, education: $event.target.value })"
        >
          <option value="" disabled selected>Select your education level</option>
          <option value="high-school">High School</option>
          <option value="bachelors">Bachelor's Degree</option>
          <option value="masters">Master's Degree</option>
          <option value="phd">PhD/Doctorate</option>
          <option value="other">Other</option>
        </select>

        <!-- Conditional input for 'Other' -->
        <div v-if="demographics.education === 'other'" class="mt-2">
          <label class="form-label">Please specify</label>
          <input type="text" class="form-control"
            :value="demographics.customEducation || ''"
            @input="$emit('update:demographics', { ...demographics, customEducation: $event.target.value })" />
        </div>
      </div>
      
      <div class="mb-4">
        <label class="form-label">What is your current field of study?</label>
        <input 
          type="text" 
          class="form-control" 
          :value="demographics.field"
          @input="$emit('update:demographics', { ...demographics, field: $event.target.value })"
        >
      </div>
      
      <div class="mb-4">
        <label class="form-label">Do you have a part-time or full-time job in addition to your studies?</label>
        <select class="form-select" :value="demographics.employment"
          @change="$emit('update:demographics', { ...demographics, employment: $event.target.value })">
          <option value="" disabled selected>Select your employment status</option>
          <option value="full-time">Yes, full-time employed</option>
          <option value="part-time">Yes, part-time employed</option>
          <option value="unemployed">No, I'm not employed</option>
          <option value="other">Other</option>
        </select>

        <!-- Conditional input for 'Other' -->
        <div v-if="demographics.employment === 'other'" class="mt-2">
          <label class="form-label">Please specify</label>
          <input type="text" class="form-control"
            :value="demographics.customEmployment || ''"
            @input="$emit('update:demographics', { ...demographics, customEmployment: $event.target.value })" />
        </div>
      </div>
      
      <div class="mb-4">
        <label class="form-label">Do you live alone or with others?</label>
        <select 
          class="form-select" 
          :value="demographics.living"
          @change="$emit('update:demographics', { ...demographics, living: $event.target.value })"
        >
          <option value="" disabled selected>Select your living situation</option>
          <option value="alone">Alone</option>
          <option value="roommates">With roommates</option>
          <option value="family">With family</option>
          <option value="partner">With partner/spouse</option>
        </select>
      </div>
      
      <div class="mb-4">
        <label class="form-label">Have you ever been diagnosed with a mental health condition?</label>
        <select 
          class="form-select" 
          :value="demographics.diagnosed"
          @change="$emit('update:demographics', { ...demographics, diagnosed: $event.target.value })"
        >
          <option value="" disabled selected>Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unsure">I'm not sure</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
      
      <div class="mb-4">
        <label class="form-label">Overall, how good have you been feeling during the past two weeks?</label>
        <!-- (1 = Very Bad, 7 = Very Good) -->
        
        <input type="range" class="form-range" min="1" max="7" step="1" :value="demographics.feeling"
        @input="updateFeeling($event.target.value)" />
        <!-- @input="$emit('update:demographics', { ...demographics, feeling: $event.target.value })" /> -->


        <!-- <div class="mood-labels">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
        </div> -->

        <div class="mood-labels">
          <span class="emoji" @click="updateFeeling(1)">😞</span> <!-- Very Sad -->
          <span class="emoji" @click="updateFeeling(2)">😔</span> <!-- Sad -->
          <span class="emoji" @click="updateFeeling(3)">😕</span> <!-- Slightly Unhappy -->
          <span class="emoji" @click="updateFeeling(4)">😐</span> <!-- Neutral -->
          <span class="emoji" @click="updateFeeling(5)">🙂</span> <!-- Slightly Happy -->
          <span class="emoji" @click="updateFeeling(6)">😊</span> <!-- Happy -->
          <span class="emoji" @click="updateFeeling(7)">😁</span> <!-- Very Happy -->
        </div>
      </div>
      
      <div class="footer-buttons">
        <button class="btn btn-outline-secondary" @click="$emit('back')">Back</button>
        <button class="btn btn-primary" @click="$emit('next')">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-content {
  flex: 1; /* Takes all available space */
  padding-bottom: 20px; /* Prevents footer overlap */
}

/* Smooth scrolling behavior */
.page {
  scroll-behavior: smooth;
}

.form-range {
  width: 100%;
  height: 10px;
  -webkit-appearance: none; /* Remove default appearance in Webkit browsers */
  appearance: none;
  background: transparent;
  border-radius: 5px;
  padding: 0 .4rem; /* Add padding to the top and bottom */
}

.form-range::-webkit-slider-runnable-track {
  height: 10px;
  background: linear-gradient(to right, #d42b2b, #ffbf00, #00c700); /* Gradient from red (sad) to green (happy) */
  border-radius: 5px;
}

.form-range::-moz-range-track {
  height: 10px;
  background: linear-gradient(to right, #d42b2b, #ffbf00, #00c700);
  border-radius: 5px;
}

.form-range::-ms-track {
  height: 10px;
  background: linear-gradient(to right, #d42b2b, #ffbf00, #00c700);
  border-radius: 5px;
  border-color: transparent; /* Hide default border */
  color: transparent; /* Hide default color */
}

.form-range::-webkit-slider-thumb {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #333; /* Optional: Thumb border */
  -webkit-appearance: none;
}

.form-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #333;
}

.form-range::-ms-thumb {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #333;
}

.emoji {
  font-size: 1.5rem;
  cursor: pointer;
}

.mood-labels {
  display: flex;
  justify-content: space-between;
}
</style>
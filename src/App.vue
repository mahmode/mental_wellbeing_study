<script setup>
import { ref, computed } from 'vue'
import ConsentPage from './components/ConsentPage.vue'
import DemographicsPage from './components/DemographicsPage.vue'
import MainQuestionPage from './components/MainQuestionPage.vue'
import ReviewSciencePage from './components/ReviewSciencePage.vue'
import ReviewSocietyPage from './components/ReviewSocietyPage.vue'
import ThankYouPage from './components/ThankYouPage.vue'
import Footer from './components/Footer.vue'

const currentPage = ref(1)
const totalPages = 6
const consent = ref('')
const baseResponse = ref('')
const scienceResponse = ref('')
const societyResponse = ref('')

const demographics = ref({
  age: '',
  gender: '',
  education: '',
  field: '',
  employment: '',
  living: '',
  diagnosed: '',
  feeling: 4
})

const progress = computed(() => (currentPage.value / totalPages) * 100)

const nextPage = () => {
  if (currentPage.value < totalPages)
    currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1)
    currentPage.value--
}

const submitForm = () => {
  // In a real app, send data to server here
  console.log('Form submitted:', {
    consent: consent.value,
    demographics: demographics.value,
    baseResponse: baseResponse.value,
    scienceResponse: scienceResponse.value,
    societyResponse: societyResponse.value
  })
  
  // Reset form after submission
  currentPage.value = 1
  consent.value = ''
  baseResponse.value = ''
  scienceResponse.value = ''
  societyResponse.value = ''
  demographics.value = {
    age: '',
    gender: '',
    education: '',
    field: '',
    employment: '',
    living: '',
    diagnosed: '',
    feeling: 4
  }
}
</script>

<template>
  <div class="app-wrapper">

    <header class="app-header">
      <div class="header-content">
        <h1>Mental Wellbeing Study</h1>
        <p>Understanding student mental health experiences</p>
      </div>
    </header>

    <main class="app-content">
      <div class="questionnaire-container">
        <div class="progress rounded-0" style="height: 6px;">
          <div class="progress-bar" role="progressbar" :style="{width: progress + '%'}" 
              aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        
        <ConsentPage 
          v-if="currentPage === 1" 
          v-model:consent="consent" 
          @next="nextPage"
        />
        
        <DemographicsPage 
          v-if="currentPage === 2" 
          v-model:demographics="demographics" 
          @next="nextPage" 
          @back="prevPage"
        />
        
        <MainQuestionPage 
          v-if="currentPage === 3" 
          v-model:response="baseResponse" 
          @next="nextPage" 
          @back="prevPage"
        />
        
        <ReviewSciencePage 
          v-if="currentPage === 4" 
          :response="baseResponse"
          @update:response="(val) => scienceResponse = val"
          @next="nextPage" 
          @back="prevPage"
        />

        <ReviewSocietyPage 
          v-if="currentPage === 5" 
          :response="scienceResponse"
          @update:response="(val) => societyResponse = val"
          @next="nextPage" 
          @back="prevPage"
        />
        
        <ThankYouPage 
          v-if="currentPage === 6" 
          @submit="submitForm"
        />
      </div>
    </main>

    <Footer />

  </div>
</template>
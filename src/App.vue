<script setup>
import { ref, computed } from 'vue'
import ConsentPage from './components/ConsentPage.vue'
import DemographicsPage from './components/DemographicsPage.vue'
import MainQuestionPage from './components/MainQuestionPage.vue'
import ReviewSciencePage from './components/ReviewSciencePage.vue'
import ReviewSocietyPage from './components/ReviewSocietyPage.vue'
import ThankYouPage from './components/ThankYouPage.vue'
import Footer from './components/Footer.vue'
import { useRoute } from 'vue-router'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const route = useRoute()
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

const firebaseConfig = {
  apiKey: "AIzaSyDxoeEvjQ2jbFR8Cqtkq6kqYnvWNH7wKaM",
  authDomain: "mental-wellbeing-study.firebaseapp.com",
  projectId: "mental-wellbeing-study",
  storageBucket: "mental-wellbeing-study.firebasestorage.app",
  messagingSenderId: "225083005048",
  appId: "1:225083005048:web:92e24bb7143c637606358d"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

async function addData() {
  try {
    const docRef = await addDoc(collection(db, "data"), {
      prolific_id: route.query.prolific_id,
      demographics: demographics.value,
      baseResponse: baseResponse.value,
      scienceResponse: scienceResponse.value,
      societyResponse: societyResponse.value
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const progress = computed(() => (currentPage.value / totalPages) * 100)

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++

    if (currentPage.value === 4) // ReviewSciencePage
      scienceResponse.value = baseResponse.value;
    else if (currentPage.value === 5) // ReviewSocietyPage
      societyResponse.value = scienceResponse.value;
  }
}

const prevPage = () => {
  if (currentPage.value > 1)
    currentPage.value--
}

const submitForm = () => {
  addData();
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
          v-model:response="scienceResponse"
          @next="nextPage" 
          @back="prevPage"
        />

        <ReviewSocietyPage 
          v-if="currentPage === 5" 
          v-model:response="societyResponse"
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
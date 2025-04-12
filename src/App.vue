<script setup>
import { ref, computed } from 'vue'
import ConsentPage from './components/ConsentPage.vue'
import DemographicsPage from './components/DemographicsPage.vue'
import QuestionPage from './components/QuestionPage.vue'
import QuestionAudioPage from './components/QuestionAudioPage.vue'
import QuestionVideoPage from './components/QuestionVideoPage.vue'
import ThankYouPage from './components/ThankYouPage.vue'
import Footer from './components/Footer.vue'
import { useRoute } from 'vue-router'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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
  feeling: 0
})

const questionTitle = "Your Mental Wellbeing Experience"
const questionDesc = ["We are interested in your thoughts and experiences regarding mental wellbeing.",
                      "Please share any thoughts or experiences you've had regarding your mental wellbeing. This could include challenges you've faced, coping strategies you've found helpful, or any other relevant experiences."];
const reviewScieneTitle = "Advancing Mental Wellbeing Research";
const reviewScienceDesc = ["Your response is valuable! By sharing your thoughts, you're contributing to scientific research that helps improve our understanding of mental well-being. Would you be willing to provide more details or elaborate on your previous response?"];
const reviewSocietyTitle = "Contributing to a better society";
const reviewSocietyDesc = ["This research aims to improve lives and create positive change in society. Your insights are invaluable. Do you have any additional thoughts to share?"];

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const variant = computed(() => route.path.split('/')[1])

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

const prolificIdMissing = ref(false);

async function addData() {
  try {
    const docRef = await addDoc(collection(db, "data"), {
      prolific_id: route.query.prolific_id,
      demographics: demographics.value,
      baseResponse: baseResponse.value,
      scienceResponse: scienceResponse.value,
      societyResponse: societyResponse.value,
      createdAt: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const submitForm = () => {
    prolificIdMissing.value = !route.query.prolific_id;
    
    if (!prolificIdMissing.value)
      addData();
}

const progress = computed(() => (currentPage.value / totalPages) * 100)

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++

    if (currentPage.value === 4) // Review Science Page
      scienceResponse.value = baseResponse.value;
    else if (currentPage.value === 5) // Review Society Page
      societyResponse.value = scienceResponse.value;
  }
}

const prevPage = () => {
  if (currentPage.value > 1)
    currentPage.value--
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
        
        <div class="progress rounded-0" style="height: 6px; margin-top: 10px;">
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
        
        <QuestionPage
          v-if="currentPage === 3 && variant !== 'audio' && variant !== 'video'" 
          v-model:response="baseResponse"
          :title="questionTitle"
          :description="questionDesc"
          
          @next="nextPage" 
          @back="prevPage"
        />

        <QuestionPage 
          v-if="currentPage === 4 && variant !== 'audio' && variant !== 'video'" 
          v-model:response="scienceResponse"
          :title="reviewScieneTitle"
          :description="reviewScienceDesc"
          
          @next="nextPage" 
          @back="prevPage"
        />
        
        <QuestionPage 
          v-if="currentPage === 5 && variant !== 'audio' && variant !== 'video'" 
          v-model:response="societyResponse"
          :title="reviewSocietyTitle"
          :description="reviewSocietyDesc"

          @next="nextPage" 
          @back="prevPage"
        />

        <QuestionAudioPage
          v-if="currentPage === 3 && variant === 'audio'" 
          v-model:response="baseResponse" 
          :title="questionTitle"

          @next="nextPage" 
          @back="prevPage"
        />
        
        <QuestionAudioPage 
          v-if="currentPage === 4 && variant === 'audio'" 
          v-model:response="scienceResponse"
          :title="reviewScieneTitle"

          @next="nextPage" 
          @back="prevPage"
        />

        <QuestionAudioPage 
          v-if="currentPage === 5 && variant === 'audio'" 
          v-model:response="societyResponse"
          :title="reviewSocietyTitle"

          @next="nextPage" 
          @back="prevPage"
        />

        <QuestionVideoPage
          v-if="currentPage === 3 && variant === 'video'" 
          v-model:response="baseResponse" 
          :title="questionTitle"

          @next="nextPage" 
          @back="prevPage"
        />
        
        <QuestionVideoPage 
          v-if="currentPage === 4 && variant === 'video'" 
          v-model:response="scienceResponse"
          :title="reviewScieneTitle"

          @next="nextPage" 
          @back="prevPage"
        />

        <QuestionVideoPage 
          v-if="currentPage === 5 && variant === 'video'" 
          v-model:response="societyResponse"
          :title="reviewSocietyTitle"

          @next="nextPage" 
          @back="prevPage"
        />
        
        <ThankYouPage
          v-if="currentPage === 6 & !prolificIdMissing"
          @submit="submitForm"
        />

        <div v-if="prolificIdMissing" class="alert alert-danger" style="margin-top: 50%;" role="alert">
          <i class="fas fa-triangle-exclamation me-2"></i>
          Error: Missing Prolific ID. Please make sure the Prolific ID is included in the URL.
        </div>

      </div>
    </main>

    <Footer />

  </div>
</template>
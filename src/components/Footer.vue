<script setup>

</script>

<template>
  <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-left">
          <div class="footer-brand">
            <svg class="logo" viewBox="0 0 24 24" fill="#e63946">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              <path d="M15 9c0 1.65-1.35 3-3 3s-3-1.35-3-3 1.35-3 3-3 3 1.35 3 3z" fill="#fff"/>
            </svg>
            <span class="brand-name">MindWell</span>
          </div>
          <div class="copyright">
            &copy; {{ new Date().getFullYear() }} All rights reserved
          </div>
        </div>
        
        <div class="footer-links">
          <!-- <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms</a> -->
          <a href="mailto:mahmoud.ali@oulu.fi">Contact</a>
        </div>
      </div>
    </footer>
</template>
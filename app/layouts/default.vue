<template>
  <div class="bg-background text-on-background font-body-md custom-cursor min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
    <!-- CRT Screen Overlay Effects -->
    <div class="scanlines"></div>
    <div class="scanline"></div>

    <!-- Top Navigation Bar -->
    <header class="w-full top-0 sticky z-50 bg-background border-b-4 border-surface-container-highest shadow-[4px_4px_0px_0px_#701c8e]">
      <nav class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <!-- Logo / Title -->
        <NuxtLink 
          to="/" 
          class="text-headline-lg font-headline-lg font-extrabold text-primary uppercase tracking-tighter cursor-pointer select-none"
          @mouseover="scrambleText($event)"
        >
          PORTFOLIO_OS_V1.0
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex gap-gutter items-center">
          <NuxtLink 
            to="/" 
            class="font-label-sm text-label-sm uppercase transition-all duration-75 hover:text-secondary hover:translate-x-0.5 hover:translate-y-0.5"
            active-class="text-primary border-b-4 border-primary pb-1"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="font-label-sm text-label-sm uppercase transition-all duration-75 hover:text-secondary hover:translate-x-0.5 hover:translate-y-0.5"
            active-class="text-primary border-b-4 border-primary pb-1"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/projects" 
            class="font-label-sm text-label-sm uppercase transition-all duration-75 hover:text-secondary hover:translate-x-0.5 hover:translate-y-0.5"
            active-class="text-primary border-b-4 border-primary pb-1"
          >
            Projects
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="font-label-sm text-label-sm uppercase transition-all duration-75 hover:text-secondary hover:translate-x-0.5 hover:translate-y-0.5"
            active-class="text-primary border-b-4 border-primary pb-1"
          >
            Contact
          </NuxtLink>
          
          <button 
            class="bg-primary-container text-on-primary-container px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#701c8e] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-label-sm text-label-sm font-bold uppercase active:translate-x-1 active:translate-y-1 active:shadow-none"
            @click="simulatedLogin"
          >
            LOGIN_CMD
          </button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button 
          class="md:hidden text-primary flex items-center justify-center"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span class="material-symbols-outlined text-4xl">
            {{ isMobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </nav>

      <!-- Mobile Navigation Drawer -->
      <transition name="drawer">
        <div 
          v-if="isMobileMenuOpen" 
          class="md:hidden w-full bg-surface border-t-4 border-surface-container-highest p-6 space-y-6 flex flex-col shadow-[0_8px_0px_0px_#701c8e]"
        >
          <NuxtLink 
            to="/" 
            class="font-label-sm text-lg uppercase transition-all duration-75 hover:text-secondary block py-2 border-b-2 border-surface-container-highest"
            active-class="text-primary font-bold pl-2 border-l-4 border-primary"
            @click="isMobileMenuOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="font-label-sm text-lg uppercase transition-all duration-75 hover:text-secondary block py-2 border-b-2 border-surface-container-highest"
            active-class="text-primary font-bold pl-2 border-l-4 border-primary"
            @click="isMobileMenuOpen = false"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/projects" 
            class="font-label-sm text-lg uppercase transition-all duration-75 hover:text-secondary block py-2 border-b-2 border-surface-container-highest"
            active-class="text-primary font-bold pl-2 border-l-4 border-primary"
            @click="isMobileMenuOpen = false"
          >
            Projects
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="font-label-sm text-lg uppercase transition-all duration-75 hover:text-secondary block py-2 border-b-2 border-surface-container-highest"
            active-class="text-primary font-bold pl-2 border-l-4 border-primary"
            @click="isMobileMenuOpen = false"
          >
            Contact
          </NuxtLink>

          <button 
            class="bg-primary-container text-on-primary-container w-full py-3 border-4 border-black shadow-[4px_4px_0px_0px_#701c8e] hover:shadow-none hover:translate-x-1 hover:translate-y-1 font-bold uppercase transition-all"
            @click="simulatedLogin(); isMobileMenuOpen = false;"
          >
            LOGIN_CMD
          </button>
        </div>
      </transition>
    </header>

    <!-- Main Content Container -->
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="w-full mt-auto bg-surface-container-lowest border-t-4 border-surface-container-highest">
      <div class="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 gap-gutter max-w-container-max mx-auto">
        <div class="text-label-sm font-label-sm text-on-surface uppercase text-center md:text-left">
          © 199X IT_STUDENT_DEV. ALL RIGHTS RESERVED.
        </div>
        <div class="flex gap-gutter my-4 md:my-0">
          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm uppercase">GITHUB</a>
          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm uppercase">LINKEDIN</a>
          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm uppercase">TERMINAL</a>
        </div>
        <div class="flex items-center gap-2 text-tertiary font-bold font-label-sm text-label-sm uppercase">
          <span class="w-3 h-3 bg-tertiary rounded-full animate-pulse"></span>
          SYSTEM_ONLINE
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const scrambleText = (event) => {
  const element = event.target
  const originalText = element.dataset.original || element.innerText
  if (!element.dataset.original) {
    element.dataset.original = originalText
  }
  
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let iteration = 0
  clearInterval(element.interval)
  
  element.interval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index]
        }
        return letters[Math.floor(Math.random() * letters.length)]
      })
      .join("")
    
    if (iteration >= originalText.length) { 
      clearInterval(element.interval)
    }
    
    iteration += 1 / 3
  }, 30)
}

const simulatedLogin = () => {
  alert('CMD: Initializing login shell...\nError: Terminal connection interrupted.')
}
</script>

<style scoped>
.drawer-enter-active, .drawer-leave-active {
  transition: all 0.2s ease-out;
}
.drawer-enter-from, .drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

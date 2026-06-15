<template>
  <div class="bg-background text-on-background font-body-md custom-cursor min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
    <!-- CRT Screen Overlay Effects -->
    <div class="scanlines"></div>
    <div class="scanline"></div>

    <!-- Top Navigation Bar -->
    <header class="w-full top-0 sticky z-50 bg-background border-b-4 border-surface-container-highest shadow-[4px_4px_0px_0px_#701c8e]">
      <nav class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-headline-lg font-headline-lg font-extrabold text-primary uppercase tracking-tighter cursor-pointer select-none hover:text-primary/80 transition-colors"
        >
          {{ data.siteName }}
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex gap-gutter items-center">
          <NuxtLink
            v-for="link in navLinks" :key="link.to"
            :to="link.to"
            class="font-label-sm text-label-sm uppercase transition-all duration-75 hover:text-secondary hover:translate-x-0.5 hover:translate-y-0.5"
            active-class="text-primary border-b-4 border-primary pb-1"
          >
            {{ link.label }}
          </NuxtLink>

          <button
            class="bg-primary-container text-on-primary-container px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#701c8e] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-label-sm text-label-sm font-bold uppercase"
            @mousedown="shakeBtn"
          >
            LOGIN_CMD
          </button>
        </div>

        <!-- Mobile Toggle -->
        <button
          class="md:hidden text-primary"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span class="material-symbols-outlined text-4xl">
            {{ isMobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </nav>

      <!-- Mobile Drawer -->
      <transition name="drawer">
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden w-full bg-surface border-t-4 border-surface-container-highest p-6 space-y-4 flex flex-col shadow-[0_8px_0px_0px_#701c8e]"
        >
          <NuxtLink
            v-for="link in navLinks" :key="link.to"
            :to="link.to"
            class="font-label-sm text-lg uppercase py-3 border-b-2 border-surface-container-highest block transition-all hover:text-secondary hover:pl-2"
            active-class="text-primary font-bold pl-2 border-l-4 border-primary"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="w-full mt-auto bg-surface-container-lowest border-t-4 border-surface-container-highest">
      <div class="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 gap-gutter max-w-container-max mx-auto">
        <div class="text-label-sm font-label-sm text-on-surface uppercase text-center md:text-left">
          {{ data.footerText }}
        </div>
        <div class="flex gap-gutter my-4 md:my-0">
          <a :href="data.social.github" target="_blank" class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm uppercase">GITHUB</a>
          <a :href="data.social.linkedin" target="_blank" class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm uppercase">LINKEDIN</a>
          <a :href="'mailto:' + data.social.email" class="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm uppercase">EMAIL</a>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { portfolioData as data } from '~/data/portfolio.js'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact',  label: 'Contact' },
]

// ---- Shake animation on button ----
const shakeBtn = (e) => {
  const btn = e.currentTarget
  btn.classList.add('shake')
  setTimeout(() => btn.classList.remove('shake'), 400)
}

// ---- Pixel Cursor Trail ----
const trailColors = ['#ffc485', '#eeb1ff', '#00e5f4', '#ffc485']
let lastTrailTime = 0

const createTrail = (e) => {
  const now = Date.now()
  if (now - lastTrailTime < 60) return   // throttle: one dot per 60ms
  lastTrailTime = now

  const dot = document.createElement('div')
  dot.className = 'cursor-trail-dot'
  dot.style.left = e.clientX + 'px'
  dot.style.top  = e.clientY + 'px'
  dot.style.backgroundColor = trailColors[Math.floor(Math.random() * trailColors.length)]
  document.body.appendChild(dot)

  setTimeout(() => { if (dot.parentNode) dot.parentNode.removeChild(dot) }, 520)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', createTrail)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', createTrail)
  }
})
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

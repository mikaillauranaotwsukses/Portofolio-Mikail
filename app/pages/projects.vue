<template>
  <div class="pixel-grid min-h-screen">
    <!-- Header Section -->
    <section class="mb-16">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 
            class="font-display-lg text-display-lg text-primary uppercase mb-4"
            @mouseover="scrambleText($event)"
          >
            Project_Archive
          </h1>
          <p class="max-w-2xl text-on-surface-variant font-body-md border-l-4 border-secondary-container pl-6">
            System successfully initialized. Accessing academic records and development logs. Exploring high-priority software engineering deliverables from the 202X curriculum.
          </p>
        </div>
        <div class="flex gap-4">
          <span class="bg-surface-container-high border-2 border-primary-container px-4 py-2 font-label-sm text-label-sm text-primary-fixed uppercase flex items-center gap-2">
            <span class="w-2 h-2 bg-primary animate-pulse"></span>
            Status: Online
          </span>
        </div>
      </div>
    </section>

    <!-- Projects Bento Grid -->
    <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <!-- Project Card 01: Large Feature -->
      <div class="md:col-span-8 group bg-surface-container-low border-4 border-black hard-shadow overflow-hidden flex flex-col md:flex-row hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75">
        <div class="md:w-1/2 relative bg-surface-container-highest min-h-[220px]">
          <img 
            alt="Cyberpunk Server Terminal" 
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvC9_LWmtFIK36O-1aTUd0W7qh1aukEzKcnxudC6plWlYhV6DFQmCNVjpptgCHnS1sj5Vw6m9vR7-yVMrv-ANEFOUhbaYbMuJ2joU28Z7HaEcCos6qKcYLmb2SPFI11-L1Ayl2bGvWntmaLeeg1nRIctJ5F2s2hIYCY-YrKT8QxtPVovwGKNEPmr0lE0X3fg4pfII-c5tZbtQtGYlL9rPdj7-p8bxsLEXvm5Q6ZCicO0C9lLMJBgmU3TWOP8ah38sUPw86M_G2l1I"
          />
          <div class="absolute top-4 left-4 bg-primary text-black px-3 py-1 font-bold text-label-sm uppercase">LVL_01</div>
        </div>
        <div class="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-4 text-tertiary">
              <span class="material-symbols-outlined text-3xl">database</span>
              <span class="font-label-sm uppercase tracking-widest">Backend Systems</span>
            </div>
            <h2 class="font-headline-lg text-headline-lg text-on-background uppercase mb-4">Neural_Net_v2</h2>
            <p class="text-on-surface-variant mb-6 text-sm">
              Distributed architecture implementation using microservices. Optimized for low-latency data synchronization across legacy hardware nodes.
            </p>
            <div class="flex flex-wrap gap-2 mb-8">
              <span class="border-2 border-tertiary px-2 py-1 text-label-sm text-tertiary">PYTHON</span>
              <span class="border-2 border-tertiary px-2 py-1 text-label-sm text-tertiary">DOCKER</span>
              <span class="border-2 border-tertiary px-2 py-1 text-label-sm text-tertiary">REDIS</span>
            </div>
          </div>
          <button 
            class="w-full border-2 border-primary text-primary py-3 font-bold uppercase hover:bg-primary hover:text-black transition-colors flex items-center justify-center gap-2 active:translate-y-0.5"
            @click="alertSpec('Neural_Net_v2', 'Optimized distributed neural node coordinator using Redis and Docker.')"
          >
            View_Specs <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Project Card 02: Medium -->
      <div class="md:col-span-4 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 flex flex-col">
        <div class="h-48 relative bg-secondary-container p-4 overflow-hidden flex flex-col justify-between">
          <div class="relative z-10 flex justify-between items-start">
            <span class="material-symbols-outlined text-5xl text-white">sports_esports</span>
            <span class="bg-black text-white px-2 py-1 text-label-sm font-bold">LVL_02</span>
          </div>
          <div class="absolute inset-0 opacity-10 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mb-2">Arcade_Core</h3>
            <p class="text-on-surface-variant mb-4 font-body-md text-sm">
              A custom physics engine for 2D platformers built from absolute scratch.
            </p>
          </div>
          <div class="flex flex-wrap gap-2 mt-4">
            <span class="border-2 border-secondary px-2 py-1 text-label-sm text-secondary">C++</span>
            <span class="border-2 border-secondary px-2 py-1 text-label-sm text-secondary">SDL2</span>
          </div>
        </div>
      </div>

      <!-- Project Card 03: Skills Terminal -->
      <div class="md:col-span-4 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 flex flex-col">
        <div class="p-6 border-b-4 border-black bg-surface-container-high flex justify-between items-center">
          <span class="font-bold text-primary uppercase">Load_Progress</span>
          <span class="material-symbols-outlined text-primary">downloading</span>
        </div>
        <div class="p-6 space-y-6">
          <div class="space-y-2">
            <div class="flex justify-between font-label-sm text-sm">
              <span>FRONTEND_DEV</span>
              <span>85%</span>
            </div>
            <div class="h-6 border-2 border-black bg-background flex p-1">
              <div class="w-[85%] bg-primary flex gap-1 overflow-hidden">
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between font-label-sm text-sm">
              <span>SYSTEMS_ENG</span>
              <span>60%</span>
            </div>
            <div class="h-6 border-2 border-black bg-background flex p-1">
              <div class="w-[60%] bg-tertiary flex gap-1 overflow-hidden">
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between font-label-sm text-sm">
              <span>DATABASE_MGMT</span>
              <span>72%</span>
            </div>
            <div class="h-6 border-2 border-black bg-background flex p-1">
              <div class="w-[72%] bg-secondary flex gap-1 overflow-hidden">
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
                <div class="h-full w-4 bg-black/20 shrink-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Card 04: Medium -->
      <div class="md:col-span-8 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 flex flex-col md:flex-row-reverse">
        <div class="md:w-1/3 relative bg-surface-container-highest min-h-[200px]">
          <img 
            alt="Abstract Network Infrastructure" 
            class="w-full h-full object-cover contrast-125 saturate-150 grayscale group-hover:grayscale-0 transition-all duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnzAeCM_8C-7WFC9cz5tvFE2cIe80bLxxW83SCqRM6GymuWnJNGbOCmBCpuHjwXfUFldQbi2A73NeFAKP4RsPh6hCQYPT4pzr8R73v7PE1xPsRU3y3uU3b9LS5s900OxgMD0iO7VtawgIlEayxX3Dip8IqYO9lk83AEl_Bto54ENv1FVOAmXQ2UA6VNj2GTH4S4kALFiEvDdfqIB-qjquDSKPbjxrr1poZiOA7Xw9fiWWFKbqTJRiklrPVbWJmrTl6qoNpL6rzwA8"
          />
          <div class="absolute bottom-4 right-4 bg-tertiary text-black px-3 py-1 font-bold text-label-sm uppercase">LVL_03</div>
        </div>
        <div class="md:w-2/3 p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-4 text-primary">
              <span class="material-symbols-outlined text-3xl">terminal</span>
              <span class="font-label-sm uppercase tracking-widest">Shell Tools</span>
            </div>
            <h2 class="font-headline-lg text-headline-lg text-on-background uppercase mb-4">Command_LDR</h2>
            <p class="text-on-surface-variant mb-6 text-sm">
              A robust terminal-based workflow manager for development environments. Features automated project staging and environment isolation.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-surface-container p-4 border-2 border-black">
                <span class="text-secondary font-bold text-label-sm block mb-1">STARS</span>
                <span class="text-2xl font-headline-lg text-white">1.2K</span>
              </div>
              <div class="bg-surface-container p-4 border-2 border-black">
                <span class="text-tertiary font-bold text-label-sm block mb-1">FORKS</span>
                <span class="text-2xl font-headline-lg text-white">342</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Card 05: Small Item -->
      <div class="md:col-span-4 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="material-symbols-outlined text-4xl text-on-secondary-container">shield</span>
            <span class="text-label-sm text-outline">v0.4.1</span>
          </div>
          <h3 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mb-2">Secure_Key</h3>
          <p class="text-on-surface-variant text-sm mb-6">Zero-knowledge encryption protocol for local storage management.</p>
        </div>
        <div class="flex gap-2">
          <span class="bg-surface-container-highest px-2 py-1 text-label-sm">RUST</span>
          <span class="bg-surface-container-highest px-2 py-1 text-label-sm">WASM</span>
        </div>
      </div>

      <!-- Project Card 06: Small Item -->
      <div class="md:col-span-4 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="material-symbols-outlined text-4xl text-primary">monitoring</span>
            <span class="text-label-sm text-outline">STABLE</span>
          </div>
          <h3 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mb-2">Metrics_OS</h3>
          <p class="text-on-surface-variant text-sm mb-6">Real-time resource monitor with pixel-perfect visual output for terminals.</p>
        </div>
        <div class="flex gap-2">
          <span class="bg-surface-container-highest px-2 py-1 text-label-sm">GO</span>
          <span class="bg-surface-container-highest px-2 py-1 text-label-sm">GRPC</span>
        </div>
      </div>

      <!-- Project Card 07: Small Item -->
      <div class="md:col-span-4 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="material-symbols-outlined text-4xl text-tertiary">cloud</span>
            <span class="text-label-sm text-outline">BETA</span>
          </div>
          <h3 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mb-2">Sky_Stream</h3>
          <p class="text-on-surface-variant text-sm mb-6">Event-driven streaming service architecture for high-concurrency systems.</p>
        </div>
        <div class="flex gap-2">
          <span class="bg-surface-container-highest px-2 py-1 text-label-sm">NODE.JS</span>
          <span class="bg-surface-container-highest px-2 py-1 text-label-sm">KAFKA</span>
        </div>
      </div>
    </section>

    <!-- Pagination/Navigation -->
    <div class="mt-16 flex justify-center items-center gap-4">
      <button class="w-12 h-12 border-4 border-black bg-surface-container-high flex items-center justify-center text-primary hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <div class="flex gap-2">
        <span class="w-10 h-10 border-4 border-black bg-primary text-black flex items-center justify-center font-bold select-none">1</span>
        <span class="w-10 h-10 border-4 border-black bg-surface-container-low text-on-surface flex items-center justify-center font-bold hover:bg-surface-container-high cursor-pointer select-none">2</span>
        <span class="w-10 h-10 border-4 border-black bg-surface-container-low text-on-surface flex items-center justify-center font-bold hover:bg-surface-container-high cursor-pointer select-none">3</span>
      </div>
      <button class="w-12 h-12 border-4 border-black bg-surface-container-high flex items-center justify-center text-primary hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>

    <!-- Floating Terminal Trigger -->
    <div 
      class="fixed bottom-8 right-8 w-16 h-16 bg-primary-container border-4 border-black hard-shadow flex items-center justify-center cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group z-50"
      @click="openTerminal"
    >
      <span class="material-symbols-outlined text-black text-3xl group-hover:rotate-12 transition-transform">terminal</span>
    </div>

    <!-- Terminal Emulation Modal Overlay -->
    <div 
      v-if="isTerminalOpen" 
      class="fixed inset-0 z-[110] bg-black flex items-center justify-center font-mono text-primary p-10 overflow-hidden"
    >
      <div class="max-w-xl w-full space-y-4">
        <div v-for="(line, index) in terminalLines" :key="index" class="text-headline-lg-mobile font-bold">
          {{ line }}
        </div>
        <div v-if="terminalLines.length < 5" class="flex items-center">
          <span class="w-2.5 h-6 bg-primary blink ml-1 shrink-0"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

const alertSpec = (title, desc) => {
  alert(`PROJECT SPECTIFICATION:\n\n[ID]: ${title}\n[SPECS]: ${desc}`)
}

// Terminal modal interactive state
const isTerminalOpen = ref(false)
const terminalLines = ref([])
const terminalTyping = ref(false)

const openTerminal = () => {
  if (terminalTyping.value) return
  isTerminalOpen.value = true
  terminalTyping.value = true
  terminalLines.value = []
  
  const scriptText = [
    "> INITIALIZING_TERMINAL_SESSION...",
    "> ACCESSING_SECURE_PROTOCOLS...",
    "> ERROR: ACCESS_DENIED",
    "> REDIRECTING_TO_STAGING...",
    "> SYSTEM_HALT."
  ]
  
  let lineIndex = 0
  
  const typeNextLine = () => {
    if (lineIndex < scriptText.length) {
      terminalLines.value.push(scriptText[lineIndex])
      lineIndex++
      setTimeout(typeNextLine, 500)
    } else {
      setTimeout(() => {
        isTerminalOpen.value = false
        terminalTyping.value = false
      }, 1500)
    }
  }
  
  typeNextLine()
}
</script>

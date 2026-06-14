<template>
  <div class="space-y-24">
    <!-- Hero Section: Retro Start Game -->
    <section class="relative min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center text-center border-4 border-black bg-surface-container-low shadow-[8px_8px_0px_0px_#ffc485] p-8 overflow-hidden">
      <!-- Background Grid Decoration -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="grid grid-cols-12 h-full w-full">
          <div v-for="n in 24" :key="n" class="border-r border-b border-primary"></div>
        </div>
      </div>
      
      <div class="relative z-10 space-y-8">
        <h1 
          class="text-display-lg font-display-lg text-primary uppercase leading-tight"
          @mouseover="scrambleText($event)"
        >
          IT_STUDENT_<br class="md:hidden"/>DEV_INITIATED
        </h1>
        <p class="text-secondary font-body-md max-w-2xl mx-auto px-4 border-l-4 border-r-4 border-secondary py-2 uppercase">
          SYSTEM STATUS: OPTIMIZED | SKILL LEVEL: RISING | MISSION: ENGINEER ROBUST SOFTWARE SOLUTIONS
        </p>
        <div class="flex flex-col md:flex-row items-center justify-center gap-gutter pt-8">
          <NuxtLink 
            to="/projects"
            class="group relative bg-primary-container text-on-primary-container px-10 py-4 border-4 border-black shadow-[6px_6px_0px_0px_#701c8e] active:translate-x-1 active:translate-y-1 active:shadow-none hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#701c8e] transition-all cursor-pointer inline-block"
          >
            <span class="text-headline-lg-mobile md:text-headline-lg font-headline-lg uppercase flex items-center gap-2">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
              PRESS START
            </span>
          </NuxtLink>
          <NuxtLink 
            to="/about"
            class="text-on-background hover:text-tertiary font-label-sm text-label-sm uppercase flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined">settings</span>
            OPTIONS_MENU
          </NuxtLink>
        </div>
        <div class="pt-12">
          <span class="text-primary font-label-sm text-label-sm uppercase tracking-[0.5em] blink">Insert Coin to Continue</span>
        </div>
      </div>
    </section>

    <!-- Level 1 Bio: Bento Style -->
    <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <div class="md:col-span-12 mb-4">
        <h2 
          class="text-headline-lg font-headline-lg text-tertiary flex items-center gap-4 uppercase"
          @mouseover="scrambleText($event)"
        >
          <span class="bg-tertiary text-on-tertiary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#00363a]">01</span>
          PLAYER_PROFILE_BIO
        </h2>
      </div>

      <!-- Avatar Card -->
      <div class="md:col-span-4 bg-surface-container-high border-4 border-black p-6 shadow-[8px_8px_0px_0px_#701c8e]">
        <div class="aspect-square bg-surface-container-low border-4 border-black mb-6 relative overflow-hidden group">
          <img 
            alt="Tech environment avatar" 
            class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyrOtRQyyC4y-a68ZRTnMKsdjmmca6M0n7EE2ouSOewrkTnfCMNYCZQz9QmAXYTzJpi8Qm1Cdl7JbM0VGMsGFV6f94H6zpqY6erd5vJci5GbZOBq6cnPCkA-KG9e3hGDsaSCcqpy0r-KVy3j8D_9_CGYmMy0JmDQME7xIBvJ6_Z-yf7XN8lZ1O0C9KV7ympez0A0C5ydHy0Wl6ZnP88eEC6KaXMbkvdimpmFX_I6JhY5OSQMqKwvk0LsFiOr85RGpOlA5V9tyBh9s"
          />
          <div class="absolute inset-0 border-4 border-transparent group-hover:border-primary transition-all pointer-events-none"></div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center border-b-2 border-surface-container-highest pb-2">
            <span class="text-label-sm font-label-sm text-on-surface-variant uppercase">Name:</span>
            <span class="text-primary font-bold">ALEX_DEV</span>
          </div>
          <div class="flex justify-between items-center border-b-2 border-surface-container-highest pb-2">
            <span class="text-label-sm font-label-sm text-on-surface-variant uppercase">Class:</span>
            <span class="text-secondary font-bold">FULLSTACK_MAGE</span>
          </div>
          <div class="flex justify-between items-center border-b-2 border-surface-container-highest pb-2">
            <span class="text-label-sm font-label-sm text-on-surface-variant uppercase">XP:</span>
            <span class="text-tertiary font-bold">4096 / 8192</span>
          </div>
        </div>
      </div>

      <!-- Stats & Inventory -->
      <div class="md:col-span-8 flex flex-col gap-gutter">
        <!-- Bio Text -->
        <div class="bg-surface-container-high border-4 border-black p-8 shadow-[8px_8px_0px_0px_#00e5f4] flex-grow">
          <p class="text-on-background text-body-md font-body-md leading-relaxed">
            I am an <span class="text-primary font-bold">IT Student</span> currently navigating the complex dungeons of Computer Science. Specializing in <span class="text-tertiary">system architecture</span> and <span class="text-secondary">web development</span>, I treat every project like a boss battle—strategic, challenging, and rewarding. My mission is to build software that is as durable as an arcade cabinet and as smooth as a 60fps frame-rate.
          </p>
        </div>

        <!-- Skills / Progress Bars -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div class="bg-surface-container-low border-4 border-black p-6">
            <h3 class="text-label-sm font-label-sm text-primary uppercase mb-4">Core_Stats</h3>
            <div class="space-y-6">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-label-sm font-label-sm uppercase text-on-surface">JavaScript</span>
                  <span class="text-label-sm font-label-sm uppercase text-on-surface">80%</span>
                </div>
                <div class="h-6 bg-surface-container-highest border-2 border-black flex gap-1 p-1">
                  <div class="w-[80%] h-full bg-primary flex gap-1">
                    <div class="h-full w-4 bg-white/20"></div>
                    <div class="h-full w-4 bg-white/20"></div>
                    <div class="h-full w-4 bg-white/20"></div>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-label-sm font-label-sm uppercase text-on-surface">Python</span>
                  <span class="text-label-sm font-label-sm uppercase text-on-surface">65%</span>
                </div>
                <div class="h-6 bg-surface-container-highest border-2 border-black flex gap-1 p-1">
                  <div class="w-[65%] h-full bg-tertiary flex gap-1">
                    <div class="h-full w-4 bg-white/20"></div>
                    <div class="h-full w-4 bg-white/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-surface-container-low border-4 border-black p-6">
            <h3 class="text-label-sm font-label-sm text-primary uppercase mb-4">Inventory_Items</h3>
            <div class="flex flex-wrap gap-3">
              <span class="px-3 py-1 border-2 border-tertiary text-tertiary font-label-sm text-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary cursor-default transition-all">React.js</span>
              <span class="px-3 py-1 border-2 border-tertiary text-tertiary font-label-sm text-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary cursor-default transition-all">Node.js</span>
              <span class="px-3 py-1 border-2 border-tertiary text-tertiary font-label-sm text-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary cursor-default transition-all">PostgreSQL</span>
              <span class="px-3 py-1 border-2 border-tertiary text-tertiary font-label-sm text-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary cursor-default transition-all">Docker</span>
              <span class="px-3 py-1 border-2 border-tertiary text-tertiary font-label-sm text-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary cursor-default transition-all">Git_Bash</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Quest Log Preview -->
    <section>
      <div class="mb-8 flex justify-between items-end">
        <h2 
          class="text-headline-lg font-headline-lg text-secondary flex items-center gap-4 uppercase"
          @mouseover="scrambleText($event)"
        >
          <span class="bg-secondary text-on-secondary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#53006f]">02</span>
          ACTIVE_QUEST_LOG
        </h2>
        <NuxtLink 
          to="/projects" 
          class="text-label-sm font-label-sm text-on-surface-variant hover:text-primary uppercase flex items-center gap-2 transition-colors"
        >
          View_All_Quests <span class="material-symbols-outlined">trending_flat</span>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <!-- Project Card 1 -->
        <div class="group bg-surface-container-low border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[8px_8px_0px_0px_#701c8e] overflow-hidden">
          <div class="bg-secondary-container p-3 border-b-4 border-black flex justify-between items-center">
            <span class="text-on-secondary-container font-bold uppercase">Quest: AI_CHATBOT_ENGINE</span>
            <span class="text-on-secondary-container material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">star</span>
          </div>
          <div class="p-6 space-y-4">
            <div class="h-48 bg-black border-2 border-surface-container-highest relative overflow-hidden">
              <img 
                alt="AI Visualization" 
                class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKq_E-IJATVlHiebTzeUSJDqMWrYQCc8GO7YhuBDZ057YtPA5NupXh-P7Tcn4YxlmHP_8K1JzHeNlHQxxPYmOMPyo8WH7MvFEheiDP9axXJXwHlq6TNTSc_c7znd6ICMx_O_0LrjbgmRgevf5R1cXV1FhDaQzCwDqZpSbrF4_Go_lXZGazv8tNBwzDzlJlgddDijJEGFN681H14Yxmf9ycjsGKilW8vtrotLb1Hu-Qvjdhxg08WIgm8z8lTGlIbhfFC4fofVBQ5wQ"
              />
            </div>
            <p class="text-on-surface text-body-md">A sophisticated NLP-driven communication interface designed for real-time customer support automation.</p>
            <div class="flex gap-2">
              <span class="text-[10px] border border-secondary text-secondary px-2">PYTHON</span>
              <span class="text-[10px] border border-secondary text-secondary px-2">OPENAI_API</span>
            </div>
          </div>
        </div>

        <!-- Project Card 2 -->
        <div class="group bg-surface-container-low border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[8px_8px_0px_0px_#00c7d4] overflow-hidden">
          <div class="bg-tertiary-container p-3 border-b-4 border-black flex justify-between items-center">
            <span class="text-on-tertiary-container font-bold uppercase">Quest: DATA_DASHBOARD_OS</span>
            <span class="text-on-tertiary-container material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">verified</span>
          </div>
          <div class="p-6 space-y-4">
            <div class="h-48 bg-black border-2 border-surface-container-highest relative overflow-hidden">
              <img 
                alt="Data Analytics" 
                class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsTT4ULmtFTm6CP8M5ldl1tSxjilCndFq9rSDirrVsFJ61UxP438O7z_mc7chrElIJSXahHxOozdcyCIOKT7Qf49vK9Hba312pPfsQcrdCu23a1GnG9EYq5vuktmtEK2YdnYwbhgxW30K6__PtIVuRmY4IBTUtn9EHEvoSvtgXERNg-li7FntiXup6bjI3kB3TEpnZyeZKq3tvh0jknTO1aoJK0zWGsK3KcxXX-PW1n-ui5BBz5fu-DKnjgfdfwrWxeIuSnyHn4qg"
              />
            </div>
            <p class="text-on-surface text-body-md">Real-time analytical engine for monitoring network traffic and server health across distributed clusters.</p>
            <div class="flex gap-2">
              <span class="text-[10px] border border-tertiary text-tertiary px-2">REACT</span>
              <span class="text-[10px] border border-tertiary text-tertiary px-2">D3.JS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
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
</script>

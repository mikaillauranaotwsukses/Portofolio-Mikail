<template>
  <div class="space-y-16">
    <!-- Hero Profile Section -->
    <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
      <div class="md:col-span-4 flex justify-center">
        <div class="relative w-64 h-64 border-4 border-black bg-surface-container-low shadow-[8px_8px_0px_0px_#701c8e] overflow-hidden">
          <img 
            alt="IT Student Avatar" 
            class="w-full h-full object-cover filter contrast-125 brightness-90 grayscale-[0.3]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5w1O49VEEIqjjmvbL-8F2HA0wsBT_Kwqqqp8DmHoa4VrxCWg3uaYL3nnkUQkdgrMeA-i_7AJFo4cjyP-51cozY8fjKNqTvr7uJ6GbroIMXlkkj9N7T5WOUQFBqRDmBqdwSdAkusn1_L6iVrKarmLUVObo0erqR8zE4sqv9_B7gjRzG-cQBCbD-vVz0hAzUQPcXQ26hctilsj0JVKLs54Qv5aE7EnWTVE3atEUZEDPzHtw9Uev1v-fLmfn1E8xYsgK2kaElZyistg"
          />
          <div class="absolute inset-0 bg-secondary/10 mix-blend-overlay"></div>
        </div>
      </div>
      <div class="md:col-span-8 space-y-6">
        <div class="inline-block bg-secondary text-on-secondary px-4 py-1 border-2 border-black font-label-sm text-label-sm font-bold shadow-[4px_4px_0px_0px_#000] uppercase">
          LVL_22_HUMAN_DEV
        </div>
        <h1 
          class="text-display-lg font-display-lg text-primary leading-none uppercase"
          @mouseover="scrambleText($event)"
        >
          USER: <span class="text-white">ALEX_DEV</span><br/>
          ROLE: <span class="text-tertiary">IT_STUDENT</span>
        </h1>
        <p class="text-body-md font-body-md max-w-xl bg-surface-container-low border-2 border-black p-4 shadow-[4px_4px_0px_0px_#701c8e]">
          [LOG_START] I build digital architecture and solve hardware puzzles. Passionate about the intersection of legacy low-level systems and modern web frameworks. Currently optimizing my brain for Full-Stack development and Cisco networking. [LOG_END]
        </p>
      </div>
    </section>

    <!-- Stats / Power-ups Bento Grid -->
    <section class="space-y-8">
      <h2 
        class="text-headline-lg font-headline-lg text-primary uppercase flex items-center gap-4"
        @mouseover="scrambleText($event)"
      >
        <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">bolt</span>
        CHARACTER_STATS
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <!-- Coding Stats -->
        <div class="bg-surface-container-low border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] space-y-6 group hover:-translate-y-1 transition-transform">
          <div class="flex justify-between items-center">
            <span class="material-symbols-outlined text-tertiary text-4xl">code</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant">INTELLECT +15</span>
          </div>
          <h3 class="font-headline-lg text-2xl uppercase">CODING_SCRIPTS</h3>
          <div class="space-y-4">
            <!-- JS -->
            <div class="space-y-1">
              <div class="flex justify-between text-label-sm font-label-sm uppercase">
                <span>JavaScript</span>
                <span class="text-tertiary">90%</span>
              </div>
              <div class="flex gap-1">
                <div 
                  v-for="i in 10" 
                  :key="i"
                  class="skill-block cursor-pointer"
                  :class="{ filled: i <= 9 }"
                  @mouseenter="hoverState['js'] = i"
                  @mouseleave="hoverState['js'] = null"
                  :style="{ borderColor: hoverState['js'] === i && i > 9 ? '#ffc485' : '#000' }"
                ></div>
              </div>
            </div>
            <!-- Python -->
            <div class="space-y-1">
              <div class="flex justify-between text-label-sm font-label-sm uppercase">
                <span>Python</span>
                <span class="text-tertiary">70%</span>
              </div>
              <div class="flex gap-1">
                <div 
                  v-for="i in 10" 
                  :key="i"
                  class="skill-block cursor-pointer"
                  :class="{ filled: i <= 7 }"
                  @mouseenter="hoverState['py'] = i"
                  @mouseleave="hoverState['py'] = null"
                  :style="{ borderColor: hoverState['py'] === i && i > 7 ? '#ffc485' : '#000' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hardware Stats -->
        <div class="bg-surface-container-low border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] space-y-6 group hover:-translate-y-1 transition-transform">
          <div class="flex justify-between items-center">
            <span class="material-symbols-outlined text-primary text-4xl">memory</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant">DEXTERITY +12</span>
          </div>
          <h3 class="font-headline-lg text-2xl uppercase">HARDWARE_MODS</h3>
          <div class="space-y-4">
            <!-- Assembly -->
            <div class="space-y-1">
              <div class="flex justify-between text-label-sm font-label-sm uppercase">
                <span>System Assembly</span>
                <span class="text-primary">100%</span>
              </div>
              <div class="flex gap-1">
                <div 
                  v-for="i in 10" 
                  :key="i"
                  class="skill-block cursor-pointer"
                  :class="{ filled: i <= 10 }"
                  class-filled="bg-primary"
                  @mouseenter="hoverState['assembly'] = i"
                  @mouseleave="hoverState['assembly'] = null"
                  :style="{ 
                    borderColor: hoverState['assembly'] === i && i > 10 ? '#ffc485' : '#000',
                    backgroundColor: i <= 10 ? '#ffc485' : '#1a1a2e'
                  }"
                ></div>
              </div>
            </div>
            <!-- IoT -->
            <div class="space-y-1">
              <div class="flex justify-between text-label-sm font-label-sm uppercase">
                <span>IoT / Arduino</span>
                <span class="text-primary">60%</span>
              </div>
              <div class="flex gap-1">
                <div 
                  v-for="i in 10" 
                  :key="i"
                  class="skill-block cursor-pointer"
                  :class="{ filled: i <= 6 }"
                  @mouseenter="hoverState['iot'] = i"
                  @mouseleave="hoverState['iot'] = null"
                  :style="{ 
                    borderColor: hoverState['iot'] === i && i > 6 ? '#ffc485' : '#000',
                    backgroundColor: i <= 6 ? '#ffc485' : '#1a1a2e'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Networking Stats -->
        <div class="bg-surface-container-low border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] space-y-6 group hover:-translate-y-1 transition-transform">
          <div class="flex justify-between items-center">
            <span class="material-symbols-outlined text-secondary text-4xl">hub</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant">SYSTEMS +18</span>
          </div>
          <h3 class="font-headline-lg text-2xl uppercase">NET_INFRA</h3>
          <div class="space-y-4">
            <!-- TCP/IP -->
            <div class="space-y-1">
              <div class="flex justify-between text-label-sm font-label-sm uppercase">
                <span>TCP/IP Protocols</span>
                <span class="text-secondary">80%</span>
              </div>
              <div class="flex gap-1">
                <div 
                  v-for="i in 10" 
                  :key="i"
                  class="skill-block cursor-pointer"
                  :class="{ filled: i <= 8 }"
                  @mouseenter="hoverState['tcp'] = i"
                  @mouseleave="hoverState['tcp'] = null"
                  :style="{ 
                    borderColor: hoverState['tcp'] === i && i > 8 ? '#ffc485' : '#000',
                    backgroundColor: i <= 8 ? '#eeb1ff' : '#1a1a2e'
                  }"
                ></div>
              </div>
            </div>
            <!-- Server Admin -->
            <div class="space-y-1">
              <div class="flex justify-between text-label-sm font-label-sm uppercase">
                <span>Server Admin</span>
                <span class="text-secondary">50%</span>
              </div>
              <div class="flex gap-1">
                <div 
                  v-for="i in 10" 
                  :key="i"
                  class="skill-block cursor-pointer"
                  :class="{ filled: i <= 5 }"
                  @mouseenter="hoverState['srv'] = i"
                  @mouseleave="hoverState['srv'] = null"
                  :style="{ 
                    borderColor: hoverState['srv'] === i && i > 5 ? '#ffc485' : '#000',
                    backgroundColor: i <= 5 ? '#eeb1ff' : '#1a1a2e'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pixel-Art Timeline -->
    <section class="space-y-12">
      <h2 
        class="text-headline-lg font-headline-lg text-primary uppercase flex items-center gap-4"
        @mouseover="scrambleText($event)"
      >
        <span class="material-symbols-outlined text-4xl">history</span>
        QUEST_LOG_TIMELINE
      </h2>
      
      <div class="relative ml-8 border-l-4 border-dashed border-surface-container-highest pl-12 space-y-12 py-4">
        <!-- Education Item 1 -->
        <div class="timeline-step relative bg-surface-container p-6 border-4 border-black shadow-[4px_4px_0px_0px_#ffc485] hover:translate-x-2 transition-transform">
          <div class="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
            <span class="font-label-sm text-label-sm text-primary">2022 - PRESENT</span>
            <div class="flex gap-2 mt-2 md:mt-0">
              <span class="bg-primary/20 text-primary border border-primary px-2 py-0.5 text-[10px] uppercase">Bachelor Degree</span>
            </div>
          </div>
          <h4 class="font-headline-lg text-xl text-white mb-2 uppercase">Computer Science University</h4>
          <p class="text-on-surface-variant font-body-md">Specializing in Software Engineering and Artificial Intelligence. Mastering data structures and complex algorithms while maintaining a 3.8 GPA.</p>
        </div>

        <!-- Education Item 2 -->
        <div class="timeline-step relative bg-surface-container p-6 border-4 border-black shadow-[4px_4px_0px_0px_#eeb1ff] hover:translate-x-2 transition-transform">
          <div class="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
            <span class="font-label-sm text-label-sm text-secondary">2021 - 2022</span>
            <div class="flex gap-2 mt-2 md:mt-0">
              <span class="bg-secondary/20 text-secondary border border-secondary px-2 py-0.5 text-[10px] uppercase">Certification</span>
            </div>
          </div>
          <h4 class="font-headline-lg text-xl text-white mb-2 uppercase">Cisco Networking Academy</h4>
          <p class="text-on-surface-variant font-body-md">Completed CCNA 1 &amp; 2. Gained deep understanding of routing, switching, and network security protocols.</p>
        </div>

        <!-- Education Item 3 -->
        <div class="timeline-step relative bg-surface-container p-6 border-4 border-black shadow-[4px_4px_0px_0px_#00e5f4] hover:translate-x-2 transition-transform">
          <div class="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
            <span class="font-label-sm text-label-sm text-tertiary">2019 - 2021</span>
            <div class="flex gap-2 mt-2 md:mt-0">
              <span class="bg-tertiary/20 text-tertiary border border-tertiary px-2 py-0.5 text-[10px] uppercase">High School Diploma</span>
            </div>
          </div>
          <h4 class="font-headline-lg text-xl text-white mb-2 uppercase">Tech High Vocational School</h4>
          <p class="text-on-surface-variant font-body-md">Introduction to Computer Architecture and Maintenance. First place in the Regional Robotics Competition.</p>
        </div>
      </div>
    </section>

    <!-- Terminal Section -->
    <section class="bg-black border-4 border-primary p-6 shadow-[12px_12px_0px_0px_#000] relative overflow-hidden">
      <div class="flex gap-2 mb-4 border-b border-primary/30 pb-2">
        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
        <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <span class="text-[10px] text-primary/50 ml-4 font-label-sm">terminal_v2.0.sh</span>
      </div>
      <div class="space-y-2 text-primary font-body-md overflow-hidden min-h-[120px]">
        <p><span class="text-green-400">guest@portfolio:~$</span> sudo fetch bio_info</p>
        <p>[SUCCESS] Data packet retrieved from memory_bank_01.</p>
        <p>...</p>
        <p class="flex items-center">
          <span class="text-white">{{ terminalText }}</span>
          <span class="w-2.5 h-5 bg-primary ml-1 blink shrink-0"></span>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// Hover state control for stats power blocks
const hoverState = reactive({
  js: null,
  py: null,
  assembly: null,
  iot: null,
  tcp: null,
  srv: null
})

// Scramble text function
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

// Interactive bash typing emulation
const terminalText = ref('')
const fullBio = "I am always looking for new quests to join. If you have a challenge, let's connect!"

onMounted(() => {
  let index = 0
  const typingTimer = setInterval(() => {
    if (index < fullBio.length) {
      terminalText.value += fullBio.charAt(index)
      index++
    } else {
      clearInterval(typingTimer)
    }
  }, 50)
})
</script>

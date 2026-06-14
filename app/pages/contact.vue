<template>
  <div class="crt-flicker">
    <!-- Header Title Section -->
    <div class="text-center mb-12">
      <h1 
        class="text-display-lg font-display-lg text-primary mb-2 uppercase tracking-widest"
        @mouseover="scrambleText($event)"
      >
        Continue?
      </h1>
      <p class="text-tertiary font-label-sm uppercase">Level 99: Final Communication</p>
    </div>

    <!-- Contact Bento Grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      <!-- Form Section -->
      <div class="md:col-span-8">
        <div class="bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#701c8e] p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full bg-secondary-container px-4 py-1 text-on-secondary font-bold text-label-sm uppercase">
            SAVE_GAME_DATA.EXE
          </div>
          
          <form class="mt-6 space-y-6" @submit.prevent="handleSubmit">
            <!-- Player Name -->
            <div class="space-y-2">
              <label 
                class="block uppercase font-bold text-label-sm transition-colors duration-200"
                :class="focusedField === 'name' ? 'text-tertiary' : 'text-primary'"
              >
                Player Name
              </label>
              <input 
                v-model="form.name"
                class="w-full bg-background border-4 border-primary-container text-on-background px-4 py-3 focus:outline-none focus:ring-0 focus:border-tertiary placeholder:text-surface-container-highest font-body-md" 
                placeholder="ENTER NAME..." 
                type="text"
                required
                @focus="focusedField = 'name'"
                @blur="focusedField = null"
              />
            </div>

            <!-- Email Signal Channel -->
            <div class="space-y-2">
              <label 
                class="block uppercase font-bold text-label-sm transition-colors duration-200"
                :class="focusedField === 'email' ? 'text-tertiary' : 'text-primary'"
              >
                Signal Channel (Email)
              </label>
              <input 
                v-model="form.email"
                class="w-full bg-background border-4 border-primary-container text-on-background px-4 py-3 focus:outline-none focus:ring-0 focus:border-tertiary placeholder:text-surface-container-highest font-body-md" 
                placeholder="USER@TERMINAL.NET" 
                type="email"
                required
                @focus="focusedField = 'email'"
                @blur="focusedField = null"
              />
            </div>

            <!-- Message Content -->
            <div class="space-y-2">
              <label 
                class="block uppercase font-bold text-label-sm transition-colors duration-200"
                :class="focusedField === 'message' ? 'text-tertiary' : 'text-primary'"
              >
                Message Content
              </label>
              <textarea 
                v-model="form.message"
                class="w-full bg-background border-4 border-primary-container text-on-background px-4 py-3 focus:outline-none focus:ring-0 focus:border-tertiary placeholder:text-surface-container-highest font-body-md resize-none" 
                placeholder="TRANSMIT MESSAGE..." 
                rows="4"
                required
                @focus="focusedField = 'message'"
                @blur="focusedField = null"
              ></textarea>
            </div>

            <!-- Submit Button with Dynamic States -->
            <button 
              class="w-full md:w-auto bg-primary-container text-on-primary-container px-10 py-4 border-4 border-black shadow-[4px_4px_0px_0px_#701c8e] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 font-bold text-headline-lg-mobile uppercase flex items-center justify-center gap-4 cursor-pointer select-none active:translate-x-1 active:translate-y-1 active:shadow-none" 
              type="submit"
              :disabled="submitState !== 'idle'"
            >
              <template v-if="submitState === 'idle'">
                <span class="material-symbols-outlined">send</span>
                SUBMIT_DATA
              </template>
              <template v-else-if="submitState === 'uploading'">
                <span class="material-symbols-outlined animate-spin">sync</span>
                UPLOADING...
              </template>
              <template v-else-if="submitState === 'success'">
                <span class="material-symbols-outlined text-green-400">check_circle</span>
                SUCCESS
              </template>
            </button>
          </form>
        </div>
      </div>

      <!-- Sidebar Section -->
      <div class="md:col-span-4 space-y-8">
        <!-- Inventory Details -->
        <div class="bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#00e5f4] p-6">
          <div class="bg-tertiary text-on-tertiary px-4 py-1 text-label-sm font-bold uppercase mb-4 inline-block shadow-[2px_2px_0px_0px_#000]">
            Inventory
          </div>
          <div class="flex flex-col gap-4">
            <a 
              href="#" 
              class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-primary transition-colors cursor-pointer"
            >
              <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors">
                <span class="material-symbols-outlined text-on-background group-hover:text-on-primary">terminal</span>
              </div>
              <div>
                <div class="text-label-sm font-bold text-tertiary uppercase">GitHub</div>
                <div class="text-label-sm text-surface-variant">/STUDENT_DEV</div>
              </div>
            </a>
            <a 
              href="#" 
              class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-secondary transition-colors cursor-pointer"
            >
              <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-secondary transition-colors">
                <span class="material-symbols-outlined text-on-background group-hover:text-on-secondary">share</span>
              </div>
              <div>
                <div class="text-label-sm font-bold text-tertiary uppercase">LinkedIn</div>
                <div class="text-label-sm text-surface-variant">/IN/IT_STUDENT</div>
              </div>
            </a>
          </div>
        </div>

        <!-- Coordinates Map -->
        <div class="bg-surface-container-low border-4 border-black p-6">
          <div class="text-label-sm text-primary uppercase font-bold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-label-sm">location_on</span>
            Current Map
          </div>
          <div class="w-full h-32 bg-background border-4 border-surface-container-highest relative overflow-hidden">
            <img 
              class="w-full h-full object-cover grayscale brightness-50 contrast-125" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ73KvqejV_l7B4c_8_bGaAt0uZ3K3gNVOr9oPeiWMZjRl1KHTUJN1dVUTsryiM5DaI9ni6Qa8qzJMWq_bjfafCPebgKWOmRiAXYqT2AhUudzy6Skykde6AsMbE4wwvkt2y8M12NnHUieenfcNef2IfJoe2A-XnEg2CE1sp6-aruKldq4SMKiNRUt1Um3FAqc0i8vcL5vTPwnFmHdmJBaenfL2uM1qG0AE3JxDozhbV2Ew3r7FtR8nfd_l5GEOUESGmRjemo9RdIA"
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="bg-primary text-on-primary p-1 animate-bounce">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person_pin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const focusedField = ref(null)

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

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitState = ref('idle')

const handleSubmit = () => {
  if (submitState.value !== 'idle') return
  submitState.value = 'uploading'
  
  setTimeout(() => {
    submitState.value = 'success'
    setTimeout(() => {
      submitState.value = 'idle'
      form.value.name = ''
      form.value.email = ''
      form.value.message = ''
    }, 2000)
  }, 1500)
}
</script>

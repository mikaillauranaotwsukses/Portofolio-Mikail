<template>
  <!-- =====================================================
       SECTION 2: GRID PROYEK
       ===================================================== -->
  <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter">

    <!-- Loop semua proyek dari data (dengan stagger animation) -->
    <template v-for="(project, index) in projects" :key="project.id">

      <!-- ===================================================
           KARTU LARGE (lebar penuh 12 kolom, layout landscape)
           =================================================== -->
      <div
        v-if="project.size === 'large'"
        class="md:col-span-12 group bg-surface-container-low border-4 border-black hard-shadow overflow-hidden flex flex-col md:flex-row hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 slide-in-up"
        :class="getPrimaryLink(project) ? 'cursor-pointer hover:border-primary' : ''"
        :style="{ animationDelay: (index * 0.1) + 's' }"
        @click="handleCardClick(project, $event)"
      >
        <!-- Gambar Proyek -->
        <div class="md:w-5/12 relative bg-surface-container-highest min-h-[220px] flex items-center justify-center overflow-hidden">
          <img
            v-if="project.imageUrl"
            :alt="project.title"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 absolute inset-0"
            :src="project.imageUrl"
          />
          <!-- Placeholder bersih tanpa icon jika belum ada foto -->
          <div v-else class="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-surface-container border-r-2 border-black">
            <span class="text-xs font-mono uppercase tracking-widest text-primary opacity-80 mb-2">{{ project.subtitle }}</span>
            <span class="font-headline-lg text-lg text-on-background uppercase font-bold tracking-wider">{{ project.title }}</span>
          </div>
        </div>

        <!-- Detail Proyek -->
        <div class="md:w-7/12 p-8 flex flex-col justify-between">
          <div>
            <!-- Custom Kategori (tanpa icon) -->
            <div class="mb-3">
              <span class="inline-block text-xs font-bold font-label-sm uppercase tracking-widest text-primary border-b-2 border-primary pb-0.5">
                {{ project.subtitle }}
              </span>
            </div>
            <h2 class="font-headline-lg text-headline-lg text-on-background uppercase mb-4">{{ project.title }}</h2>
            <p class="text-on-surface-variant mb-6 text-sm leading-relaxed">{{ project.description }}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tag in project.tags" :key="tag"
                class="border-2 px-2 py-1 text-label-sm"
                :class="['border-' + (project.tagColor || 'primary'), 'text-' + (project.tagColor || 'primary')]"
              >{{ tag }}</span>
            </div>
          </div>

          <!-- Tombol Link Proyek -->
          <div class="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-surface-container-highest mt-auto">
            <template v-if="getProjectLinks(project).length > 0">
              <a
                v-for="lnk in getProjectLinks(project)"
                :key="lnk.url"
                :href="lnk.url"
                target="_blank"
                rel="noopener noreferrer"
                class="border-2 border-primary text-primary px-5 py-2.5 font-bold uppercase text-xs hover:bg-primary hover:text-black transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#ffc485]"
                @click.stop
              >
                <span>{{ lnk.label }}</span>
                <span class="text-xs">↗</span>
              </a>
            </template>
            <span v-else class="text-xs text-on-surface-variant font-mono opacity-60 italic">
              [ Belum ada link ]
            </span>
          </div>
        </div>
      </div>


      <!-- ===================================================
           KARTU MEDIUM (6 kolom, layout portrait)
           =================================================== -->
      <div
        v-else-if="project.size === 'medium'"
        class="md:col-span-6 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 flex flex-col slide-in-up"
        :class="getPrimaryLink(project) ? 'cursor-pointer hover:border-primary' : ''"
        :style="{ animationDelay: (index * 0.1) + 's' }"
        @click="handleCardClick(project, $event)"
      >
        <!-- Gambar Header (Bersih, tanpa floating icon) -->
        <div class="h-48 relative bg-surface-container-highest overflow-hidden flex items-center justify-center">
          <img
            v-if="project.imageUrl"
            :alt="project.title"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 absolute inset-0"
            :src="project.imageUrl"
          />
          <div v-else class="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-surface-container border-b-2 border-black">
            <span class="text-xs font-mono uppercase tracking-widest text-primary opacity-80 mb-1">{{ project.subtitle }}</span>
            <span class="font-headline-lg text-base text-on-background uppercase font-bold">{{ project.title }}</span>
          </div>
        </div>

        <!-- Detail Proyek -->
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <!-- Custom Kategori (tanpa icon) -->
            <div class="mb-2">
              <span class="inline-block text-xs font-bold font-label-sm uppercase tracking-widest text-primary border-b-2 border-primary pb-0.5">
                {{ project.subtitle }}
              </span>
            </div>
            <h3 class="font-headline-lg text-xl text-on-background uppercase mb-2">{{ project.title }}</h3>
            <p class="text-on-surface-variant text-sm mb-4 font-body-md leading-relaxed">{{ project.description }}</p>
          </div>

          <div>
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="tag in project.tags" :key="tag"
                class="border-2 px-2 py-1 text-label-sm"
                :class="['border-' + (project.tagColor || 'primary'), 'text-' + (project.tagColor || 'primary')]"
              >{{ tag }}</span>
            </div>

            <!-- Tombol Link Proyek -->
            <div class="flex flex-wrap items-center gap-2 pt-4 border-t-2 border-surface-container-highest mt-4">
              <template v-if="getProjectLinks(project).length > 0">
                <a
                  v-for="lnk in getProjectLinks(project)"
                  :key="lnk.url"
                  :href="lnk.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="border-2 border-primary text-primary px-3 py-1.5 font-bold uppercase text-xs hover:bg-primary hover:text-black transition-all flex items-center gap-1 shadow-[2px_2px_0px_0px_#ffc485]"
                  @click.stop
                >
                  <span>{{ lnk.label }}</span>
                  <span class="text-xs">↗</span>
                </a>
              </template>
              <span v-else class="text-xs text-on-surface-variant font-mono opacity-60 italic">
                [ Belum ada link ]
              </span>
            </div>
          </div>
        </div>
      </div>


      <!-- ===================================================
           KARTU SMALL (4 kolom, layout compact)
           =================================================== -->
      <div
        v-else
        class="md:col-span-4 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 p-6 flex flex-col justify-between slide-in-up"
        :class="getPrimaryLink(project) ? 'cursor-pointer hover:border-primary' : ''"
        :style="{ animationDelay: (index * 0.1) + 's' }"
        @click="handleCardClick(project, $event)"
      >
        <div>
          <!-- Custom Kategori (tanpa icon) -->
          <div class="mb-3">
            <span class="inline-block text-xs font-bold font-label-sm uppercase tracking-widest text-primary border-b-2 border-primary pb-0.5">
              {{ project.subtitle }}
            </span>
          </div>
          <h3 class="font-headline-lg text-xl text-on-background uppercase mb-2">{{ project.title }}</h3>
          <p class="text-on-surface-variant text-sm mb-6 leading-relaxed">{{ project.description }}</p>
        </div>

        <div>
          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in project.tags" :key="tag"
              class="bg-surface-container-highest px-2 py-1 text-label-sm"
            >{{ tag }}</span>
          </div>

          <!-- Tombol Link Proyek -->
          <div class="flex flex-wrap items-center gap-2 pt-4 border-t-2 border-surface-container-highest mt-4">
            <template v-if="getProjectLinks(project).length > 0">
              <a
                v-for="lnk in getProjectLinks(project)"
                :key="lnk.url"
                :href="lnk.url"
                target="_blank"
                rel="noopener noreferrer"
                class="border-2 border-primary text-primary px-3 py-1.5 font-bold uppercase text-xs hover:bg-primary hover:text-black transition-all flex items-center gap-1 shadow-[2px_2px_0px_0px_#ffc485]"
                @click.stop
              >
                <span>{{ lnk.label }}</span>
                <span class="text-xs">↗</span>
              </a>
            </template>
            <span v-else class="text-xs text-on-surface-variant font-mono opacity-60 italic">
              [ Belum ada link ]
            </span>
          </div>
        </div>
      </div>

    </template>
  </section>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    required: true
  }
})

// Ekstrak semua link valid dari project (baik dari array `links` maupun `linkDemo`/`linkRepo`)
const getProjectLinks = (project) => {
  if (!project) return []
  const list = []

  // 1. Ambil dari array `links` jika ada
  if (Array.isArray(project.links)) {
    project.links.forEach(lnk => {
      if (lnk && lnk.url && typeof lnk.url === 'string' && lnk.url.trim()) {
        list.push({
          label: lnk.label?.trim() || 'Kunjungi Link',
          url: lnk.url.trim()
        })
      }
    })
  }

  // 2. Fallback legacy jika `links` belum diisi: baca linkDemo / linkRepo
  if (list.length === 0) {
    if (project.linkDemo && typeof project.linkDemo === 'string' && project.linkDemo.trim()) {
      list.push({ label: 'Live Demo', url: project.linkDemo.trim() })
    }
    if (project.linkRepo && typeof project.linkRepo === 'string' && project.linkRepo.trim()) {
      list.push({ label: 'GitHub', url: project.linkRepo.trim() })
    }
  }

  return list
}

// Dapatkan link utama untuk navigasi saat seluruh kartu diklik
const getPrimaryLink = (project) => {
  const links = getProjectLinks(project)
  return links.length > 0 ? links[0].url : null
}

// Handler saat kartu diklik
const handleCardClick = (project, event) => {
  // Jika klik berasal dari tag <a> atau <button>, biarkan event aslinya berjalan
  if (event.target.closest('a, button')) return

  const primary = getPrimaryLink(project)
  if (primary && typeof window !== 'undefined') {
    window.open(primary, '_blank', 'noopener,noreferrer')
  }
}
</script>

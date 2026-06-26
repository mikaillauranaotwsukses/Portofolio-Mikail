<template>
  <!-- =====================================================
       HALAMAN ADMIN - Panel untuk mengedit isi website
       Akses: http://localhost:3000/admin
       ===================================================== -->

  <!-- LOGIN SCREEN: Tampil jika belum login -->
  <div v-if="!isLoggedIn" class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#ffc485]">
      <!-- Header -->
      <div class="bg-primary-container text-on-primary-container px-6 py-3 border-b-4 border-black flex items-center gap-3">
        <span class="material-symbols-outlined">lock</span>
        <span class="font-label-sm font-bold uppercase">ADMIN_LOGIN.EXE</span>
      </div>

      <!-- Form Login -->
      <div class="p-8 space-y-6">
        <div class="text-center">
          <p class="text-primary font-headline-lg text-2xl uppercase font-bold">🎮 Admin Panel</p>
          <p class="text-on-surface-variant text-sm mt-2 font-body-md">Masukkan password untuk melanjutkan</p>
        </div>

        <div class="space-y-4">
          <label class="block text-label-sm font-label-sm text-on-surface-variant uppercase">Password Admin</label>
          <input
            v-model="loginPassword"
            type="password"
            class="w-full bg-background border-2 border-surface-container-highest text-on-background px-4 py-3 focus:outline-none focus:border-primary font-body-md transition-colors"
            placeholder="Masukkan password..."
            @keyup.enter="doLogin"
          />
          <p v-if="loginError" class="text-red-400 text-label-sm font-label-sm uppercase">
            ❌ {{ loginError }}
          </p>
        </div>

        <button
          class="w-full bg-primary-container text-on-primary-container px-6 py-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-label-sm font-bold uppercase"
          @click="doLogin"
        >
          <span class="material-symbols-outlined align-middle mr-2">login</span>
          MASUK
        </button>
      </div>
    </div>
  </div>


  <!-- DASHBOARD ADMIN: Tampil setelah login -->
  <div v-else class="h-screen flex flex-col">

    <!-- ---- TOP BAR ---- -->
    <header class="shrink-0 z-50 bg-surface-container-lowest border-b-4 border-black flex items-center justify-between px-6 py-3 shadow-[0_4px_0px_0px_#000]">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary text-3xl" style="font-variation-settings: 'FILL' 1;">admin_panel_settings</span>
        <div>
          <p class="text-primary font-bold font-label-sm uppercase text-sm">Admin Panel</p>
          <p class="text-on-surface-variant text-xs font-label-sm">Portfolio OS v1.0</p>
        </div>
      </div>
      <div class="flex gap-3 items-center">
        <!-- Status simpan -->
        <span v-if="saveStatus" class="text-xs font-label-sm uppercase px-3 py-1 border-2"
          :class="saveStatus === 'success' ? 'text-tertiary border-tertiary' : 'text-red-400 border-red-400'">
          {{ saveStatus === 'success' ? '✓ TERSIMPAN' : '✗ ERROR' }}
        </span>
        <!-- Preview -->
        <a
          href="/"
          target="_blank"
          class="hidden md:flex items-center gap-2 border-2 border-tertiary text-tertiary px-4 py-2 hover:bg-tertiary hover:text-on-tertiary transition-all font-label-sm text-xs uppercase"
        >
          <span class="material-symbols-outlined text-sm">open_in_new</span>
          Buka Website
        </a>
        <!-- Logout -->
        <button
          class="flex items-center gap-2 border-2 border-red-500 text-red-400 px-4 py-2 hover:bg-red-500 hover:text-white transition-all font-label-sm text-xs uppercase"
          @click="doLogout"
        >
          <span class="material-symbols-outlined text-sm">logout</span>
          Keluar
        </button>
      </div>
    </header>


    <!-- ---- MAIN LAYOUT (Sidebar + Form + Live Preview) ---- -->
    <div class="flex flex-1 overflow-hidden relative">

      <!-- 1. SIDEBAR NAVIGASI TAB -->
      <aside class="w-20 md:w-56 shrink-0 bg-surface-container-low border-r-4 border-black overflow-y-auto flex flex-col justify-between">
        <nav class="p-3 space-y-1">
          <button
            v-for="tab in tabs" :key="tab.id"
            class="w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 border-2 transition-all font-label-sm text-xs uppercase text-left"
            :class="activeTab === tab.id
              ? 'bg-primary-container text-on-primary-container border-black shadow-[3px_3px_0px_0px_#000]'
              : 'border-transparent text-on-surface-variant hover:border-surface-container-highest hover:text-on-background'"
            @click="activeTab = tab.id"
            :title="tab.label"
          >
            <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
            <span class="hidden md:block">{{ tab.label }}</span>
          </button>
        </nav>

        <!-- Tombol Reset -->
        <div class="p-3 border-t-4 border-black mt-2">
          <button
            class="w-full flex items-center justify-center gap-2 border-2 border-red-500/50 text-red-400 px-3 py-2 hover:bg-red-500/20 transition-all font-label-sm text-xs uppercase"
            @click="doReset"
            title="Reset Default"
          >
            <span class="material-symbols-outlined text-sm">restart_alt</span>
            <span class="hidden md:block">Reset Data</span>
          </button>
        </div>
      </aside>


      <!-- 2. AREA KONTEN FORM -->
      <main class="flex-1 md:w-[450px] md:flex-none border-r-4 border-black overflow-y-auto p-6 md:p-8 space-y-8 pb-32">

        <!-- ==========================================
             TAB: PROFIL
             ========================================== -->
        <section v-if="activeTab === 'profil'" class="space-y-6">
          <h2 class="section-title">👤 Informasi Profil</h2>

          <AdminField label="Nama">
            <input v-model="form.personal.name" type="text" class="admin-input" placeholder="Nama Anda" />
          </AdminField>

          <AdminField label="Role / Jabatan">
            <input v-model="form.personal.role" type="text" class="admin-input" placeholder="IT Student, Web Developer, dll." />
          </AdminField>

          <AdminField label="Tagline Singkat">
            <input v-model="form.personal.tagline" type="text" class="admin-input" placeholder="Tagline di bawah nama" />
          </AdminField>

          <AdminField label="Bio / Deskripsi Diri">
            <textarea v-model="form.personal.bio" class="admin-input resize-none" rows="4" placeholder="Ceritakan tentang diri Anda..."></textarea>
          </AdminField>

          <AdminField label="URL Foto Profil">
            <div class="flex items-center gap-2">
              <input v-model="form.personal.photoUrl" type="url" class="admin-input flex-1" placeholder="https://..." />
              <label class="admin-btn-add cursor-pointer shrink-0 h-[46px] m-0">
                <span class="material-symbols-outlined text-sm">upload</span> Upload
                <input type="file" accept="image/*" class="hidden" @change="e => uploadFile(e, url => form.personal.photoUrl = url)" />
              </label>
            </div>
            <div v-if="form.personal.photoUrl" class="mt-3 flex items-center gap-3">
              <img :src="form.personal.photoUrl" alt="preview" class="w-16 h-16 object-cover border-2 border-primary" />
              <span class="text-xs text-on-surface-variant font-label-sm">Preview foto</span>
            </div>
          </AdminField>
        </section>


        <!-- ==========================================
             TAB: HERO
             ========================================== -->
        <section v-if="activeTab === 'hero'" class="space-y-6">
          <h2 class="section-title">🏠 Halaman Utama (Hero)</h2>

          <AdminField label="Judul Besar (Nama / Headline)">
            <input v-model="form.hero.title" type="text" class="admin-input" placeholder="Misal: MIKAIL" />
          </AdminField>

          <AdminField label="Subtitle di Bawah Judul">
            <input v-model="form.hero.subtitle" type="text" class="admin-input" placeholder="IT Student & Web Developer" />
          </AdminField>

          <AdminField label="Deskripsi Singkat">
            <textarea v-model="form.hero.description" class="admin-input resize-none" rows="3" placeholder="Kalimat deskripsi..."></textarea>
          </AdminField>

          <AdminField label="Teks Tombol Utama">
            <input v-model="form.hero.ctaPrimary" type="text" class="admin-input" placeholder="LIHAT PROYEK" />
          </AdminField>

          <AdminField label="Teks Tombol Kedua">
            <input v-model="form.hero.ctaSecondary" type="text" class="admin-input" placeholder="TENTANG SAYA" />
          </AdminField>
        </section>


        <!-- ==========================================
             TAB: SKILLS
             ========================================== -->
        <section v-if="activeTab === 'skills'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="section-title mb-0 border-none pb-0">🔧 Keahlian / Skills</h2>
            <button class="admin-btn-add" @click="addSkillCategory">
              <span class="material-symbols-outlined text-sm">add</span> Tambah Kategori
            </button>
          </div>

          <div v-for="(cat, ci) in form.skills" :key="ci" class="bg-surface-container border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <!-- Header Kategori -->
            <div class="flex items-start justify-between gap-4 flex-wrap">
              <div class="flex gap-3 flex-wrap flex-1">
                <div class="flex-1 min-w-32">
                  <label class="admin-label">Nama Kategori</label>
                  <input v-model="cat.category" type="text" class="admin-input" placeholder="Web Development" />
                </div>
                <div class="w-24">
                  <label class="admin-label">Icon</label>
                  <input v-model="cat.icon" type="text" class="admin-input" placeholder="code" />
                </div>
                <div class="w-32">
                  <label class="admin-label">Warna Icon</label>
                  <select v-model="cat.iconColor" class="admin-input">
                    <option value="text-primary">🟠 Oranye</option>
                    <option value="text-secondary">🟣 Ungu</option>
                    <option value="text-tertiary">🔵 Cyan</option>
                  </select>
                </div>
              </div>
              <button class="admin-btn-delete mt-5 px-2" @click="form.skills.splice(ci, 1)" title="Hapus Kategori">
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            <!-- Daftar Item Skill -->
            <div class="border-t-2 border-surface-container-highest pt-4 space-y-3">
              <p class="text-label-sm font-label-sm text-on-surface-variant uppercase">Item Skill:</p>
              <div v-for="(item, ii) in cat.items" :key="ii" class="flex items-center gap-3 flex-wrap">
                <input v-model="item.name" type="text" class="admin-input flex-1 min-w-32" placeholder="Nama skill" />
                <div class="flex items-center gap-2">
                  <input v-model.number="item.percentage" type="range" min="0" max="100" class="w-24 accent-primary" />
                  <span class="text-primary font-bold font-label-sm w-10 text-right">{{ item.percentage }}%</span>
                </div>
                <button class="admin-btn-delete-sm" @click="cat.items.splice(ii, 1)">✕</button>
              </div>
              <button class="admin-btn-add-sm" @click="cat.items.push({ name: '', percentage: 50 })">
                + Tambah Item
              </button>
            </div>
          </div>
        </section>


        <!-- ==========================================
             TAB: TECH STACK
             ========================================== -->
        <section v-if="activeTab === 'techstack'" class="space-y-6">
          <h2 class="section-title">🏷️ Tech Stack</h2>
          <p class="text-on-surface-variant text-sm font-body-md">Teknologi yang ditampilkan sebagai badge/tag.</p>

          <!-- Daftar tag -->
          <div class="flex flex-wrap gap-3">
            <div v-for="(tech, i) in form.techStack" :key="i" class="flex items-center gap-1 border-2 border-tertiary px-3 py-1">
              <input v-model="form.techStack[i]" type="text" class="bg-transparent text-tertiary font-label-sm text-xs uppercase focus:outline-none w-24" />
              <button class="text-red-400 hover:text-red-300 ml-1 text-xs" @click="form.techStack.splice(i, 1)">✕</button>
            </div>
          </div>

          <!-- Tambah baru -->
          <div class="flex gap-3">
            <input v-model="newTech" type="text" class="admin-input flex-1" placeholder="Nama teknologi baru..." @keyup.enter="addTech" />
            <button class="admin-btn-add px-4" @click="addTech">+ Tambah</button>
          </div>
        </section>


        <!-- ==========================================
             TAB: PENDIDIKAN
             ========================================== -->
        <section v-if="activeTab === 'pendidikan'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="section-title mb-0 border-none pb-0">🎓 Pendidikan</h2>
            <button class="admin-btn-add" @click="addEducation">
              <span class="material-symbols-outlined text-sm">add</span> Tambah
            </button>
          </div>

          <div v-for="(edu, i) in form.education" :key="i" class="bg-surface-container border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <div class="flex justify-between items-start">
              <p class="text-primary font-bold font-label-sm uppercase">{{ edu.institution || 'Institusi baru' }}</p>
              <button class="admin-btn-delete px-2" @click="form.education.splice(i, 1)">
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminField label="Periode (Tahun)">
                <input v-model="edu.period" type="text" class="admin-input" placeholder="2022 - Sekarang" />
              </AdminField>
              <AdminField label="Badge / Label">
                <input v-model="edu.badge" type="text" class="admin-input" placeholder="Sarjana, Sertifikasi, SMK" />
              </AdminField>
            </div>

            <AdminField label="Nama Institusi">
              <input v-model="edu.institution" type="text" class="admin-input" placeholder="Nama universitas / sekolah" />
            </AdminField>

            <AdminField label="Deskripsi">
              <textarea v-model="edu.description" class="admin-input resize-none" rows="2" placeholder="Jurusan, prestasi, dll."></textarea>
            </AdminField>

            <AdminField label="Warna Kartu">
              <select v-model="edu.color" class="admin-input">
                <option value="primary">🟠 Oranye (primary)</option>
                <option value="secondary">🟣 Ungu (secondary)</option>
                <option value="tertiary">🔵 Cyan (tertiary)</option>
              </select>
            </AdminField>
          </div>
        </section>


        <!-- ==========================================
             TAB: PROYEK
             ========================================== -->
        <section v-if="activeTab === 'proyek'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="section-title mb-0 border-none pb-0">🗂️ Proyek</h2>
            <button class="admin-btn-add" @click="addProject">
              <span class="material-symbols-outlined text-sm">add</span> Tambah
            </button>
          </div>

          <div v-for="(proj, i) in form.projects" :key="proj.id" class="bg-surface-container border-4 border-black shadow-[4px_4px_0px_0px_#000]">
            <!-- Header proyek (klik untuk expand) -->
            <button
              class="w-full flex items-center justify-between px-5 py-4 border-b-4 border-black text-left hover:bg-surface-container-high transition-colors"
              @click="expandedProject = expandedProject === i ? null : i"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-on-surface" >{{ proj.icon || 'folder' }}</span>
                <span class="font-bold font-label-sm uppercase">{{ proj.title || 'Proyek Baru' }}</span>
                <span class="text-xs text-on-surface-variant border border-surface-container-highest px-2 py-0.5">{{ proj.size }}</span>
              </div>
              <span class="material-symbols-outlined">{{ expandedProject === i ? 'expand_less' : 'expand_more' }}</span>
            </button>

            <!-- Form proyek (muncul saat di-expand) -->
            <div v-if="expandedProject === i" class="p-5 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminField label="Judul Proyek">
                  <input v-model="proj.title" type="text" class="admin-input" placeholder="Nama Proyek" />
                </AdminField>
                <AdminField label="Subtitle / Kategori">
                  <input v-model="proj.subtitle" type="text" class="admin-input" placeholder="Web Application" />
                </AdminField>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminField label="Icon (Material)">
                  <input v-model="proj.icon" type="text" class="admin-input" placeholder="database" />
                </AdminField>
                <AdminField label="Warna Icon">
                  <select v-model="proj.iconColor" class="admin-input">
                    <option value="text-primary">🟠 Oranye</option>
                    <option value="text-secondary">🟣 Ungu</option>
                    <option value="text-tertiary">🔵 Cyan</option>
                  </select>
                </AdminField>
                <AdminField label="Ukuran Kartu">
                  <select v-model="proj.size" class="admin-input">
                    <option value="large">Large</option>
                    <option value="medium">Medium</option>
                    <option value="small">Small</option>
                  </select>
                </AdminField>
              </div>

              <AdminField label="Deskripsi Proyek">
                <textarea v-model="proj.description" class="admin-input resize-none" rows="3" placeholder="Deskripsi singkat proyek..."></textarea>
              </AdminField>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminField label="Tags Teknologi (pisahkan koma)">
                  <input
                    :value="proj.tags.join(', ')"
                    type="text"
                    class="admin-input"
                    placeholder="PHP, MySQL, Laravel"
                    @change="proj.tags = $event.target.value.split(',').map(t => t.trim()).filter(Boolean)"
                  />
                </AdminField>
                <AdminField label="Warna Tag">
                  <select v-model="proj.tagColor" class="admin-input">
                    <option value="primary">🟠 Oranye</option>
                    <option value="secondary">🟣 Ungu</option>
                    <option value="tertiary">🔵 Cyan</option>
                  </select>
                </AdminField>
              </div>

              <AdminField label="URL Gambar (opsional)">
                <div class="flex items-center gap-2">
                  <input v-model="proj.imageUrl" type="url" class="admin-input flex-1" placeholder="https://..." />
                  <label class="admin-btn-add cursor-pointer shrink-0 h-[46px] m-0">
                    <span class="material-symbols-outlined text-sm">upload</span> Upload
                    <input type="file" accept="image/*" class="hidden" @change="e => uploadFile(e, url => proj.imageUrl = url)" />
                  </label>
                </div>
                <div v-if="proj.imageUrl" class="mt-2">
                  <img :src="proj.imageUrl" alt="preview" class="h-24 object-cover border-2 border-surface-container-highest" />
                </div>
              </AdminField>

              <div class="flex justify-end pt-2">
                <button class="admin-btn-delete flex items-center gap-2" @click="form.projects.splice(i, 1); expandedProject = null">
                  <span class="material-symbols-outlined text-sm">delete</span> Hapus Proyek
                </button>
              </div>
            </div>
          </div>
        </section>


        <!-- ==========================================
             TAB: SOSIAL
             ========================================== -->
        <section v-if="activeTab === 'sosial'" class="space-y-6">
          <h2 class="section-title">🌐 Link Sosial Media</h2>

          <AdminField label="GitHub URL">
            <input v-model="form.social.github" type="url" class="admin-input" placeholder="https://github.com/username" />
          </AdminField>
          <AdminField label="LinkedIn URL">
            <input v-model="form.social.linkedin" type="url" class="admin-input" placeholder="https://linkedin.com/in/username" />
          </AdminField>
          <AdminField label="Email">
            <input v-model="form.social.email" type="email" class="admin-input" placeholder="email@contoh.com" />
          </AdminField>
        </section>


        <!-- ==========================================
             TAB: PENGATURAN
             ========================================== -->
        <section v-if="activeTab === 'pengaturan'" class="space-y-6">
          <h2 class="section-title">⚙️ Pengaturan Website</h2>

          <AdminField label="Nama Website (di header)">
            <input v-model="form.siteName" type="text" class="admin-input" placeholder="MIKAIL.DEV" />
          </AdminField>
          <AdminField label="Teks Copyright (di footer)">
            <input v-model="form.footerText" type="text" class="admin-input" placeholder="© 2024 MIKAIL. All Rights Reserved." />
          </AdminField>

          <div class="bg-surface-container border-2 border-surface-container-highest p-4 mt-6">
            <p class="text-label-sm font-label-sm text-on-surface-variant uppercase mb-2">Ubah Password Admin</p>
            <p class="text-xs text-on-surface-variant font-body-md">Untuk mengganti password, buka file <code class="text-primary">.env</code> di folder proyek dan tambahkan baris:</p>
            <code class="block mt-2 text-tertiary text-xs bg-black p-3 border border-surface-container-highest">NUXT_ADMIN_PASSWORD=password_baru_anda</code>
            <p class="text-xs text-on-surface-variant mt-2">Lalu restart server dengan <code class="text-primary">npm run dev</code></p>
          </div>
        </section>

      </main>


      <!-- 3. AREA PREVIEW (KANAN) -->
      <section class="hidden lg:flex flex-1 bg-black flex-col overflow-hidden relative border-l-4 border-surface-container-highest">
        <!-- Header Preview -->
        <div class="bg-secondary-container text-on-secondary-container px-6 py-3 border-b-4 border-black flex justify-between items-center shrink-0 z-10 shadow-[0_4px_0px_0px_#000]">
          <div class="flex items-center gap-2 font-bold font-label-sm text-sm uppercase tracking-wider">
            <span class="material-symbols-outlined text-sm animate-pulse text-secondary">visibility</span>
            Live Preview
          </div>
          <span class="text-xs opacity-70 bg-black/20 px-2 py-1 uppercase rounded-sm border border-black/10">
            Perubahan Real-time
          </span>
        </div>

        <!-- Scrollable Preview Area -->
        <div class="flex-1 overflow-y-auto p-8 relative preview-container">
          <!-- Transisi agar smooth saat pindah tab -->
          <transition name="fade" mode="out-in">
            <div :key="activeTab" class="mx-auto max-w-5xl space-y-12">
              <SectionsProfileSection v-if="activeTab === 'profil'" :data="form" />
              <SectionsHeroSection v-if="activeTab === 'hero'" :data="form" />
              <SectionsSkillsSection v-if="activeTab === 'skills'" :data="form" />
              <SectionsTechStackSection v-if="activeTab === 'techstack'" :data="form" />
              <SectionsEducationSection v-if="activeTab === 'pendidikan'" :data="form" />
              <div v-if="activeTab === 'proyek'">
                <SectionsProjectsGrid :projects="form.projects" />
              </div>
              <SectionsSocialSection v-if="activeTab === 'sosial'" :data="form" />

              <div v-if="activeTab === 'pengaturan'" class="flex items-center justify-center h-64 border-4 border-dashed border-surface-container-highest text-on-surface-variant font-mono">
                [ Pengaturan sistem tidak memiliki preview visual spesifik ]
              </div>
            </div>
          </transition>
        </div>
      </section>

      <!-- TOMBOL SIMPAN MENGAMBANG -->
      <div class="absolute bottom-6 left-6 md:left-[246px] lg:left-[calc(224px+450px-200px)] z-50">
        <div class="relative group">
          <!-- Score pop animation saat berhasil -->
          <div v-if="showScorePop" class="score-pop absolute -top-8 left-1/2 -translate-x-1/2 text-tertiary font-bold text-xs uppercase whitespace-nowrap bg-black px-3 py-1 border-2 border-tertiary shadow-[2px_2px_0px_0px_#00e5f4]">
            ✓ DATA TERSIMPAN!
          </div>
          <button
            class="bg-primary-container text-on-primary-container px-6 py-4 border-4 border-black shadow-[6px_6px_0px_0px_#701c8e] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#701c8e] transition-all font-label-sm font-bold uppercase flex items-center gap-3"
            :disabled="isSaving"
            @click="saveData"
          >
            <span class="material-symbols-outlined" :class="{ 'animate-spin': isSaving }">
              {{ isSaving ? 'sync' : 'save' }}
            </span>
            {{ isSaving ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>


<!-- =====================================================
     SCRIPT SETUP — Logika Admin Panel
     ===================================================== -->
<script setup>
import { ref, reactive, onMounted } from 'vue'

// Gunakan layout khusus admin (tanpa header/footer publik)
definePageMeta({ layout: 'admin' })

// ---- State Auth ----
const isLoggedIn    = ref(false)
const loginPassword = ref('')
const loginError    = ref('')

// ---- State UI ----
const activeTab       = ref('profil')
const expandedProject = ref(null)
const isSaving        = ref(false)
const saveStatus      = ref(null) // 'success' | 'error' | null
const showScorePop    = ref(false)
const newTech         = ref('')

// ---- Daftar Tab Navigasi ----
const tabs = [
  { id: 'profil',      label: 'Profil',      icon: 'person' },
  { id: 'hero',        label: 'Hero',        icon: 'home' },
  { id: 'skills',      label: 'Skills',      icon: 'build' },
  { id: 'techstack',   label: 'Tech Stack',  icon: 'label' },
  { id: 'pendidikan',  label: 'Pendidikan',  icon: 'school' },
  { id: 'proyek',      label: 'Proyek',      icon: 'folder' },
  { id: 'sosial',      label: 'Sosial',      icon: 'share' },
  { id: 'pengaturan',  label: 'Pengaturan',  icon: 'settings' },
]

// ---- Form Data (sama strukturnya dengan portfolio.json) ----
const form = reactive({
  personal: { name: '', role: '', tagline: '', bio: '', photoUrl: '' },
  hero:     { title: '', subtitle: '', description: '', ctaPrimary: '', ctaSecondary: '' },
  skills:   [],
  techStack: [],
  education: [],
  projects:  [],
  social:    { github: '', linkedin: '', email: '' },
  siteName:  '',
  footerText: '',
})


// ============================================================
// FUNGSI UPLOAD FILE
// ============================================================

const uploadFile = async (event, callback) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const result = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (result && result.url) {
      callback(result.url)
    }
  } catch (err) {
    alert('Gagal mengupload file: ' + (err.data?.statusMessage || err.message))
  }
}

// ============================================================
// FUNGSI AUTH
// ============================================================

const doLogin = () => {
  loginError.value = ''
  // Simpan password di sessionStorage, dikirim ke server saat menyimpan
  sessionStorage.setItem('admin_pass', loginPassword.value)
  // Coba fetch data dulu untuk validasi (indikasi koneksi ok)
  loadData().then(() => {
    isLoggedIn.value = true
  }).catch(() => {
    loginError.value = 'Gagal terhubung ke server. Pastikan server berjalan.'
  })
}

const doLogout = () => {
  sessionStorage.removeItem('admin_pass')
  isLoggedIn.value = false
  loginPassword.value = ''
}


// ============================================================
// FUNGSI DATA
// ============================================================

const loadData = async () => {
  const result = await $fetch('/api/portfolio')
  // Salin data ke form (deep copy agar tidak terhubung langsung)
  Object.assign(form, JSON.parse(JSON.stringify(result)))
}

const saveData = async () => {
  if (isSaving.value) return
  isSaving.value = true
  saveStatus.value = null

  try {
    const password = sessionStorage.getItem('admin_pass') || ''
    await $fetch('/api/portfolio', {
      method: 'POST',
      body: { ...JSON.parse(JSON.stringify(form)), password },
    })
    saveStatus.value = 'success'
    showScorePop.value = true
    setTimeout(() => { showScorePop.value = false }, 1800)
    setTimeout(() => { saveStatus.value = null }, 4000)
  } catch (err) {
    saveStatus.value = 'error'
    alert('Gagal menyimpan: ' + (err.data?.statusMessage || err.message || 'Error'))
  } finally {
    isSaving.value = false
  }
}

const doReset = async () => {
  if (!confirm('Reset semua data ke default? Semua perubahan akan hilang!')) return

  const password = sessionStorage.getItem('admin_pass') || ''
  try {
    await $fetch('/api/portfolio', {
      method: 'POST',
      body: { password, action: 'reset' },
    })
    await loadData()
    alert('✓ Data berhasil direset ke default!')
  } catch (err) {
    alert('Gagal reset: ' + (err.data?.statusMessage || err.message))
  }
}


// ============================================================
// FUNGSI TAMBAH ITEM
// ============================================================

const addSkillCategory = () => {
  form.skills.push({
    category: 'Kategori Baru',
    icon: 'star',
    iconColor: 'text-primary',
    items: [{ name: 'Skill Baru', percentage: 50 }],
  })
}

const addEducation = () => {
  form.education.push({
    period: '20XX - 20XX',
    color: 'primary',
    badge: 'Pendidikan',
    institution: 'Nama Institusi',
    description: 'Deskripsi...',
  })
}

const addProject = () => {
  const newId = 'proj-' + Date.now()
  form.projects.push({
    id: newId,
    title: 'Proyek Baru',
    subtitle: 'Web Application',
    icon: 'folder',
    iconColor: 'text-primary',
    size: 'medium',
    description: 'Deskripsi proyek...',
    tags: [],
    tagColor: 'primary',
    imageUrl: null,
  })
  expandedProject.value = form.projects.length - 1
}

const addTech = () => {
  if (newTech.value.trim()) {
    form.techStack.push(newTech.value.trim())
    newTech.value = ''
  }
}


// ============================================================
// ON MOUNTED — Cek session login & load data
// ============================================================
onMounted(async () => {
  const savedPass = sessionStorage.getItem('admin_pass')
  if (savedPass) {
    loginPassword.value = savedPass
    await loadData()
    isLoggedIn.value = true
  }
})
</script>


<!-- =====================================================
     STYLE — Kelas Admin & Transisi
     ===================================================== -->
<style>
.section-title {
  @apply text-headline-lg font-headline-lg text-primary uppercase border-b-4 border-primary pb-2 mb-6;
}
.admin-input {
  @apply w-full bg-background border-2 border-surface-container-highest text-on-background px-4 py-3 focus:outline-none focus:border-primary font-body-md transition-colors text-sm;
}
.admin-label {
  @apply block text-label-sm font-label-sm text-on-surface-variant uppercase mb-2;
}
.admin-btn-add {
  @apply flex items-center gap-1 border-2 border-tertiary text-tertiary px-3 py-2 text-xs font-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary transition-all;
}
.admin-btn-add-sm {
  @apply border border-tertiary text-tertiary px-3 py-1 text-xs font-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary transition-all;
}
.admin-btn-delete {
  @apply flex items-center gap-1 border-2 border-red-500/60 text-red-400 px-3 py-2 text-xs font-label-sm uppercase hover:bg-red-500/20 transition-all;
}
.admin-btn-delete-sm {
  @apply text-red-400 hover:text-red-300 border border-red-500/50 px-2 py-1 text-xs transition-all;
}

/* Animasi transisi preview */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Background pola untuk area preview */
.preview-container {
  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
  background-size: 32px 32px;
}
</style>

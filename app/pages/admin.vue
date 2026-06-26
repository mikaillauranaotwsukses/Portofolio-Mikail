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
  <div v-else class="min-h-screen flex flex-col">

    <!-- ---- TOP BAR ---- -->
    <header class="sticky top-0 z-50 bg-surface-container-lowest border-b-4 border-black flex items-center justify-between px-6 py-3 shadow-[0_4px_0px_0px_#000]">
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
          Preview
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


    <!-- ---- MAIN LAYOUT (Sidebar + Content) ---- -->
    <div class="flex flex-1 overflow-hidden">

      <!-- SIDEBAR NAVIGASI TAB -->
      <aside class="w-48 md:w-56 shrink-0 bg-surface-container-low border-r-4 border-black overflow-y-auto">
        <nav class="p-3 space-y-1">
          <button
            v-for="tab in tabs" :key="tab.id"
            class="w-full flex items-center gap-3 px-4 py-3 border-2 transition-all font-label-sm text-xs uppercase text-left"
            :class="activeTab === tab.id
              ? 'bg-primary-container text-on-primary-container border-black shadow-[3px_3px_0px_0px_#000]'
              : 'border-transparent text-on-surface-variant hover:border-surface-container-highest hover:text-on-background'"
            @click="activeTab = tab.id"
          >
            <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </nav>

        <!-- Tombol Reset -->
        <div class="p-3 border-t-4 border-black mt-2">
          <button
            class="w-full flex items-center justify-center gap-2 border-2 border-red-500/50 text-red-400 px-3 py-2 hover:bg-red-500/20 transition-all font-label-sm text-xs uppercase"
            @click="doReset"
          >
            <span class="material-symbols-outlined text-sm">restart_alt</span>
            Reset Default
          </button>
        </div>
      </aside>


      <!-- AREA KONTEN FORM -->
      <main class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">

        <!-- ==========================================
             TAB: PROFIL
             ========================================== -->
        <section v-if="activeTab === 'profil'" class="space-y-6 max-w-2xl">
          <h2 class="section-title">👤 Informasi Profil</h2>

          <field label="Nama">
            <input v-model="form.personal.name" type="text" class="admin-input" placeholder="Nama Anda" />
          </field>

          <field label="Role / Jabatan">
            <input v-model="form.personal.role" type="text" class="admin-input" placeholder="IT Student, Web Developer, dll." />
          </field>

          <field label="Tagline Singkat">
            <input v-model="form.personal.tagline" type="text" class="admin-input" placeholder="Tagline di bawah nama" />
          </field>

          <field label="Bio / Deskripsi Diri">
            <textarea v-model="form.personal.bio" class="admin-input resize-none" rows="4" placeholder="Ceritakan tentang diri Anda..."></textarea>
          </field>

          <field label="URL Foto Profil">
            <input v-model="form.personal.photoUrl" type="url" class="admin-input" placeholder="https://..." />
            <div v-if="form.personal.photoUrl" class="mt-3 flex items-center gap-3">
              <img :src="form.personal.photoUrl" alt="preview" class="w-16 h-16 object-cover border-2 border-primary" />
              <span class="text-xs text-on-surface-variant font-label-sm">Preview foto</span>
            </div>
          </field>
        </section>


        <!-- ==========================================
             TAB: HERO
             ========================================== -->
        <section v-if="activeTab === 'hero'" class="space-y-6 max-w-2xl">
          <h2 class="section-title">🏠 Halaman Utama (Hero)</h2>

          <field label="Judul Besar (Nama / Headline)">
            <input v-model="form.hero.title" type="text" class="admin-input" placeholder="Misal: MIKAIL" />
          </field>

          <field label="Subtitle di Bawah Judul">
            <input v-model="form.hero.subtitle" type="text" class="admin-input" placeholder="IT Student & Web Developer" />
          </field>

          <field label="Deskripsi Singkat">
            <textarea v-model="form.hero.description" class="admin-input resize-none" rows="3" placeholder="Kalimat deskripsi..."></textarea>
          </field>

          <field label="Teks Tombol Utama">
            <input v-model="form.hero.ctaPrimary" type="text" class="admin-input" placeholder="LIHAT PROYEK" />
          </field>

          <field label="Teks Tombol Kedua">
            <input v-model="form.hero.ctaSecondary" type="text" class="admin-input" placeholder="TENTANG SAYA" />
          </field>
        </section>


        <!-- ==========================================
             TAB: SKILLS
             ========================================== -->
        <section v-if="activeTab === 'skills'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="section-title">🔧 Keahlian / Skills</h2>
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
                <div class="w-36">
                  <label class="admin-label">Icon (Material)</label>
                  <input v-model="cat.icon" type="text" class="admin-input" placeholder="code" />
                </div>
                <div class="w-44">
                  <label class="admin-label">Warna Icon</label>
                  <select v-model="cat.iconColor" class="admin-input">
                    <option value="text-primary">🟠 Oranye (primary)</option>
                    <option value="text-secondary">🟣 Ungu (secondary)</option>
                    <option value="text-tertiary">🔵 Cyan (tertiary)</option>
                  </select>
                </div>
              </div>
              <button class="admin-btn-delete mt-5" @click="form.skills.splice(ci, 1)">
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            <!-- Daftar Item Skill -->
            <div class="border-t-2 border-surface-container-highest pt-4 space-y-3">
              <p class="text-label-sm font-label-sm text-on-surface-variant uppercase">Item Skill:</p>
              <div v-for="(item, ii) in cat.items" :key="ii" class="flex items-center gap-3 flex-wrap">
                <input v-model="item.name" type="text" class="admin-input flex-1 min-w-32" placeholder="Nama skill" />
                <div class="flex items-center gap-2">
                  <input v-model.number="item.percentage" type="range" min="0" max="100" class="w-28 accent-primary" />
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
        <section v-if="activeTab === 'techstack'" class="space-y-6 max-w-2xl">
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
            <h2 class="section-title">🎓 Riwayat Pendidikan</h2>
            <button class="admin-btn-add" @click="addEducation">
              <span class="material-symbols-outlined text-sm">add</span> Tambah
            </button>
          </div>

          <div v-for="(edu, i) in form.education" :key="i" class="bg-surface-container border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <div class="flex justify-between items-start">
              <p class="text-primary font-bold font-label-sm uppercase">{{ edu.institution || 'Institusi baru' }}</p>
              <button class="admin-btn-delete" @click="form.education.splice(i, 1)">
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <field label="Periode (Tahun)">
                <input v-model="edu.period" type="text" class="admin-input" placeholder="2022 - Sekarang" />
              </field>
              <field label="Badge / Label">
                <input v-model="edu.badge" type="text" class="admin-input" placeholder="Sarjana, Sertifikasi, SMK" />
              </field>
            </div>

            <field label="Nama Institusi">
              <input v-model="edu.institution" type="text" class="admin-input" placeholder="Nama universitas / sekolah" />
            </field>

            <field label="Deskripsi">
              <textarea v-model="edu.description" class="admin-input resize-none" rows="2" placeholder="Jurusan, prestasi, dll."></textarea>
            </field>

            <field label="Warna Kartu">
              <select v-model="edu.color" class="admin-input">
                <option value="primary">🟠 Oranye (primary)</option>
                <option value="secondary">🟣 Ungu (secondary)</option>
                <option value="tertiary">🔵 Cyan (tertiary)</option>
              </select>
            </field>
          </div>
        </section>


        <!-- ==========================================
             TAB: PROYEK
             ========================================== -->
        <section v-if="activeTab === 'proyek'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="section-title">🗂️ Proyek</h2>
            <button class="admin-btn-add" @click="addProject">
              <span class="material-symbols-outlined text-sm">add</span> Tambah Proyek
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
                <field label="Judul Proyek">
                  <input v-model="proj.title" type="text" class="admin-input" placeholder="Nama Proyek" />
                </field>
                <field label="Subtitle / Kategori">
                  <input v-model="proj.subtitle" type="text" class="admin-input" placeholder="Web Application" />
                </field>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <field label="Icon (Material Icons)">
                  <input v-model="proj.icon" type="text" class="admin-input" placeholder="database" />
                  <a class="text-xs text-tertiary underline mt-1 block" href="https://fonts.google.com/icons" target="_blank">Cari nama icon →</a>
                </field>
                <field label="Warna Icon">
                  <select v-model="proj.iconColor" class="admin-input">
                    <option value="text-primary">🟠 Oranye</option>
                    <option value="text-secondary">🟣 Ungu</option>
                    <option value="text-tertiary">🔵 Cyan</option>
                  </select>
                </field>
                <field label="Ukuran Kartu">
                  <select v-model="proj.size" class="admin-input">
                    <option value="large">Large (lebar penuh)</option>
                    <option value="medium">Medium (setengah)</option>
                    <option value="small">Small (sepertiga)</option>
                  </select>
                </field>
              </div>

              <field label="Deskripsi Proyek">
                <textarea v-model="proj.description" class="admin-input resize-none" rows="3" placeholder="Deskripsi singkat proyek..."></textarea>
              </field>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <field label="Tags Teknologi (pisahkan dengan koma)">
                  <input
                    :value="proj.tags.join(', ')"
                    type="text"
                    class="admin-input"
                    placeholder="PHP, MySQL, Laravel"
                    @change="proj.tags = $event.target.value.split(',').map(t => t.trim()).filter(Boolean)"
                  />
                </field>
                <field label="Warna Tag">
                  <select v-model="proj.tagColor" class="admin-input">
                    <option value="primary">🟠 Oranye</option>
                    <option value="secondary">🟣 Ungu</option>
                    <option value="tertiary">🔵 Cyan</option>
                  </select>
                </field>
              </div>

              <field label="URL Gambar (opsional, kosongkan jika tidak ada)">
                <input v-model="proj.imageUrl" type="url" class="admin-input" placeholder="https://..." />
                <div v-if="proj.imageUrl" class="mt-2">
                  <img :src="proj.imageUrl" alt="preview" class="h-24 object-cover border-2 border-surface-container-highest" />
                </div>
              </field>

              <div class="flex justify-end pt-2">
                <button class="admin-btn-delete flex items-center gap-2" @click="form.projects.splice(i, 1); expandedProject = null">
                  <span class="material-symbols-outlined text-sm">delete</span> Hapus Proyek Ini
                </button>
              </div>
            </div>
          </div>
        </section>


        <!-- ==========================================
             TAB: SOSIAL
             ========================================== -->
        <section v-if="activeTab === 'sosial'" class="space-y-6 max-w-2xl">
          <h2 class="section-title">🌐 Link Sosial Media</h2>

          <field label="GitHub URL">
            <input v-model="form.social.github" type="url" class="admin-input" placeholder="https://github.com/username" />
          </field>
          <field label="LinkedIn URL">
            <input v-model="form.social.linkedin" type="url" class="admin-input" placeholder="https://linkedin.com/in/username" />
          </field>
          <field label="Email">
            <input v-model="form.social.email" type="email" class="admin-input" placeholder="email@contoh.com" />
          </field>
        </section>


        <!-- ==========================================
             TAB: PENGATURAN
             ========================================== -->
        <section v-if="activeTab === 'pengaturan'" class="space-y-6 max-w-2xl">
          <h2 class="section-title">⚙️ Pengaturan Website</h2>

          <field label="Nama Website (di header)">
            <input v-model="form.siteName" type="text" class="admin-input" placeholder="MIKAIL.DEV" />
          </field>
          <field label="Teks Copyright (di footer)">
            <input v-model="form.footerText" type="text" class="admin-input" placeholder="© 2024 MIKAIL. All Rights Reserved." />
          </field>

          <div class="bg-surface-container border-2 border-surface-container-highest p-4">
            <p class="text-label-sm font-label-sm text-on-surface-variant uppercase mb-2">Ubah Password Admin</p>
            <p class="text-xs text-on-surface-variant font-body-md">Untuk mengganti password, buka file <code class="text-primary">.env</code> di folder proyek dan tambahkan baris:</p>
            <code class="block mt-2 text-tertiary text-xs bg-black p-3 border border-surface-container-highest">NUXT_ADMIN_PASSWORD=password_baru_anda</code>
            <p class="text-xs text-on-surface-variant mt-2">Lalu restart server dengan <code class="text-primary">npm run dev</code></p>
          </div>
        </section>


        <!-- ==========================================
             TOMBOL SIMPAN (selalu terlihat di bawah)
             ========================================== -->
        <div class="border-t-4 border-black pt-6 flex flex-wrap items-center gap-4">
          <div class="relative">
            <!-- Score pop animation saat berhasil -->
            <div v-if="showScorePop" class="score-pop absolute -top-4 left-1/2 -translate-x-1/2 text-tertiary font-bold text-xs uppercase whitespace-nowrap">
              ✓ TERSIMPAN!
            </div>
            <button
              class="bg-primary-container text-on-primary-container px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-label-sm font-bold uppercase flex items-center gap-3"
              :disabled="isSaving"
              @click="saveData"
            >
              <span class="material-symbols-outlined" :class="{ 'animate-spin': isSaving }">
                {{ isSaving ? 'sync' : 'save' }}
              </span>
              {{ isSaving ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN' }}
            </button>
          </div>

          <p class="text-xs text-on-surface-variant font-label-sm">
            Perubahan akan langsung tampil di website publik setelah disimpan.
          </p>
        </div>

      </main>
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
     STYLE — Komponen helper Field + kelas admin
     ===================================================== -->
<style>
/* Field wrapper component (inline template di bawah) */
.section-title {
  @apply text-headline-lg font-headline-lg text-primary uppercase border-b-4 border-primary pb-2 mb-2;
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
</style>

<!-- Komponen Field helper agar tidak berulang-ulang -->
<script>
// Definisi komponen Field sederhana (label + slot)
const field = {
  props: ['label'],
  template: `
    <div>
      <label class="admin-label">{{ label }}</label>
      <slot />
    </div>
  `
}
export default { components: { field } }
</script>

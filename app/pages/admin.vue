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
        <img
          :src="(form.siteLogo || '/logo.png') + '?v=2'"
          alt="Logo"
          class="w-9 h-9 object-contain rounded-xl border-2 border-primary-container shadow-[2px_2px_0px_0px_#ff9d00]"
        />
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminField label="Teks Tombol Utama">
              <input v-model="form.hero.ctaPrimary" type="text" class="admin-input" placeholder="About Me" />
            </AdminField>
            <AdminField label="Tujuan Link Tombol Utama (Opsional)">
              <input v-model="form.hero.ctaPrimaryLink" type="text" class="admin-input" placeholder="/about (otomatis jika kosong)" />
            </AdminField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminField label="Teks Tombol Kedua">
              <input v-model="form.hero.ctaSecondary" type="text" class="admin-input" placeholder="View Projects" />
            </AdminField>
            <AdminField label="Tujuan Link Tombol Kedua (Opsional)">
              <input v-model="form.hero.ctaSecondaryLink" type="text" class="admin-input" placeholder="/projects (otomatis jika kosong)" />
            </AdminField>
          </div>
        </section>


        <!-- ==========================================
             TAB: PENGALAMAN
             ========================================== -->
        <section v-if="activeTab === 'pengalaman'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="section-title mb-0 border-none pb-0">💼 Pengalaman & Organisasi</h2>
            <button class="admin-btn-add" @click="addExperience">
              <span class="material-symbols-outlined text-sm">add</span> Tambah
            </button>
          </div>

          <div v-for="(exp, i) in form.experience" :key="i" class="bg-surface-container border-4 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <div class="flex justify-between items-start">
              <p class="text-tertiary font-bold font-label-sm uppercase">{{ exp.institution || 'Pengalaman Baru' }}</p>
              <button class="admin-btn-delete px-2" @click="form.experience.splice(i, 1)">
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminField label="Periode">
                <input v-model="exp.period" type="text" class="admin-input" placeholder="2023 - 2026" />
              </AdminField>
              <AdminField label="Badge / Label">
                <input v-model="exp.badge" type="text" class="admin-input" placeholder="Magang, Organisasi, Kerja" />
              </AdminField>
            </div>

            <AdminField label="Nama Instansi / Perusahaan">
              <input v-model="exp.institution" type="text" class="admin-input" placeholder="Nama perusahaan / organisasi" />
            </AdminField>

            <AdminField label="Jabatan / Posisi">
              <input v-model="exp.subtitle" type="text" class="admin-input" placeholder="Web Developer, Ketua OSIS, dll." />
            </AdminField>

            <AdminField label="Deskripsi">
              <textarea v-model="exp.description" class="admin-input resize-none" rows="3" placeholder="Tanggung jawab dan pencapaian..."></textarea>
            </AdminField>

            <AdminField label="Warna Kartu">
              <select v-model="exp.color" class="admin-input">
                <option value="primary">🟠 Oranye (primary)</option>
                <option value="secondary">🟣 Ungu (secondary)</option>
                <option value="tertiary">🔵 Cyan (tertiary)</option>
              </select>
            </AdminField>
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
            <div>
              <h2 class="section-title mb-0 border-none pb-0">🗂️ Proyek</h2>
              <p class="text-xs text-on-surface-variant mt-1">
                Atur daftar proyek dan tentukan mana yang ingin ditampilkan di halaman Beranda.
              </p>
            </div>
            <button class="admin-btn-add" @click="addProject">
              <span class="material-symbols-outlined text-sm">add</span> Tambah
            </button>
          </div>

          <!-- Info status tampilan di Beranda -->
          <div class="bg-surface-container-high border-2 border-surface-container-highest p-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div class="flex items-center gap-2 text-on-background">
              <span class="material-symbols-outlined text-primary text-base">home</span>
              <span>Tampil di Beranda: <b class="text-primary font-bold">{{ form.projects.filter(p => p.showOnHome).length }}</b> dari {{ form.projects.length }} proyek</span>
            </div>
            <span class="text-on-surface-variant text-[11px]">
              Klik tombol <b class="text-primary">"Di Beranda"</b> pada kartu proyek untuk mengatur
            </span>
          </div>

          <div v-for="(proj, i) in form.projects" :key="proj.id" class="bg-surface-container border-4 border-black shadow-[4px_4px_0px_0px_#000]">
            <!-- Header proyek (klik untuk expand) -->
            <div
              class="w-full flex items-center justify-between px-5 py-4 border-b-4 border-black text-left hover:bg-surface-container-high transition-colors cursor-pointer select-none"
              @click="expandedProject = expandedProject === i ? null : i"
            >
              <div class="flex items-center gap-3 flex-wrap">
                <span class="font-bold font-label-sm uppercase">{{ proj.title || 'Proyek Baru' }}</span>
                <span class="text-xs text-primary border border-primary/40 px-2 py-0.5 uppercase font-bold">{{ proj.subtitle || 'Kategori' }}</span>
                <span class="text-xs text-on-surface-variant border border-surface-container-highest px-2 py-0.5 uppercase">{{ proj.size }}</span>
              </div>

              <div class="flex items-center gap-3" @click.stop>
                <!-- Tombol Cepat: Tampilkan di Beranda -->
                <button
                  type="button"
                  class="px-2.5 py-1 text-xs font-bold border-2 transition-all flex items-center gap-1 cursor-pointer select-none"
                  :class="proj.showOnHome
                    ? 'bg-primary text-black border-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-surface-container-highest text-on-surface-variant border-surface-container-highest hover:text-on-background'"
                  @click="proj.showOnHome = !proj.showOnHome"
                  :title="proj.showOnHome ? 'Klik untuk sembunyikan dari Beranda' : 'Klik untuk tampilkan di Beranda'"
                >
                  <span class="material-symbols-outlined text-sm">{{ proj.showOnHome ? 'check_circle' : 'add_circle' }}</span>
                  <span>{{ proj.showOnHome ? 'Di Beranda' : '+ Beranda' }}</span>
                </button>

                <span class="material-symbols-outlined text-on-surface-variant">{{ expandedProject === i ? 'expand_less' : 'expand_more' }}</span>
              </div>
            </div>

            <!-- Form proyek (muncul saat di-expand) -->
            <div v-if="expandedProject === i" class="p-5 space-y-4">
              <!-- Toggle: Tampilkan di Beranda (Home) -->
              <div class="bg-surface-container-high border-4 border-black p-4 flex items-center justify-between">
                <div>
                  <p class="font-label-sm text-label-sm text-on-background uppercase flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm text-primary">home</span>
                    Tampilkan di Halaman Utama (Home)
                  </p>
                  <p class="text-xs text-on-surface-variant mt-1">
                    Aktifkan jika ingin memunculkan proyek ini di bagian "02 PROYEK TERBARU" di halaman beranda.
                  </p>
                </div>
                <!-- Toggle Switch -->
                <button
                  type="button"
                  class="relative w-14 h-7 border-2 border-black transition-colors shrink-0 cursor-pointer ml-4"
                  :class="proj.showOnHome ? 'bg-primary' : 'bg-surface-container-highest'"
                  @click="proj.showOnHome = !proj.showOnHome"
                >
                  <span
                    class="absolute top-0.5 w-5 h-5 bg-black transition-all border border-black/20"
                    :class="proj.showOnHome ? 'left-[calc(100%-1.4rem)]' : 'left-0.5'"
                  />
                  <span class="sr-only">{{ proj.showOnHome ? 'Nonaktifkan dari Beranda' : 'Aktifkan di Beranda' }}</span>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminField label="Judul Proyek">
                  <input v-model="proj.title" type="text" class="admin-input" placeholder="Nama Proyek" />
                </AdminField>
                <AdminField label="Kategori Proyek (Custom)">
                  <input v-model="proj.subtitle" type="text" class="admin-input" placeholder="Game / Web Application / dsb" />
                </AdminField>
                <AdminField label="Ukuran Kartu">
                  <select v-model="proj.size" class="admin-input">
                    <option value="large">Large (Penuh)</option>
                    <option value="medium">Medium (Sedang)</option>
                    <option value="small">Small (Kecil)</option>
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

              <!-- Section: Link / Tautan Proyek (Bisa ditambah oleh admin) -->
              <div class="bg-surface-container-high border-4 border-black p-4 space-y-3">
                <div class="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p class="font-label-sm text-label-sm text-on-background uppercase flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm text-primary">link</span>
                      Link Proyek (Website, Demo, GitHub, dll)
                    </p>
                    <p class="text-xs text-on-surface-variant mt-0.5">
                      Kartu proyek bisa langsung diklik pengunjung menuju link yang Anda tambahkan di bawah ini.
                    </p>
                  </div>
                  <button
                    type="button"
                    class="admin-btn-add text-xs py-1.5 px-3 flex items-center gap-1 cursor-pointer"
                    @click="addProjectLink(proj)"
                  >
                    <span class="material-symbols-outlined text-xs">add</span> Tambah Link
                  </button>
                </div>

                <!-- Daftar Link yang dapat diedit & ditambah -->
                <div v-if="proj.links && proj.links.length > 0" class="space-y-2 pt-1">
                  <div
                    v-for="(lnk, lIdx) in proj.links"
                    :key="lIdx"
                    class="flex items-center gap-2 bg-surface-container p-2.5 border-2 border-surface-container-highest"
                  >
                    <!-- Label Link -->
                    <div class="w-1/3 min-w-[130px]">
                      <input
                        v-model="lnk.label"
                        type="text"
                        class="admin-input py-2 text-xs"
                        placeholder="Label (misal: Live Demo, GitHub)"
                      />
                    </div>

                    <!-- URL Link -->
                    <div class="flex-1">
                      <input
                        v-model="lnk.url"
                        type="url"
                        class="admin-input py-2 text-xs font-mono"
                        placeholder="https://..."
                      />
                    </div>

                    <!-- Tombol Uji Buka Link -->
                    <a
                      v-if="lnk.url"
                      :href="lnk.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-2 text-primary hover:bg-primary/20 border border-primary/40 text-xs flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                      title="Uji buka tautan ini di tab baru"
                    >
                      <span class="material-symbols-outlined text-sm">open_in_new</span>
                    </a>

                    <!-- Tombol Hapus Link -->
                    <button
                      type="button"
                      class="p-2 text-red-400 hover:bg-red-400/20 border border-red-400/40 text-xs flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                      title="Hapus Link Ini"
                      @click="removeProjectLink(proj, lIdx)"
                    >
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>

                <div v-else class="text-center py-4 border-2 border-dashed border-surface-container-highest text-on-surface-variant text-xs font-mono">
                  Belum ada link. Klik "Tambah Link" di atas untuk menambahkan tautan web/demo/repo.
                </div>
              </div>

              <!-- Toggle: pakai foto atau tidak -->
              <div class="bg-surface-container-high border-4 border-black p-5">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="font-label-sm text-label-sm text-on-background uppercase">Foto / Thumbnail Proyek</p>
                    <p class="text-xs text-on-surface-variant mt-1">Aktifkan untuk menyertakan gambar di kartu proyek</p>
                  </div>
                  <!-- Toggle Switch -->
                  <button
                    class="relative w-14 h-7 border-2 border-black transition-colors"
                    :class="proj.useImage ? 'bg-tertiary' : 'bg-surface-container-highest'"
                    @click="proj.useImage = !proj.useImage; if (!proj.useImage) proj.imageUrl = null"
                  >
                    <span
                      class="absolute top-0.5 w-5 h-5 bg-black transition-all border border-black/20"
                      :class="proj.useImage ? 'left-[calc(100%-1.4rem)]' : 'left-0.5'"
                    />
                    <span class="sr-only">{{ proj.useImage ? 'Nonaktifkan' : 'Aktifkan' }}</span>
                  </button>
                </div>

                <!-- Area upload (hanya tampil saat toggle ON) -->
                <div v-if="proj.useImage" class="space-y-3">
                  <!-- Preview gambar saat ini -->
                  <div v-if="proj.imageUrl" class="relative group w-fit">
                    <img :src="proj.imageUrl" alt="preview" class="h-32 w-full object-cover border-2 border-tertiary" />
                    <button
                      class="absolute top-1 right-1 bg-black/80 text-red-400 px-2 py-0.5 text-xs border border-red-400/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      @click="proj.imageUrl = null"
                    >
                      ✕ Hapus
                    </button>
                  </div>
                  <div v-else class="border-2 border-dashed border-surface-container-highest h-24 flex items-center justify-center text-on-surface-variant text-xs">
                    Belum ada gambar
                  </div>

                  <!-- Baris input URL + Upload -->
                  <div class="flex gap-2">
                    <input
                      v-model="proj.imageUrl"
                      type="url"
                      class="admin-input flex-1"
                      placeholder="Paste URL gambar atau upload dari perangkat..."
                    />
                    <label class="admin-btn-add cursor-pointer shrink-0 h-[46px] m-0 flex items-center gap-1">
                      <span class="material-symbols-outlined text-sm">upload</span> Upload
                      <input type="file" accept="image/*" class="hidden" @change="e => uploadFile(e, url => proj.imageUrl = url)" />
                    </label>
                  </div>
                </div>
              </div>

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
          <p class="text-xs text-on-surface-variant font-body-md">Isi URL profil dan opsional upload foto/ikon khusus untuk setiap platform.</p>

          <!-- Kartu per platform -->
          <div
            v-for="platform in socialPlatforms"
            :key="platform.key"
            class="bg-surface-container border-4 border-black p-5 space-y-4"
            :style="{ boxShadow: '4px 4px 0px 0px ' + platform.shadowColor }"
          >
            <!-- Header Platform -->
            <div class="flex items-center gap-3 border-b-2 border-surface-container-highest pb-3">
              <span class="material-symbols-outlined text-xl" :class="platform.color">{{ platform.icon }}</span>
              <p class="font-bold font-label-sm uppercase" :class="platform.color">{{ platform.label }}</p>
            </div>

            <!-- URL Input -->
            <AdminField :label="platform.urlLabel">
              <input
                v-model="form.social[platform.key].url"
                :type="platform.key === 'email' ? 'email' : 'url'"
                class="admin-input"
                :placeholder="platform.placeholder"
              />
            </AdminField>

            <!-- Toggle: Pakai ikon kustom atau tidak -->
            <div class="bg-surface-container-high border-2 border-surface-container-highest p-4">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <p class="font-label-sm text-label-sm text-on-background uppercase">Foto / Ikon Kustom</p>
                  <p class="text-xs text-on-surface-variant mt-0.5">Upload foto profil atau ikon untuk platform ini</p>
                </div>
                <button
                  class="relative w-14 h-7 border-2 border-black transition-colors"
                  :class="form.social[platform.key].iconUrl ? 'bg-primary' : 'bg-surface-container-highest'"
                  @click="toggleSocialIcon(platform.key)"
                >
                  <span
                    class="absolute top-0.5 w-5 h-5 bg-black transition-all border border-black/20"
                    :class="form.social[platform.key].iconUrl ? 'left-[calc(100%-1.4rem)]' : 'left-0.5'"
                  />
                </button>
              </div>

              <!-- Area gambar (aktif jika ada iconUrl) -->
              <div v-if="form.social[platform.key].iconUrl" class="space-y-3">
                <div class="flex items-center gap-4">
                  <div class="relative group shrink-0">
                    <img
                      :src="form.social[platform.key].iconUrl"
                      :alt="platform.label"
                      class="w-16 h-16 object-cover border-2 border-black"
                    />
                    <button
                      class="absolute -top-1 -right-1 bg-black text-red-400 w-5 h-5 text-xs border border-red-400/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      @click="form.social[platform.key].iconUrl = null"
                    >
                      ✕
                    </button>
                  </div>
                  <div class="flex-1 space-y-2">
                    <p class="text-xs text-on-surface-variant">Ganti gambar:</p>
                    <label class="admin-btn-add cursor-pointer inline-flex items-center gap-1 h-9">
                      <span class="material-symbols-outlined text-sm">upload</span> Upload Baru
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="e => uploadFile(e, url => form.social[platform.key].iconUrl = url)"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <!-- Placeholder saat belum ada ikon -->
              <div v-else class="flex items-center gap-3">
                <div class="w-16 h-16 border-2 border-dashed border-surface-container-highest flex items-center justify-center text-on-surface-variant">
                  <span class="material-symbols-outlined text-2xl">add_photo_alternate</span>
                </div>
                <div class="space-y-1">
                  <p class="text-xs text-on-surface-variant">Belum ada ikon kustom. Klik toggle untuk mengaktifkan.</p>
                  <label class="admin-btn-add cursor-pointer inline-flex items-center gap-1 h-9">
                    <span class="material-symbols-outlined text-sm">upload</span> Upload Langsung
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="e => uploadFile(e, url => form.social[platform.key].iconUrl = url)"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>


        <!-- ==========================================
             TAB: KONTAK & EMAILJS
             ========================================== -->
        <section v-if="activeTab === 'kontak'" class="space-y-6">
          <h2 class="section-title">📬 Pengaturan Kontak & EmailJS</h2>

          <!-- Info Box EmailJS -->
          <div class="bg-surface-container border-4 border-black p-5 shadow-[4px_4px_0px_0px_#00e5f4] space-y-3">
            <div class="flex items-center gap-2 text-tertiary font-bold font-label-sm uppercase">
              <span class="material-symbols-outlined text-lg">mark_email_read</span>
              Integrasi Email.js (Formulir Kontak)
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed font-body-md">
              Formulir di halaman <strong class="text-primary">/contact</strong> dapat mengirim pesan langsung ke inbox email Anda menggunakan <strong>EmailJS</strong>. Masukkan Service ID, Template ID, dan Public Key Anda di bawah ini:
            </p>
          </div>

          <!-- Kredensial EmailJS -->
          <div class="space-y-4 bg-surface-container-low border-4 border-black p-5 shadow-[4px_4px_0px_0px_#ffc485]">
            <p class="text-xs font-bold uppercase text-primary font-label-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">key</span>
              Kredensial API EmailJS
            </p>

            <AdminField label="Service ID">
              <input
                v-model="form.contact.emailjsServiceId"
                type="text"
                class="admin-input font-mono text-sm"
                placeholder="service_xxxxxxx"
              />
            </AdminField>

            <AdminField label="Template ID">
              <input
                v-model="form.contact.emailjsTemplateId"
                type="text"
                class="admin-input font-mono text-sm"
                placeholder="template_xxxxxxx"
              />
            </AdminField>

            <AdminField label="Public Key (User ID)">
              <input
                v-model="form.contact.emailjsPublicKey"
                type="text"
                class="admin-input font-mono text-sm"
                placeholder="public_key_xxxxxxx"
              />
            </AdminField>

            <!-- Panduan EmailJS -->
            <details class="text-xs bg-background border-2 border-surface-container-highest p-3 mt-3 cursor-pointer">
              <summary class="font-bold text-tertiary uppercase flex items-center gap-2 select-none">
                <span class="material-symbols-outlined text-sm">help_outline</span>
                Panduan Mendapatkan Kredensial EmailJS (Gratis)
              </summary>
              <ol class="mt-3 space-y-2 list-decimal list-inside text-on-surface-variant leading-relaxed">
                <li>Buka dan daftar akun gratis di <a href="https://www.emailjs.com" target="_blank" class="text-primary underline font-bold">emailjs.com</a></li>
                <li>Buka menu <strong>Email Services</strong> &gt; Pilih <strong>Gmail</strong> &gt; Hubungkan email Anda (<code class="text-white">{{ form.social?.email?.url || 'mikailcoding64@gmail.com' }}</code>) &gt; Salin <strong>Service ID</strong>.</li>
                <li>Buka menu <strong>Email Templates</strong> &gt; Buat Template baru. Di template, gunakan variabel: <code class="text-white" v-pre>{{from_name}}</code>, <code class="text-white" v-pre>{{from_email}}</code>, dan <code class="text-white" v-pre>{{message}}</code> &gt; Simpan &amp; salin <strong>Template ID</strong>.</li>
                <li>Buka menu <strong>Account</strong> (ikon profil kiri bawah) &gt; tab <strong>API Keys</strong> &gt; Salin <strong>Public Key</strong>.</li>
                <li>Tempelkan ketiga nilai tersebut di kolom atas, lalu klik <strong>SIMPAN DATA</strong>!</li>
              </ol>
            </details>
          </div>

          <!-- Pengaturan Link Email Langsung (Mailto) -->
          <div class="space-y-4 bg-surface-container-low border-4 border-black p-5 shadow-[4px_4px_0px_0px_#eeb1ff]">
            <p class="text-xs font-bold uppercase text-secondary font-label-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">alternate_email</span>
              Link Email Langsung (Mailto)
            </p>
            <p class="text-xs text-on-surface-variant leading-relaxed font-body-md">
              Ketika tombol/link email diklik di website (halaman kontak, sidebar, atau footer), browser akan langsung membuka aplikasi email pengunjung untuk menulis email ke alamat ini:
            </p>

            <AdminField label="Alamat Email Tujuan (Otomatis sinkron dengan Sosial &gt; Email)">
              <input
                v-model="form.social.email.url"
                type="email"
                class="admin-input"
                placeholder="mikailcoding64@gmail.com"
              />
            </AdminField>

            <AdminField label="Subject Default Email Langsung">
              <input
                v-model="form.contact.directEmailSubject"
                type="text"
                class="admin-input"
                placeholder="Pesan dari Portfolio Website"
              />
            </AdminField>

            <div class="bg-black p-3 border border-surface-container-highest text-xs text-on-surface-variant font-mono space-y-1">
              <span class="text-primary font-bold">Preview Target Mailto:</span><br/>
              <span class="text-white break-all">mailto:{{ form.social?.email?.url || 'mikailcoding64@gmail.com' }}?subject={{ encodeURIComponent(form.contact?.directEmailSubject || 'Pesan dari Portfolio Website') }}</span>
            </div>
          </div>
        </section>


        <!-- ==========================================
             TAB: PENGATURAN
             ========================================== -->
        <section v-if="activeTab === 'pengaturan'" class="space-y-6">
          <h2 class="section-title">⚙️ Pengaturan Website</h2>

          <AdminField label="Nama Website (di header)">
            <input v-model="form.siteName" type="text" class="admin-input" placeholder="MIKAIL.DEV" />
          </AdminField>

          <AdminField label="Logo Website (di header)">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-surface-container border-2 border-surface-container-highest p-4">
              <img
                :src="(form.siteLogo || '/logo.png') + '?v=2'"
                alt="Logo Preview"
                class="w-14 h-14 object-contain rounded-xl border-2 border-primary-container bg-black p-1 shadow-[3px_3px_0px_0px_#ff9d00] shrink-0"
              />
              <div class="space-y-2 flex-1 w-full">
                <input
                  v-model="form.siteLogo"
                  type="text"
                  class="admin-input text-xs font-mono"
                  placeholder="/logo.png"
                />
                <div class="flex gap-2">
                  <label class="inline-flex items-center gap-2 border-2 border-primary text-primary px-3 py-1.5 text-xs font-bold uppercase cursor-pointer hover:bg-primary hover:text-black transition-colors">
                    <span class="material-symbols-outlined text-sm">upload</span>
                    Ganti Logo (Upload)
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="e => uploadFile(e, url => form.siteLogo = url)"
                    />
                  </label>
                  <button
                    v-if="form.siteLogo && form.siteLogo !== '/logo.png'"
                    type="button"
                    class="border-2 border-surface-container-highest text-on-surface-variant px-3 py-1.5 text-xs uppercase hover:text-white transition-colors"
                    @click="form.siteLogo = '/logo.png'"
                  >
                    Reset Default
                  </button>
                </div>
              </div>
            </div>
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
              <SectionsEducationSection v-if="activeTab === 'pendidikan'" :data="form" />

              <!-- Preview Pengalaman -->
              <div v-if="activeTab === 'pengalaman'" class="space-y-6">
                <h2 class="text-headline-lg font-headline-lg text-secondary uppercase flex items-center gap-4">
                  <span class="material-symbols-outlined text-4xl">work</span>
                  PENGALAMAN & ORGANISASI
                </h2>
                <div class="relative ml-8 border-l-4 border-dashed border-surface-container-highest pl-12 space-y-10 py-4">
                  <div
                    v-for="item in form.experience"
                    :key="item.institution"
                    class="relative bg-surface-container p-6 border-4 border-black"
                    :style="{
                      boxShadow: '4px 4px 0px 0px ' + (item.color === 'secondary' ? '#eeb1ff' : item.color === 'primary' ? '#ffc485' : '#00e5f4')
                    }"
                  >
                    <div class="flex justify-between items-center mb-3">
                      <span class="font-label-sm text-label-sm" :class="'text-' + item.color">{{ item.period }}</span>
                      <span class="px-2 py-0.5 text-[11px] uppercase border font-bold" :class="['text-' + item.color, 'border-' + item.color]">
                        {{ item.badge }}
                      </span>
                    </div>
                    <h4 class="font-headline-lg text-lg text-white mb-1 uppercase">{{ item.institution }}</h4>
                    <p v-if="item.subtitle" class="text-on-surface-variant text-xs font-label-sm uppercase mb-2">{{ item.subtitle }}</p>
                    <p class="text-on-surface-variant font-body-md text-sm leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>

              <div v-if="activeTab === 'proyek'" class="space-y-6">
                <!-- Switcher Filter Preview Proyek -->
                <div class="flex items-center justify-between border-b-2 border-surface-container-highest pb-3">
                  <div class="flex items-center gap-2 text-xs font-mono text-on-surface-variant uppercase">
                    <span class="material-symbols-outlined text-sm text-primary">visibility</span>
                    <span>Tampilan:</span>
                  </div>
                  <div class="flex gap-2">
                    <button
                      type="button"
                      class="px-3 py-1 text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1"
                      :class="previewProjectMode === 'home'
                        ? 'bg-primary text-black border-black shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-surface-container text-on-surface-variant border-surface-container-highest hover:text-on-background'"
                      @click="previewProjectMode = 'home'"
                    >
                      <span class="material-symbols-outlined text-sm">home</span>
                      Beranda ({{ form.projects.filter(p => p.showOnHome).length }})
                    </button>
                    <button
                      type="button"
                      class="px-3 py-1 text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1"
                      :class="previewProjectMode === 'all'
                        ? 'bg-primary text-black border-black shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-surface-container text-on-surface-variant border-surface-container-highest hover:text-on-background'"
                      @click="previewProjectMode = 'all'"
                    >
                      <span class="material-symbols-outlined text-sm">folder</span>
                      Semua ({{ form.projects.length }})
                    </button>
                  </div>
                </div>

                <SectionsProjectsGrid :projects="previewProjectMode === 'home' ? form.projects.filter(p => p.showOnHome) : form.projects" />
                <div v-if="previewProjectMode === 'home' && form.projects.filter(p => p.showOnHome).length === 0" class="text-center py-8 text-on-surface-variant text-xs font-mono border-2 border-dashed border-surface-container-highest">
                  [ Tidak ada proyek yang dipilih untuk Beranda. Klik tombol "Di Beranda" pada proyek di sebelah kiri ]
                </div>
              </div>

              <SectionsSocialSection v-if="activeTab === 'sosial'" :data="form" />

              <!-- Preview Kontak -->
              <div v-if="activeTab === 'kontak'" class="space-y-6">
                <div class="bg-surface-container-low border-4 border-black p-6 space-y-4 shadow-[6px_6px_0px_0px_#ffc485]">
                  <div class="bg-primary text-on-primary px-3 py-1 font-bold text-xs uppercase inline-block">
                    Preview Integrasi Kontak & Email
                  </div>
                  <div class="space-y-2 text-xs font-mono">
                    <p class="text-on-surface-variant">Email Tujuan: <span class="text-primary font-bold">{{ form.social?.email?.url || 'mikailcoding64@gmail.com' }}</span></p>
                    <p class="text-on-surface-variant">Subject Default: <span class="text-white">{{ form.contact?.directEmailSubject || 'Pesan dari Portfolio Website' }}</span></p>
                    <p class="text-on-surface-variant">Status EmailJS: 
                      <span v-if="form.contact?.emailjsServiceId && form.contact?.emailjsTemplateId && form.contact?.emailjsPublicKey" class="text-green-400 font-bold">✓ TERHUBUNG (SIAP KIRIM)</span>
                      <span v-else class="text-amber-400 font-bold">⚠ STANDBY (MASUKKAN KREDENSIAL DI KIRI)</span>
                    </p>
                  </div>
                  <a
                    :href="'mailto:' + (form.social?.email?.url || 'mikailcoding64@gmail.com') + '?subject=' + encodeURIComponent(form.contact?.directEmailSubject || 'Pesan dari Portfolio Website')"
                    class="block bg-primary-container text-on-primary-container p-3 border-2 border-black font-bold uppercase text-xs text-center shadow-[3px_3px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                    title="Klik untuk tes membuka email client"
                  >
                    Test Buka Email Client (Mailto)
                  </a>
                </div>
              </div>

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
const activeTab          = ref('profil')
const expandedProject    = ref(null)
const previewProjectMode = ref('home') // 'home' | 'all'
const isSaving           = ref(false)
const saveStatus         = ref(null) // 'success' | 'error' | null
const showScorePop       = ref(false)

// ---- Daftar Tab Navigasi ----
const tabs = [
  { id: 'profil',      label: 'Profil',      icon: 'person' },
  { id: 'hero',        label: 'Hero',        icon: 'home' },
  { id: 'pendidikan',  label: 'Pendidikan',  icon: 'school' },
  { id: 'pengalaman',  label: 'Pengalaman',  icon: 'work' },
  { id: 'proyek',      label: 'Proyek',      icon: 'folder' },
  { id: 'sosial',      label: 'Sosial',      icon: 'share' },
  { id: 'kontak',      label: 'Kontak',      icon: 'mail' },
  { id: 'pengaturan',  label: 'Pengaturan',  icon: 'settings' },
]

// ---- Form Data (sama strukturnya dengan portfolio.json) ----
const form = reactive({
  personal:   { name: '', role: '', tagline: '', bio: '', photoUrl: '' },
  hero:       { title: '', subtitle: '', description: '', ctaPrimary: '', ctaSecondary: '', ctaPrimaryLink: '', ctaSecondaryLink: '' },
  education:  [],
  experience: [],
  projects:   [],
  social: {
    github:    { url: '', iconUrl: null },
    linkedin:  { url: '', iconUrl: null },
    instagram: { url: '', iconUrl: null },
    email:     { url: '', iconUrl: null },
  },
  contact: {
    emailjsServiceId: '',
    emailjsTemplateId: '',
    emailjsPublicKey: '',
    directEmailSubject: 'Pesan dari Portfolio Website',
    directEmailBody: 'Halo Mikail, saya tertarik dengan profil dan proyek Anda. Mari kita diskusikan peluang kerja sama.',
  },
  siteName:   '',
  siteLogo:   '/logo.png',
  footerText: '',
})

// ---- Konfigurasi tampilan platform sosial ----
const socialPlatforms = [
  {
    key: 'github',
    label: 'GitHub',
    icon: 'code',
    color: 'text-on-background',
    shadowColor: '#ffc485',
    urlLabel: 'GitHub URL',
    placeholder: 'https://github.com/username',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'work',
    color: 'text-tertiary',
    shadowColor: '#00e5f4',
    urlLabel: 'LinkedIn URL',
    placeholder: 'https://linkedin.com/in/username',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: 'photo_camera',
    color: 'text-secondary',
    shadowColor: '#eeb1ff',
    urlLabel: 'Instagram URL',
    placeholder: 'https://instagram.com/username',
  },
  {
    key: 'email',
    label: 'Email',
    icon: 'mail',
    color: 'text-primary',
    shadowColor: '#ffc485',
    urlLabel: 'Alamat Email',
    placeholder: 'nama@contoh.com',
  },
]

// Toggle ikon sosial: jika sudah ada iconUrl, hapus; jika belum, buka file picker
const toggleSocialIcon = (key) => {
  if (form.social[key].iconUrl) {
    form.social[key].iconUrl = null
  }
  // Jika tidak ada iconUrl, biarkan user upload lewat tombol Upload Langsung
}


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

const doLogin = async () => {
  loginError.value = ''
  if (!loginPassword.value) {
    loginError.value = 'Silakan masukkan password admin.'
    return
  }

  try {
    // 1. Verifikasi password ke server
    await $fetch('/api/portfolio', {
      method: 'POST',
      body: { password: loginPassword.value, action: 'verify' }
    })

    // 2. Simpan session dan login
    sessionStorage.setItem('admin_pass', loginPassword.value)
    await loadData()
    isLoggedIn.value = true
  } catch (err) {
    if (err.statusCode === 401) {
      loginError.value = 'Password salah! Periksa kembali password Anda.'
    } else {
      loginError.value = 'Gagal terhubung ke server: ' + (err.data?.statusMessage || err.message || 'Pastikan server berjalan.')
    }
  }
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
  if (!result) return
  const data = JSON.parse(JSON.stringify(result))

  // Normalisasi: pastikan social selalu berformat { url, iconUrl }
  // (agar kompatibel jika data lama masih berupa string)
  const socialKeys = ['github', 'linkedin', 'instagram', 'email']
  if (data.social) {
    socialKeys.forEach(key => {
      if (typeof data.social[key] === 'string') {
        data.social[key] = { url: data.social[key], iconUrl: null }
      } else if (!data.social[key]) {
        data.social[key] = { url: '', iconUrl: null }
      }
    })
  }

  // Normalisasi hero links
  if (data.hero) {
    if (!data.hero.ctaPrimaryLink) data.hero.ctaPrimaryLink = ''
    if (!data.hero.ctaSecondaryLink) data.hero.ctaSecondaryLink = ''
  }

  // Normalisasi: pastikan setiap proyek punya field useImage, showOnHome, dan links
  if (data.projects) {
    data.projects = data.projects.map((p, idx) => {
      let links = []
      if (Array.isArray(p.links) && p.links.length > 0) {
        links = p.links.map(l => ({ label: l.label || 'Live Demo', url: l.url || '' }))
      } else {
        if (p.linkDemo) links.push({ label: 'Live Demo', url: p.linkDemo })
        if (p.linkRepo) links.push({ label: 'GitHub', url: p.linkRepo })
      }
      return {
        ...p,
        links,
        useImage: p.useImage ?? (!!p.imageUrl),
        showOnHome: p.showOnHome !== undefined ? !!p.showOnHome : (idx < 2),
      }
    })
  }

  // Normalisasi kontak & EmailJS
  if (!data.contact) {
    data.contact = {
      emailjsServiceId: '',
      emailjsTemplateId: '',
      emailjsPublicKey: '',
      directEmailSubject: 'Pesan dari Portfolio Website',
      directEmailBody: 'Halo Mikail, saya tertarik dengan profil dan proyek Anda. Mari kita diskusikan peluang kerja sama.',
    }
  }

  // Normalisasi siteLogo
  if (!data.siteLogo) {
    data.siteLogo = '/logo.png'
  }

  Object.assign(form, data)
}

const saveData = async () => {
  if (isSaving.value) return
  isSaving.value = true
  saveStatus.value = null

  try {
    const password = sessionStorage.getItem('admin_pass') || ''

    // Sinkronisasi linkDemo & linkRepo untuk kompatibilitas data
    const payload = JSON.parse(JSON.stringify(form))
    if (payload.projects) {
      payload.projects.forEach(p => {
        if (Array.isArray(p.links) && p.links.length > 0) {
          const demo = p.links.find(l => /demo|web|live|app|game|play/i.test(l.label || ''))
          const repo = p.links.find(l => /github|repo|code|source/i.test(l.label || ''))
          p.linkDemo = demo?.url || (p.links[0]?.url || null)
          p.linkRepo = repo?.url || (p.links[1]?.url || null)
        }
      })
    }

    await $fetch('/api/portfolio', {
      method: 'POST',
      body: { ...payload, password },
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
// FUNGSI TAMBAH / KELOLA ITEM
// ============================================================

const addEducation = () => {
  form.education.push({
    period: '20XX - 20XX',
    color: 'primary',
    badge: 'Pendidikan',
    institution: 'Nama Institusi',
    subtitle: 'Jurusan / Program Studi',
    description: 'Deskripsi...',
  })
}

const addExperience = () => {
  form.experience.push({
    period: '20XX - 20XX',
    color: 'tertiary',
    badge: 'Pengalaman',
    institution: 'Nama Perusahaan / Organisasi',
    subtitle: 'Jabatan / Posisi',
    description: 'Deskripsi tanggung jawab...',
  })
}

const addProject = () => {
  const newId = 'proj-' + Date.now()
  form.projects.push({
    id: newId,
    title: 'Proyek Baru',
    subtitle: 'Web Application',
    size: 'medium',
    description: 'Deskripsi proyek...',
    tags: [],
    tagColor: 'primary',
    showOnHome: false,
    useImage: false,
    imageUrl: null,
    links: [
      { label: 'Live Demo', url: '' }
    ],
    linkDemo: null,
    linkRepo: null,
  })
  expandedProject.value = form.projects.length - 1
}

const addProjectLink = (proj) => {
  if (!proj.links) proj.links = []
  proj.links.push({ label: 'Live Demo', url: '' })
}

const removeProjectLink = (proj, index) => {
  if (proj.links) {
    proj.links.splice(index, 1)
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

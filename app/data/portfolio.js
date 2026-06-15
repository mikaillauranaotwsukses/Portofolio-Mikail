// ============================================================
//  FILE INI ADALAH TEMPAT ANDA MENGEDIT SEMUA DATA WEBSITE
//  Ganti semua teks yang ada sesuai dengan informasi Anda!
// ============================================================

export const portfolioData = {

  // ----------------------------------------------------------
  // INFORMASI PRIBADI
  // ----------------------------------------------------------
  personal: {
    name: "MIKAIL",          // Nama Anda
    role: "IT Student",      // Jabatan/Role Anda
    tagline: "Mahasiswa Teknik Informatika", // Tagline singkat
    bio: "Saya seorang mahasiswa IT yang bersemangat membangun sistem digital. Saat ini fokus belajar pengembangan web full-stack dan jaringan komputer.",
    photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5w1O49VEEIqjjmvbL-8F2HA0wsBT_Kwqqqp8DmHoa4VrxCWg3uaYL3nnkUQkdgrMeA-i_7AJFo4cjyP-51cozY8fjKNqTvr7uJ6GbroIMXlkkj9N7T5WOUQFBqRDmBqdwSdAkusn1_L6iVrKarmLUVObo0erqR8zE4sqv9_B7gjRzG-cQBCbD-vVz0hAzUQPcXQ26hctilsj0JVKLs54Qv5aE7EnWTVE3atEUZEDPzHtw9Uev1v-fLmfn1E8xYsgK2kaElZyistg",
  },

  // ----------------------------------------------------------
  // HERO / HALAMAN UTAMA
  // ----------------------------------------------------------
  hero: {
    title: "MIKAIL",                       // Nama besar di hero
    subtitle: "IT Student & Web Developer", // Subtitle di bawah nama
    description: "Membangun solusi digital yang fungsional dan efisien. Fokus pada pengembangan web dan jaringan komputer.",
    ctaPrimary: "LIHAT PROYEK",            // Teks tombol utama
    ctaSecondary: "TENTANG SAYA",          // Teks tombol kedua
  },

  // ----------------------------------------------------------
  // KEAHLIAN / KEMAMPUAN (di halaman About)
  // Nilai persentase: 0-100
  // ----------------------------------------------------------
  skills: [
    {
      category: "Web Development",
      icon: "code",
      iconColor: "text-tertiary",
      items: [
        { name: "JavaScript", percentage: 80 },
        { name: "PHP / Laravel", percentage: 65 },
        { name: "HTML & CSS", percentage: 90 },
      ]
    },
    {
      category: "Backend & Database",
      icon: "storage",
      iconColor: "text-primary",
      items: [
        { name: "MySQL", percentage: 75 },
        { name: "Node.js", percentage: 60 },
        { name: "PostgreSQL", percentage: 55 },
      ]
    },
    {
      category: "Jaringan & Sistem",
      icon: "hub",
      iconColor: "text-secondary",
      items: [
        { name: "TCP/IP & Routing", percentage: 70 },
        { name: "Linux Server", percentage: 55 },
        { name: "Docker", percentage: 50 },
      ]
    },
  ],

  // ----------------------------------------------------------
  // TEKNOLOGI YANG DIKUASAI (di halaman Home & About)
  // ----------------------------------------------------------
  techStack: [
    "JavaScript",
    "PHP",
    "React.js",
    "Node.js",
    "MySQL",
    "Docker",
    "Git",
    "Linux",
  ],

  // ----------------------------------------------------------
  // RIWAYAT PENDIDIKAN (di halaman About)
  // ----------------------------------------------------------
  education: [
    {
      period: "2022 - Sekarang",
      color: "primary",      // primary (oranye), secondary (ungu), tertiary (cyan)
      badge: "Sarjana (S1)",
      institution: "Universitas Teknologi Indonesia",
      description: "Jurusan Teknik Informatika. Fokus pada Rekayasa Perangkat Lunak dan Kecerdasan Buatan.",
    },
    {
      period: "2021 - 2022",
      color: "secondary",
      badge: "Sertifikasi",
      institution: "Cisco Networking Academy",
      description: "Menyelesaikan CCNA 1 & 2. Memahami routing, switching, dan protokol keamanan jaringan.",
    },
    {
      period: "2019 - 2021",
      color: "tertiary",
      badge: "SMK",
      institution: "SMK Negeri Teknik Komputer",
      description: "Jurusan Teknik Komputer Jaringan. Juara 1 Lomba Robotik Tingkat Provinsi.",
    },
  ],

  // ----------------------------------------------------------
  // PROYEK (di halaman Projects & Home)
  // size: "large" (lebar penuh), "medium" (setengah), "small" (sepertiga)
  // ----------------------------------------------------------
  projects: [
    {
      id: "proj-1",
      title: "Sistem Absensi Online",
      subtitle: "Web Application",
      icon: "database",
      iconColor: "text-tertiary",
      size: "large",
      description: "Sistem absensi berbasis web dengan QR Code untuk mahasiswa dan dosen. Dilengkapi dashboard monitoring real-time.",
      tags: ["PHP", "MySQL", "Laravel"],
      tagColor: "tertiary",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvC9_LWmtFIK36O-1aTUd0W7qh1aukEzKcnxudC6plWlYhV6DFQmCNVjpptgCHnS1sj5Vw6m9vR7-yVMrv-ANEFOUhbaYbMuJ2joU28Z7HaEcCos6qKcYLmb2SPFI11-L1Ayl2bGvWntmaLeeg1nRIctJ5F2s2hIYCY-YrKT8QxtPVovwGKNEPmr0lE0X3fg4pfII-c5tZbtQtGYlL9rPdj7-p8bxsLEXvm5Q6ZCicO0C9lLMJBgmU3TWOP8ah38sUPw86M_G2l1I",
    },
    {
      id: "proj-2",
      title: "Dashboard Monitor",
      subtitle: "Data Visualization",
      icon: "monitoring",
      iconColor: "text-primary",
      size: "medium",
      description: "Dashboard visualisasi data untuk memantau performa jaringan komputer kampus secara real-time.",
      tags: ["React", "D3.js", "Node.js"],
      tagColor: "primary",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsTT4ULmtFTm6CP8M5ldl1tSxjilCndFq9rSDirrVsFJ61UxP438O7z_mc7chrElIJSXahHxOozdcyCIOKT7Qf49vK9Hba312pPfsQcrdCu23a1GnG9EYq5vuktmtEK2YdnYwbhgxW30K6__PtIVuRmY4IBTUtn9EHEvoSvtgXERNg-li7FntiXup6bjI3kB3TEpnZyeZKq3tvh0jknTO1aoJK0zWGsK3KcxXX-PW1n-ui5BBz5fu-DKnjgfdfwrWxeIuSnyHn4qg",
    },
    {
      id: "proj-3",
      title: "Chatbot Kampus",
      subtitle: "AI Integration",
      icon: "smart_toy",
      iconColor: "text-secondary",
      size: "medium",
      description: "Chatbot berbasis NLP untuk menjawab pertanyaan seputar kampus secara otomatis.",
      tags: ["Python", "Flask", "NLP"],
      tagColor: "secondary",
      imageUrl: null,
    },
    {
      id: "proj-4",
      title: "Aplikasi Kasir",
      subtitle: "Desktop App",
      icon: "point_of_sale",
      iconColor: "text-tertiary",
      size: "small",
      description: "Aplikasi kasir sederhana untuk UMKM dengan fitur laporan penjualan harian.",
      tags: ["Python", "Tkinter", "SQLite"],
      tagColor: "tertiary",
      imageUrl: null,
    },
  ],

  // ----------------------------------------------------------
  // LINK SOSIAL MEDIA (di halaman Contact & Footer)
  // ----------------------------------------------------------
  social: {
    github: "https://github.com/username-anda",        // Ganti dengan link GitHub Anda
    linkedin: "https://linkedin.com/in/username-anda", // Ganti dengan LinkedIn Anda
    email: "email@anda.com",                           // Ganti dengan email Anda
  },

  // ----------------------------------------------------------
  // JUDUL WEBSITE & FOOTER
  // ----------------------------------------------------------
  siteName: "MIKAIL.DEV",
  footerText: "© 2024 MIKAIL. All Rights Reserved.",
}

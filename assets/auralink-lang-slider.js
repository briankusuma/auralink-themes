/**
 * AuraLink Language Switcher & Real-time Translation Engine
 * Figma Node 2655:276 / 2899:1097
 * Supports dynamic EN <-> ID switching, persistence, and instant DOM translation.
 */

(function () {
  const STORAGE_KEY = 'auralink_locale';

  // Comprehensive Bilingual Dictionary (EN -> ID)
  const DICTIONARY = {
    // Header & Navigation
    'Home': 'Beranda',
    'Catalog': 'Katalog',
    'Contact': 'Kontak',
    'About': 'Tentang',
    'Search': 'Cari',
    'Cart': 'Keranjang',
    'Log in': 'Masuk',
    'Sign in': 'Masuk',
    'Sign up': 'Daftar',
    'Account': 'Akun',
    'Menu': 'Menu',
    'Close': 'Tutup',
    'Language': 'Bahasa',
    'Country/region': 'Negara/wilayah',

    // AuraLink Hero Section
    'Your Smart Home\nSafe - Seamless. and Secure': 'Rumah Pintar Anda\nAman - Mulus. dan Terpercaya',
    'Your Smart Home\r\nSafe - Seamless. and Secure': 'Rumah Pintar Anda\r\nAman - Mulus. dan Terpercaya',
    'Your Smart Home Safe - Seamless. and Secure': 'Rumah Pintar Anda Aman - Mulus. dan Terpercaya',
    'Your Smart Home': 'Rumah Pintar Anda',
    'Safe - Seamless. and Secure': 'Aman - Mulus. dan Terpercaya',
    'Safe - Seamless. and Secure.': 'Aman - Mulus. dan Terpercaya.',
    'Discover the latest smart home devices designed to simplify your life,  and optimize energy efficiency.': 'Temukan perangkat rumah pintar terbaru yang dirancang untuk mempermudah hidup Anda, dan mengoptimalkan efisiensi energi.',
    'Discover the latest smart home devices designed to simplify your life, and optimize energy efficiency.': 'Temukan perangkat rumah pintar terbaru yang dirancang untuk mempermudah hidup Anda, dan mengoptimalkan efisiensi energi.',
    'Get started': 'Mulai sekarang',
    'Smart': 'Pintar',
    'Safe': 'Aman',
    'Secure': 'Terpercaya',

    // AuraLink Bento Section
    'Welcome to a Smarter Way of Living': 'Selamat Datang di Cara Hidup yang Lebih Pintar',
    'Transforming everyday living': 'Mentransformasi kehidupan sehari-hari',
    'AI devices learn your habits and adjust automatically.': 'Perangkat AI mempelajari kebiasaan Anda dan menyesuaikan secara otomatis.',
    'Connected Ecosystem': 'Ekosistem Terhubung',
    'Smart, Safe, and Secure': 'Pintar, Aman, dan Terpercaya',
    'Seamless Integration with Your Life': 'Integrasi Mulus dengan Kehidupan Anda',
    'Integration': 'Integrasi',

    // AuraLink Slider Section
    'Discover the latest smart home devices': 'Temukan perangkat rumah pintar terbaru',
    'Transform your home with intelligent devices that learn, adapt, and respond': 'Ubah rumah Anda dengan perangkat cerdas yang belajar, beradaptasi, dan merespons',
    'Lumi Glow': 'Lumi Glow',
    'Smart Lights': 'Lampu Pintar',
    'These AI-powered lights automatically adjust brightness and color temperature based on the time of day.': 'Lampu bertenaga AI ini secara otomatis menyesuaikan kecerahan dan suhu warna berdasarkan waktu.',
    'Control Hub': 'Pusat Kontrol',
    'Smart Hub': 'Hub Pintar',
    'Intuitive central control unit engineered for high-precision tactile management of all your smart devices.': 'Unit kontrol sentral intuitif yang dirancang untuk pengelolaan taktil berpresisi tinggi bagi semua perangkat pintar Anda.',
    'Docking Pad': 'Dok Pengisi Daya',
    'Power & Charge': 'Daya & Pengisian',
    'Seamless multi-device charging station crafted with architectural elegance and intelligent thermal regulation.': 'Stasiun pengisian daya multi-perangkat yang dirancang dengan keanggunan arsitektural dan regulasi termal cerdas.',
    'View Product': 'Lihat Produk',

    // AuraLink Impact Section
    '“The integration of AI into smart home devices is revolutionizing how we interact with our living spaces. These technologies not only bring unprecedented convenience but also optimize energy use.”': '“Integrasi AI ke dalam perangkat rumah pintar merevolusi cara kita berinteraksi dengan ruang hidup kita. Teknologi ini tidak hanya menghadirkan kenyamanan luar biasa tetapi juga mengoptimalkan efisiensi energi.”',
    'The integration of AI into smart home devices is revolutionizing how we interact with our living spaces. These technologies not only bring unprecedented convenience but also optimize energy use.': 'Integrasi AI ke dalam perangkat rumah pintar merevolusi cara kita berinteraksi dengan ruang hidup kita. Teknologi ini tidak hanya menghadirkan kenyamanan luar biasa tetapi juga mengoptimalkan efisiensi energi.',
    'Dr. Dayat Santoso': 'Dr. Dayat Santoso',
    'CEO of NexaTech Innovations': 'CEO NexaTech Innovations',
    'Product Launched over worldwide': 'Produk Diluncurkan ke seluruh dunia',
    'Countries connected to our ecosystem': 'Negara terhubung ke ekosistem kami',
    'raised in Series B funding': 'dana terkumpul dalam pendanaan Seri B',

    // AuraLink Testimonials Section
    'Here’s what people says': 'Inilah Yang Orang Katakan',
    'Here\'s what people says': 'Inilah Yang Orang Katakan',
    'Real stories from real homes—discover how our AI-powered devices are making everyday life smarter, safer, and more effortless.': 'Kisah nyata dari rumah nyata—temukan bagaimana perangkat bertenaga AI kami membuat kehidupan sehari-hari lebih pintar, aman, dan mudah.',
    'Case study': 'Studi kasus',
    '"Security and comfort finally work together."': '"Keamanan dan kenyamanan akhirnya berpadu."',
    'Security and comfort finally work together.': 'Keamanan dan kenyamanan akhirnya berpadu.',
    '“With facial recognition and smart locks, I never worry about lost keys or unknown visitors. Plus, the whole system works with my voice assistant—it’s seamless and secure.”': '“Dengan pengenalan wajah dan kunci pintar, saya tidak pernah khawatir kehilangan kunci atau pengunjung tak dikenal. Ditambah lagi, seluruh sistem berfungsi dengan asisten suara saya—mulus dan aman.”',
    'With facial recognition and smart locks, I never worry about lost keys or unknown visitors. Plus, the whole system works with my voice assistant—it’s seamless and secure.': 'Dengan pengenalan wajah dan kunci pintar, saya tidak pernah khawatir kehilangan kunci atau pengunjung tak dikenal. Ditambah lagi, seluruh sistem berfungsi dengan asisten suara saya—mulus dan aman.',
    'IT Consultant & Father of Two': 'Konsultan TI & Ayah Dua Anak',
    'Comfort': 'Kenyamanan',

    '"Effortless energy savings without lifting a finger."': '"Penghematan energi tanpa perlu repot."',
    'Effortless energy savings without lifting a finger.': 'Penghematan energi tanpa perlu repot.',
    '“The climate sensors learned our daily routines in just a few days. Our heating bill dropped by nearly 30% while the house always stays at the perfect temperature.”': '“Sensor iklim mempelajari rutinitas harian kami hanya dalam beberapa hari. Tagihan pemanas kami turun hampir 30% sementara rumah selalu berada pada suhu sempurna.”',
    'The climate sensors learned our daily routines in just a few days. Our heating bill dropped by nearly 30% while the house always stays at the perfect temperature.': 'Sensor iklim mempelajari rutinitas harian kami hanya dalam beberapa hari. Tagihan pemanas kami turun hampir 30% sementara rumah selalu berada pada suhu sempurna.',
    'Architect & Sustainability Director': 'Arsitek & Direktur Keberlanjutan',
    'Energy': 'Energi',
    'Climate': 'Iklim',

    '"Peace of mind wherever I travel."': '"Ketenangan pikiran ke mana pun saya bepergian."',
    'Peace of mind wherever I travel.': 'Ketenangan pikiran ke mana pun saya bepergian.',
    '“Being able to monitor the entire house in real time with end-to-end encryption gives our family genuine peace of mind. Everything connects without delays or bugs.”': '“Dapat memantau seluruh rumah secara real-time dengan enkripsi menyeluruh memberi keluarga kami ketenangan pikiran. Semuanya terhubung tanpa jeda atau kendala.”',
    'Being able to monitor the entire house in real time with end-to-end encryption gives our family genuine peace of mind. Everything connects without delays or bugs.': 'Dapat memantau seluruh rumah secara real-time dengan enkripsi menyeluruh memberi keluarga kami ketenangan pikiran. Semuanya terhubung tanpa jeda atau kendala.',
    'Product Designer': 'Desainer Produk',
    'Privacy': 'Privasi',
    'Connected': 'Terhubung',

    '"Intuitive and elegant design for home"': '"Desain intuitif dan elegan untuk rumah"',
    'Intuitive and elegant design for home': 'Desain intuitif dan elegan untuk rumah',
    '“Even my grandparents find the tactile switches and automated lighting simple to use. The industrial design blends naturally into our interior aesthetics.”': '“Bahkan kakek-nenek saya merasa sakelar taktil dan pencahayaan otomatis sangat mudah digunakan. Desain industrial menyatu secara alami dengan estetika interior kami.”',
    'Even my grandparents find the tactile switches and automated lighting simple to use. The industrial design blends naturally into our interior aesthetics.': 'Bahkan kakek-nenek saya merasa sakelar taktil dan pencahayaan otomatis sangat mudah digunakan. Desain industrial menyatu secara alami dengan estetika interior kami.',
    'Interior Stylist & Homeowner': 'Penata Interior & Pemilik Rumah',
    'Intuitive': 'Intuitif',
    'Aesthetic': 'Estetika',

    // AuraLink CTA Section
    'Your Journey to Smarter Living Starts with One Click.': 'Perjalanan Anda Menuju Hidup Lebih Pintar Dimulai dengan Satu Klik.',
    'Discover AI-powered devices that adapt to your lifestyle—bringing comfort, security, and efficiency to every corner of your home.': 'Temukan perangkat bertenaga AI yang menyesuaikan dengan gaya hidup Anda—menghadirkan kenyamanan, keamanan, dan efisiensi ke setiap sudut rumah Anda.',

    // Featured Collection Section
    'AuraLink Ecosystem': 'Ekosistem AuraLink',
    'Featured Devices': 'Perangkat Pilihan',
    'Explore all devices': 'Jelajahi semua perangkat',
    'Discover the latest intelligent devices engineered for seamless modern living.': 'Temukan perangkat cerdas terbaru yang dirancang untuk kehidupan modern yang mulus.',
    'Explore our complete ecosystem of AI-powered smart home devices designed to seamlessly enhance your everyday living.': 'Jelajahi ekosistem lengkap perangkat rumah pintar bertenaga AI kami yang dirancang untuk meningkatkan kehidupan sehari-hari Anda secara mulus.',
    'View all': 'Lihat semua',

    // Product & Storefront Terms
    'Add to cart': 'Tambah ke keranjang',
    'Sold out': 'Habis',
    'Sale': 'Diskon',
    'Regular price': 'Harga normal',
    'Sale price': 'Harga promo',
    'Unit price': 'Harga satuan',
    'Quantity': 'Jumlah',
    'Subtotal': 'Subtotal',
    'Check out': 'Checkout',
    'View cart': 'Lihat keranjang',
    'Your cart is empty': 'Keranjang Anda kosong',
    'Continue shopping': 'Lanjutkan belanja',
    'Search our store': 'Cari di toko kami',
    'No results found': 'Tidak ada hasil ditemukan',
    'Taxes and shipping calculated at checkout': 'Pajak dan biaya pengiriman dihitung saat checkout',
    'Customer reviews': 'Ulasan pelanggan',
    'Remove': 'Hapus',
    'Products': 'Produk',
    'Collections': 'Koleksi',
    'Filter:': 'Filter:',
    'Sort by:': 'Urutkan:',

    // Footer Links & Blocks
    'Company': 'Perusahaan',
    'Category': 'Kategori',
    'Connect': 'Terhubung',
    'Support': 'Bantuan',
    'Quick links': 'Tautan Cepat',
    'Subscribe to our emails': 'Berlangganan email kami',
    'Email': 'Email',
    'All rights reserved': 'Semua hak dilindungi undang-undang',
    'Privacy policy': 'Kebijakan privasi',
    'Terms of service': 'Ketentuan layanan',
    'Refund policy': 'Kebijakan pengembalian',
    'Shipping policy': 'Kebijakan pengiriman',
    'Contact information': 'Informasi kontak'
  };

  /**
   * Helper to normalize text for dictionary matching
   */
  function lookupTranslation(rawText) {
    if (!rawText || typeof rawText !== 'string') return null;
    const trimmed = rawText.trim();
    if (!trimmed) return null;

    if (DICTIONARY[trimmed]) return DICTIONARY[trimmed];

    // Normalized whitespace
    const normSpaces = trimmed.replace(/\s+/g, ' ');
    if (DICTIONARY[normSpaces]) return DICTIONARY[normSpaces];

    // Normalized quotes
    const normQuotes = trimmed.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    if (DICTIONARY[normQuotes]) return DICTIONARY[normQuotes];

    const fullNorm = normSpaces.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    if (DICTIONARY[fullNorm]) return DICTIONARY[fullNorm];

    return null;
  }

  /**
   * AuraLink Translator Singleton
   */
  class TranslatorController {
    constructor() {
      this.currentLocale = 'en';
      this.isTranslating = false;
      this.observer = null;
      this.init();
    }

    init() {
      // Determine initial locale
      const savedLocale = localStorage.getItem(STORAGE_KEY);
      const docLang = document.documentElement.lang ? document.documentElement.lang.slice(0, 2).toLowerCase() : 'en';

      if (savedLocale === 'id' || (!savedLocale && docLang === 'id')) {
        this.currentLocale = 'id';
      } else {
        this.currentLocale = 'en';
      }

      this.updateButtons(this.currentLocale);

      if (this.currentLocale === 'id') {
        this.applyIndonesian();
      }

      this.setupObserver();
    }

    setupObserver() {
      if (this.observer || typeof MutationObserver === 'undefined') return;

      this.observer = new MutationObserver((mutations) => {
        if (this.currentLocale !== 'id' || this.isTranslating) return;

        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.translateElement(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
              this.translateTextNode(node);
            }
          }
        }
      });

      this.observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    setLocale(targetLocale) {
      if (!targetLocale) return;
      const normalized = targetLocale.slice(0, 2).toLowerCase();

      this.currentLocale = normalized;
      localStorage.setItem(STORAGE_KEY, normalized);
      document.documentElement.lang = normalized;

      this.updateButtons(normalized);

      if (normalized === 'id') {
        this.applyIndonesian();
      } else {
        this.restoreEnglish();
      }

      // Dispatch event for third-party scripts or listening components
      window.dispatchEvent(
        new CustomEvent('auralink:locale-changed', {
          detail: { locale: normalized }
        })
      );
    }

    updateButtons(locale) {
      const allButtons = document.querySelectorAll('.auralink-lang-btn');
      allButtons.forEach((btn) => {
        const btnLocale = (btn.dataset.locale || '').slice(0, 2).toLowerCase();
        if (btnLocale === locale) {
          btn.classList.add('auralink-lang-btn--active');
          btn.setAttribute('aria-checked', 'true');
        } else {
          btn.classList.remove('auralink-lang-btn--active');
          btn.setAttribute('aria-checked', 'false');
        }
      });

      // Also update hidden inputs if present
      document.querySelectorAll('input[name="locale_code"]').forEach((input) => {
        input.value = locale;
      });
    }

    applyIndonesian() {
      if (this.isTranslating) return;
      this.isTranslating = true;

      try {
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode(node) {
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;
              const tag = parent.tagName.toUpperCase();
              if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'].includes(tag)) {
                return NodeFilter.FILTER_REJECT;
              }
              if (parent.closest('.auralink-lang-slider') || parent.closest('svg')) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        let currentNode;
        while ((currentNode = walker.nextNode())) {
          this.translateTextNode(currentNode);
        }

        // Translate placeholders
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((el) => {
          if (el.closest('.auralink-lang-slider')) return;
          if (el._auraOrigPlaceholder === undefined) {
            el._auraOrigPlaceholder = el.placeholder;
          }
          const translated = lookupTranslation(el._auraOrigPlaceholder);
          if (translated) {
            el.placeholder = translated;
          }
        });
      } finally {
        this.isTranslating = false;
      }
    }

    translateTextNode(node) {
      if (!node || node.nodeType !== Node.TEXT_NODE) return;
      if (node.parentElement && (node.parentElement.closest('.auralink-lang-slider') || node.parentElement.closest('svg'))) {
        return;
      }

      if (node._auraOrigText === undefined) {
        node._auraOrigText = node.nodeValue;
      }

      const orig = node._auraOrigText;
      const translated = lookupTranslation(orig);

      if (translated) {
        const leadingWs = orig.match(/^\s*/)[0];
        const trailingWs = orig.match(/\s*$/)[0];
        node.nodeValue = leadingWs + translated + trailingWs;
      }
    }

    translateElement(rootEl) {
      if (!rootEl || rootEl.nodeType !== Node.ELEMENT_NODE) return;
      if (rootEl.closest && (rootEl.closest('.auralink-lang-slider') || rootEl.closest('svg'))) return;

      const walker = document.createTreeWalker(
        rootEl,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toUpperCase();
            if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'].includes(tag)) {
              return NodeFilter.FILTER_REJECT;
            }
            if (parent.closest('.auralink-lang-slider') || parent.closest('svg')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let currentNode;
      while ((currentNode = walker.nextNode())) {
        this.translateTextNode(currentNode);
      }
    }

    restoreEnglish() {
      if (this.isTranslating) return;
      this.isTranslating = true;

      try {
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode(node) {
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;
              if (parent.closest('.auralink-lang-slider') || parent.closest('svg')) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        let currentNode;
        while ((currentNode = walker.nextNode())) {
          if (currentNode._auraOrigText !== undefined) {
            currentNode.nodeValue = currentNode._auraOrigText;
          }
        }

        // Restore placeholders
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((el) => {
          if (el._auraOrigPlaceholder !== undefined) {
            el.placeholder = el._auraOrigPlaceholder;
          }
        });
      } finally {
        this.isTranslating = false;
      }
    }
  }

  // Instantiate or attach global controller
  window.AuraLinkTranslator = window.AuraLinkTranslator || new TranslatorController();

  // Web Component Registration
  if (!customElements.get('auralink-lang-slider')) {
    customElements.define(
      'auralink-lang-slider',
      class AuraLinkLangSlider extends HTMLElement {
        connectedCallback() {
          this.buttons = this.querySelectorAll('.auralink-lang-btn');
          this.form = this.querySelector('form');
          this.input = this.querySelector('input[name="locale_code"]');

          this.buttons.forEach((btn) => {
            btn.addEventListener('click', this.handleLangClick.bind(this));
          });

          // Sync with active controller state
          if (window.AuraLinkTranslator) {
            window.AuraLinkTranslator.updateButtons(window.AuraLinkTranslator.currentLocale);
          }
        }

        handleLangClick(event) {
          event.preventDefault();
          const button = event.currentTarget;
          const targetLocale = button.dataset.locale;

          if (!targetLocale) return;

          if (window.AuraLinkTranslator) {
            window.AuraLinkTranslator.setLocale(targetLocale);
          }
        }
      }
    );
  }
})();

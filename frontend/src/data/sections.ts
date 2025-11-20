export type SectionTemplate = {
  id: string;
  name: string;
  description: string;
  category: 'hero' | 'header' | 'footer' | 'about' | 'features' | 'contact' | 'testimonials' | 'portfolio' | 'pricing' | 'team';
  tags: string[];
  difficulty: 'simple' | 'medium' | 'advanced';
  preview: string;
  responsive: boolean;
  html: string;
  css?: string;
  js?: string;
  features: string[];
};

export const heroSections: SectionTemplate[] = [
  {
    id: 'hero-modern-saas',
    name: 'Modern SaaS Hero',
    description: 'Clean, conversion-focused hero with gradient design',
    category: 'hero',
    tags: ['modern', 'saas', 'gradient', 'cta'],
    difficulty: 'medium',
    preview: '/assets/templates/previews/hero-modern-saas.jpg',
    responsive: true,
    html: `<section class="px-6 py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
  <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">Build modern websites faster<span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300"> with SureSite</span></h1>
      <p class="mt-4 text-lg opacity-90">Launch beautiful, responsive sites with ready-made sections and templates.</p>
      <div class="mt-8 flex gap-3">
        <a href="#" class="px-5 py-3 rounded-lg bg-white text-gray-900 font-semibold">Get Started</a>
        <a href="#" class="px-5 py-3 rounded-lg border border-white/40">Live Demo</a>
      </div>
    </div>
    <div class="relative">
      <div class="aspect-video rounded-2xl bg-white/10 backdrop-blur border border-white/20"></div>
      <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-xl bg-white/10" />
    </div>
  </div>
</section>`,
    css: '',
    js: '',
    features: ['Responsive', 'Animated', 'CTA Buttons']
  },
  {
    id: 'hero-creative-agency',
    name: 'Creative Agency Hero',
    description: 'Split-screen layout with bold typography and video background',
    category: 'hero',
    tags: ['creative', 'video', 'bold', 'minimal'],
    difficulty: 'advanced',
    preview: '/assets/templates/previews/hero-creative-agency.jpg',
    responsive: true,
    html: `<section class="h-[70vh] grid md:grid-cols-2">
  <div class="flex items-center justify-center bg-black text-white p-12">
    <div>
      <p class="uppercase tracking-widest text-sm text-gray-400">Agency</p>
      <h1 class="text-5xl md:text-7xl font-black leading-none">We craft bold digital experiences</h1>
      <div class="mt-6 flex gap-3"><a class="px-5 py-3 bg-white text-black rounded-lg" href="#">See Work</a><a class="px-5 py-3 border border-white/40 rounded-lg" href="#">Contact</a></div>
    </div>
  </div>
  <div class="relative">
    <video class="w-full h-full object-cover" autoplay muted loop playsinline src=""></video>
    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
  </div>
</section>`,
    features: ['Split-screen', 'Video background']
  },
  {
    id: 'hero-ecommerce',
    name: 'E-commerce Hero',
    description: 'Product carousel with sale banner and search bar',
    category: 'hero',
    tags: ['e-commerce', 'carousel', 'sales'],
    difficulty: 'advanced',
    preview: '/assets/templates/previews/hero-ecommerce.jpg',
    responsive: true,
    html: `<section class="bg-white">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold">Spring Sale</h2>
      <input class="px-4 py-2 border rounded-lg" placeholder="Search products" />
    </div>
    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="aspect-square bg-gray-100 rounded-xl" />
      <div class="aspect-square bg-gray-100 rounded-xl" />
      <div class="aspect-square bg-gray-100 rounded-xl" />
      <div class="aspect-square bg-gray-100 rounded-xl" />
    </div>
  </div>
</section>`,
    features: ['Search bar', 'Product cards']
  },
  {
    id: 'hero-minimal',
    name: 'Minimal Gradient Hero',
    description: 'Large headline with soft gradient and simple CTA',
    category: 'hero',
    tags: ['minimal', 'gradient'],
    difficulty: 'simple',
    preview: '/assets/templates/previews/hero-minimal.jpg',
    responsive: true,
    html: `<section class="py-24 bg-gradient-to-b from-gray-50 to-white">
  <div class="max-w-5xl mx-auto px-6 text-center">
    <h1 class="text-5xl font-extrabold tracking-tight">Design. Build. Launch.</h1>
    <p class="mt-4 text-lg text-gray-600">Everything you need to go from idea to website in minutes.</p>
    <a class="mt-8 inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white" href="#">Start free</a>
  </div>
</section>`,
    features: ['Clean', 'Fast']
  },
  {
    id: 'hero-product-mockup',
    name: 'Product Mockup Hero',
    description: 'Showcase product screenshot with gradient background',
    category: 'hero',
    tags: ['product', 'screenshot'],
    difficulty: 'medium',
    preview: '/assets/templates/previews/hero-product.jpg',
    responsive: true,
    html: `<section class="py-24 bg-gradient-to-br from-sky-50 to-indigo-50">
  <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
    <div>
      <h1 class="text-5xl font-bold">Your next website, impeccably crafted</h1>
      <p class="mt-4 text-lg text-gray-600">Composable sections and stunning templates for every industry.</p>
      <div class="mt-8 flex gap-3"><a class="px-5 py-3 bg-indigo-600 text-white rounded-lg" href="#">Try now</a><a class="px-5 py-3 border rounded-lg" href="#">Preview</a></div>
    </div>
    <div class="aspect-video rounded-2xl bg-white shadow-xl" />
  </div>
</section>`,
    features: ['Screenshot', 'Dual CTA']
  },
  {
    id: 'hero-dark-neon',
    name: 'Dark Neon Hero',
    description: 'High-contrast dark hero with neon accents and particles',
    category: 'hero',
    tags: ['dark', 'neon', 'animated'],
    difficulty: 'advanced',
    preview: '/assets/templates/previews/hero-dark-neon.jpg',
    responsive: true,
    html: `<section class="py-28 bg-black text-white relative overflow-hidden">
  <div class="max-w-5xl mx-auto px-6 text-center">
    <h1 class="text-5xl md:text-6xl font-black tracking-tight">Create with confidence</h1>
    <p class="mt-4 text-gray-300">Striking visuals and motion enhance engagement and conversions.</p>
    <a class="mt-8 inline-block px-6 py-3 rounded-lg bg-fuchsia-500" href="#">Explore templates</a>
  </div>
  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#22d3ee,transparent_30%),radial-gradient(circle_at_70%_70%,#a78bfa,transparent_30%)]"></div>
</section>`,
    features: ['Dark mode', 'Particles']
  },
];

export const sectionCategories: Array<SectionTemplate['category']> = [
  'hero', 'header', 'footer', 'about', 'features', 'contact', 'testimonials', 'portfolio', 'pricing', 'team'
];



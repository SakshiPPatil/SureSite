export type PageTemplate = {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'business' | 'ecommerce' | 'personal';
  tags: string[];
  difficulty: 'simple' | 'medium' | 'advanced';
  preview: string;
  responsive: boolean;
  html?: string;
  css?: string;
  js?: string;
  features: string[];
};

export const pageTemplates: PageTemplate[] = [
  {
    id: 'page-portfolio-developer',
    name: 'Developer Portfolio',
    description: 'Clean portfolio with hero, projects grid, and contact section',
    category: 'personal',
    tags: ['portfolio', 'developer', 'software engineer', 'resume'],
    difficulty: 'medium',
    preview: '/assets/templates/screenshots/page-portfolio.jpg',
    responsive: true,
    html: `<main class="font-sans">
  <section class="px-6 py-20 text-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
    <h1 class="text-4xl md:text-5xl font-black">Hi, I'm <span class="text-yellow-300">Your Name</span></h1>
    <p class="mt-3 opacity-90">Software Engineer • Full‑stack • Problem Solver</p>
    <div class="mt-6 flex justify-center gap-3">
      <a class="px-5 py-3 bg-white text-gray-900 rounded-lg" href="#projects">View Projects</a>
      <a class="px-5 py-3 border border-white/40 rounded-lg" href="#contact">Contact</a>
    </div>
  </section>
  <section id="projects" class="px-6 py-16 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Projects</h2>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div class="p-6 rounded-xl border bg-white">Project A</div>
      <div class="p-6 rounded-xl border bg-white">Project B</div>
      <div class="p-6 rounded-xl border bg-white">Project C</div>
    </div>
  </section>
  <section id="contact" class="px-6 py-16 bg-gray-50">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Get in touch</h2>
      <form class="grid gap-3">
        <input class="px-4 py-3 border rounded-lg" placeholder="Your Name" />
        <input class="px-4 py-3 border rounded-lg" placeholder="Your Email" />
        <textarea class="px-4 py-3 border rounded-lg" placeholder="Message" rows="4"></textarea>
        <button class="px-5 py-3 bg-indigo-600 text-white rounded-lg w-max">Send</button>
      </form>
    </div>
  </section>
</main>`,
    css: '',
    js: '',
    features: ['Projects grid', 'Contact form'],
  },
  {
    id: 'page-blog-modern',
    name: 'Modern Blog',
    description: 'Clean blog layout with featured posts and sidebar',
    category: 'personal',
    tags: ['blog', 'content', 'articles', 'news'],
    difficulty: 'medium',
    preview: '/assets/templates/screenshots/page-blog.jpg',
    responsive: true,
    html: `<main class="font-sans max-w-6xl mx-auto px-6 py-8">
  <header class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4">My Blog</h1>
    <p class="text-gray-600">Thoughts, ideas, and insights</p>
  </header>
  
  <div class="grid lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      <article class="mb-8 p-6 border rounded-lg">
        <h2 class="text-2xl font-bold mb-3">Getting Started with Web Development</h2>
        <p class="text-gray-600 mb-4">Learn the fundamentals of HTML, CSS, and JavaScript...</p>
        <div class="flex items-center text-sm text-gray-500">
          <span>March 15, 2024</span>
          <span class="mx-2">•</span>
          <span>5 min read</span>
        </div>
      </article>
      
      <article class="mb-8 p-6 border rounded-lg">
        <h2 class="text-2xl font-bold mb-3">Modern CSS Techniques</h2>
        <p class="text-gray-600 mb-4">Explore advanced CSS features like Grid and Flexbox...</p>
        <div class="flex items-center text-sm text-gray-500">
          <span>March 10, 2024</span>
          <span class="mx-2">•</span>
          <span>8 min read</span>
        </div>
      </article>
    </div>
    
    <aside class="lg:col-span-1">
      <div class="p-6 border rounded-lg">
        <h3 class="text-lg font-bold mb-4">Categories</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-blue-600 hover:underline">Web Development</a></li>
          <li><a href="#" class="text-blue-600 hover:underline">Design</a></li>
          <li><a href="#" class="text-blue-600 hover:underline">Technology</a></li>
        </ul>
      </div>
    </aside>
  </div>
</main>`,
    css: '',
    js: '',
    features: ['Blog posts', 'Sidebar', 'Categories'],
  },
  {
    id: 'page-saas-landing',
    name: 'SaaS Landing Page',
    description: 'Hero with demo, features, pricing, testimonials, FAQ, CTA footer',
    category: 'landing',
    tags: ['saas', 'b2b', 'conversion-focused'],
    difficulty: 'advanced',
    preview: '/assets/templates/screenshots/page-saas-landing.jpg',
    responsive: true,
    html: `<main class="font-sans">
  <section class="px-6 py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-5xl font-black leading-tight">Grow faster with our SaaS</h1>
        <p class="mt-4 text-lg opacity-90">All-in-one toolkit to launch and scale your business.</p>
        <div class="mt-8 flex gap-3">
          <a href="#" class="px-5 py-3 rounded-lg bg-white text-gray-900 font-semibold">Start Free Trial</a>
          <a href="#" class="px-5 py-3 rounded-lg border border-white/40">View Demo</a>
        </div>
      </div>
      <div class="aspect-video rounded-2xl bg-white/10 backdrop-blur border border-white/20"></div>
    </div>
  </section>
  <section class="px-6 py-16 bg-white">
    <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
      <div class="p-6 rounded-xl border"><h3 class="font-semibold text-lg">Feature One</h3><p class="text-gray-600 mt-2">Short feature description.</p></div>
      <div class="p-6 rounded-xl border"><h3 class="font-semibold text-lg">Feature Two</h3><p class="text-gray-600 mt-2">Short feature description.</p></div>
      <div class="p-6 rounded-xl border"><h3 class="font-semibold text-lg">Feature Three</h3><p class="text-gray-600 mt-2">Short feature description.</p></div>
    </div>
  </section>
</main>`,
    css: '',
    js: '',
    features: ['Hero demo', 'Pricing table', 'Testimonials', 'FAQ', 'CTA footer'],
  },
  {
    id: 'page-app-download',
    name: 'App Download Landing',
    description: 'App features, store badges, screenshots carousel, reviews',
    category: 'landing',
    tags: ['app', 'mobile', 'product'],
    difficulty: 'medium',
    preview: '/assets/templates/screenshots/page-app-download.jpg',
    responsive: true,
    html: `<main>
  <section class="px-6 py-20 text-center bg-gray-50">
    <h1 class="text-4xl font-black">Experience the app</h1>
    <p class="mt-3 text-gray-600">Available on iOS and Android</p>
    <div class="mt-6 flex justify-center gap-3">
      <a class="px-5 py-3 bg-black text-white rounded-lg" href="#">App Store</a>
      <a class="px-5 py-3 bg-black text-white rounded-lg" href="#">Google Play</a>
    </div>
  </section>
  <section class="px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    <div class="aspect-[9/16] bg-white rounded-xl border" />
    <div class="aspect-[9/16] bg-white rounded-xl border" />
    <div class="aspect-[9/16] bg-white rounded-xl border" />
  </section>
</main>`,
    css: '',
    js: '',
    features: ['Store badges', 'Screenshots', 'CTA'],
  },
  {
    id: 'page-restaurant-home',
    name: 'Restaurant Homepage',
    description: 'Hero, menu highlights, location, reservations, reviews',
    category: 'business',
    tags: ['restaurant', 'local business', 'visual'],
    difficulty: 'medium',
    preview: '/assets/templates/screenshots/page-restaurant.jpg',
    responsive: true,
    html: `<main>
  <section class="h-[60vh] bg-[url('')] bg-cover bg-center flex items-center justify-center text-white">
    <div class="text-center bg-black/40 px-6 py-8 rounded-xl">
      <h1 class="text-5xl font-black">Taste the difference</h1>
      <a class="mt-6 inline-block px-6 py-3 bg-red-500 rounded-lg" href="#">Reserve a table</a>
    </div>
  </section>
  <section class="px-6 py-16 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Menu Highlights</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="aspect-square rounded-xl border" />
      <div class="aspect-square rounded-xl border" />
      <div class="aspect-square rounded-xl border" />
      <div class="aspect-square rounded-xl border" />
    </div>
  </section>
</main>`,
    css: '',
    js: '',
    features: ['Menu grid', 'Reservation CTA', 'Reviews'],
  },
];



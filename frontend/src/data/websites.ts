export type WebsiteTemplate = {
  id: string;
  name: string;
  description: string;
  category: 'business' | 'creative' | 'technology' | 'ecommerce';
  tags: string[];
  pages: string[];
  colorSchemes: string[];
  preview: string;
  responsive: boolean;
  features: string[];
  code?: {
    html: string;
    css?: string;
    js?: string;
  }
};

export const websiteTemplates: WebsiteTemplate[] = [
  {
    id: 'site-digital-agency',
    name: 'Digital Marketing Agency',
    description: '6-page professional agency site with animations and portfolio',
    category: 'business',
    tags: ['agency', 'animations', 'video'],
    pages: ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'],
    colorSchemes: ['Blue/Orange', 'Purple/Green', 'Dark/Neon'],
    preview: '/assets/templates/screenshots/site-digital-agency.jpg',
    responsive: true,
    features: ['Video backgrounds', 'Interactive elements', 'Case studies'],
    code: {
      html: `<header class="px-6 py-4 border-b"><div class="max-w-6xl mx-auto flex items-center justify-between"><div class="font-bold">Agency</div><nav class="hidden md:flex gap-4 text-sm"><a href="#">Home</a><a href="#">Services</a><a href="#">Portfolio</a><a href="#">Blog</a><a href="#">Contact</a></nav></div></header>
<main>
  <section class="px-6 py-24 bg-black text-white text-center"><h1 class="text-5xl font-black">We grow brands</h1><p class="mt-3 text-gray-300">Strategy, design, and development</p></section>
  <section class="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    <div class="p-6 rounded-xl border"><h3 class="font-semibold">SEO</h3></div>
    <div class="p-6 rounded-xl border"><h3 class="font-semibold">Design</h3></div>
    <div class="p-6 rounded-xl border"><h3 class="font-semibold">Development</h3></div>
  </section>
</main>
<footer class="px-6 py-8 border-t text-sm text-gray-600">© Agency</footer>`
    }
  },
  {
    id: 'site-e-learning',
    name: 'E-learning Platform',
    description: '7-page platform with catalog, course pages, instructors, dashboard, checkout',
    category: 'technology',
    tags: ['education', 'platform', 'dashboard'],
    pages: ['Home', 'Catalog', 'Course', 'Instructors', 'Blog', 'Dashboard', 'Checkout'],
    colorSchemes: ['Education', 'Professional', 'Playful'],
    preview: '/assets/templates/screenshots/site-elearning.jpg',
    responsive: true,
    features: ['Filters', 'Progress tracking', 'Payments'],
    code: {
      html: `<header class="px-6 py-4 border-b"><div class="max-w-6xl mx-auto flex items-center justify-between"><div class="font-bold">LearnX</div><nav class="hidden md:flex gap-4 text-sm"><a href="#">Catalog</a><a href="#">Instructors</a><a href="#">Blog</a><a href="#">Dashboard</a></nav></div></header>
<main>
  <section class="px-6 py-20 bg-indigo-50 text-center"><h1 class="text-4xl font-black">Learn anything</h1><p class="mt-3 text-gray-600">Courses by experts</p></section>
  <section class="px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    <div class="p-6 rounded-xl border"><h3 class="font-semibold">Course A</h3></div>
    <div class="p-6 rounded-xl border"><h3 class="font-semibold">Course B</h3></div>
    <div class="p-6 rounded-xl border"><h3 class="font-semibold">Course C</h3></div>
  </section>
</main>
<footer class="px-6 py-8 border-t text-sm text-gray-600">© LearnX</footer>`
    }
  },
  {
    id: 'site-restaurant',
    name: 'Restaurant/Food Business',
    description: 'Warm visuals with menu, reservation, location and reviews',
    category: 'business',
    tags: ['restaurant', 'food', 'local'],
    pages: ['Home', 'Menu', 'Reservations', 'Gallery', 'Contact'],
    colorSchemes: ['Warm', 'Dark', 'Clean'],
    preview: '/assets/templates/screenshots/site-restaurant.jpg',
    responsive: true,
    features: ['Menu grid', 'Reservation CTA', 'Reviews'],
    code: {
      html: `<header class=\"px-6 py-4 border-b\"><div class=\"max-w-6xl mx-auto flex items-center justify-between\"><div class=\"font-bold\">Bistro</div><nav class=\"hidden md:flex gap-4 text-sm\"><a href=\"#\">Menu</a><a href=\"#\">Reservations</a><a href=\"#\">Gallery</a><a href=\"#\">Contact</a></nav></div></header>
<main>
  <section class=\"h-[50vh] bg-gray-200 flex items-center justify-center text-4xl font-black\">Fresh & Tasty</section>
  <section class=\"px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-4 gap-4\"><div class=\"aspect-square border rounded-xl\"></div><div class=\"aspect-square border rounded-xl\"></div><div class=\"aspect-square border rounded-xl\"></div><div class=\"aspect-square border rounded-xl\"></div></section>
</main>
<footer class=\"px-6 py-8 border-t text-sm text-gray-600\">© Bistro</footer>`
    }
  },
  {
    id: 'site-real-estate',
    name: 'Real Estate Agency',
    description: 'Property listings with filters and agent profiles',
    category: 'business',
    tags: ['real estate', 'listings', 'maps'],
    pages: ['Home', 'Listings', 'Agents', 'Blog', 'Contact'],
    colorSchemes: ['Blue', 'Emerald', 'Slate'],
    preview: '/assets/templates/screenshots/site-realestate.jpg',
    responsive: true,
    features: ['Filters', 'Cards', 'Contact forms'],
    code: {
      html: `<header class=\"px-6 py-4 border-b\"><div class=\"max-w-6xl mx-auto flex items-center justify-between\"><div class=\"font-bold\">EstatePro</div><nav class=\"hidden md:flex gap-4 text-sm\"><a href=\"#\">Listings</a><a href=\"#\">Agents</a><a href=\"#\">Contact</a></nav></div></header>
<main>
  <section class=\"px-6 py-12 bg-gray-50\"><div class=\"max-w-6xl mx-auto grid md:grid-cols-3 gap-4\"><div class=\"p-6 border rounded-xl\">House A</div><div class=\"p-6 border rounded-xl\">House B</div><div class=\"p-6 border rounded-xl\">House C</div></div></section>
</main>`
    }
  },
  {
    id: 'site-saas-company',
    name: 'SaaS Company',
    description: 'Modern SaaS website with pricing and docs',
    category: 'technology',
    tags: ['saas', 'pricing', 'docs'],
    pages: ['Home', 'Features', 'Pricing', 'Docs', 'Blog', 'Contact'],
    colorSchemes: ['Indigo', 'Sky', 'Fuchsia'],
    preview: '/assets/templates/screenshots/site-saas.jpg',
    responsive: true,
    features: ['Pricing', 'Docs', 'Blog'],
    code: { html: `<section class=\"px-6 py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center\"><h1 class=\"text-5xl font-black\">Build faster</h1><p class=\"mt-3 opacity-90\">All-in-one toolkit</p></section>` }
  },
  {
    id: 'site-fashion-store',
    name: 'Fashion Store',
    description: 'Stylish e-commerce storefront with grid and cart',
    category: 'ecommerce',
    tags: ['fashion', 'store', 'shop'],
    pages: ['Home', 'Catalog', 'Product', 'Cart', 'Checkout'],
    colorSchemes: ['Pink', 'Black', 'Neutral'],
    preview: '/assets/templates/screenshots/site-fashion.jpg',
    responsive: true,
    features: ['Grid', 'Cart', 'Checkout'],
    code: { html: `<section class=\"px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-4 gap-4\"><div class=\"aspect-[3/4] border rounded-xl\"></div><div class=\"aspect-[3/4] border rounded-xl\"></div><div class=\"aspect-[3/4] border rounded-xl\"></div><div class=\"aspect-[3/4] border rounded-xl\"></div></section>` }
  }
];



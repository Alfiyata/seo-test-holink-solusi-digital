<script setup lang="ts">
import { getToolBySlug } from "~/../utils/tools";

const route = useRoute();
const tool = getToolBySlug(route.params.slug as string);

if (!tool) {
  throw createError({
    statusCode: 404,
    statusMessage: "Tool not found",
  });
}

const siteUrl = "https://your-domain.com";
const canonical = `${siteUrl}/tools/${tool.slug}`;
const keywords = [
  tool.name,
  `${tool.name} review`,
  tool.category,
  ...tool.features,
  ...tool.platforms,
].join(", ");

useSeoMeta({
  title: `${tool.name} - ${tool.category}`,
  description: tool.description,
  ogTitle: `${tool.name} - ${tool.category}`,
  ogDescription: tool.description,
  ogUrl: canonical,
  ogImage: tool.image,
  ogType: "article",
  keywords,
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: canonical,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        applicationCategory: tool.category,
        image: tool.image,
        url: canonical,
        offers: {
          "@type": "Offer",
          price: tool.pricing,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          reviewCount: tool.reviews,
        },
      }),
    },
  ],
});
</script>

<template>
  <main class="container">
    <NuxtLink to="/">← Back</NuxtLink>

    <article>
      <img class="mt-4" :src="tool.image" :alt="tool.name" />

      <h1 class="mt-4 mb-4 font-bold text-2xl">{{ tool.name }}</h1>

      <p class="mb-2 font-semibold">{{ tool.tagline }}</p>
      <p>{{ tool.description }}</p>

      <p class="mb-2 mt-2 font-bold text-lg">Pricing: {{ tool.pricing }}</p>

      <div class="flex items-center">
        <svg class="w-5 h-5 text-fg-yellow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          fill="yellow" viewBox="0 0 24 24">
          <path
            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
        <p class="ms-2 text-sm font-bold text-heading">{{ tool.rating }}</p>
        <span class="w-1 h-1 mx-1.5 bg-neutral-quaternary rounded-full"></span>
        <a href="#" class="text-sm font-medium text-heading underline hover:no-underline">{{ tool.reviews }} reviews</a>
      </div>

      <ul class="flex mt-2">
        <li v-for="feature in tool.features" :key="feature">
          <span
            class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-800 inset-ring inset-ring-gray-400/20 mr-2">
            {{ feature }}
          </span>
        </li>
      </ul>

      <a :href="tool.website" target="_blank" rel="noopener noreferrer">
        <p class="mt-4 text-sm text-blue-800">Visit Website</p>
      </a>
    </article>
  </main>
</template>
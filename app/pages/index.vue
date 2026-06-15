<script setup lang="ts">
import { tools } from "~/../utils/tools";

useSeoMeta({
  title: "SEO Tools Directory",
  description: "Browse the best tools for creators, marketers, and teams.",
});
</script>

<template>
  <main class="container">
    <h1 class="mb-8 font-bold text-center text-2xl">SEO Tools Directory</h1>

    <div class="grid">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.id"
        :to="`/tools/${tool.slug}`"
        class="card"
      >
        <img :src="tool.image" :alt="tool.name" />

        <h2 class="mb-4 mt-2 font-bold text-lg">{{ tool.name }}</h2>
        <p class="mb-2">{{ tool.tagline }}</p>
        <span>{{ tool.category }}</span>
      </NuxtLink>
    </div>
  </main>
</template>
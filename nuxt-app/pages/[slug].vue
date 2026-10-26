<script setup lang="ts">
import { useLivePreview } from "@payloadcms/live-preview-vue";

const route = useRoute();

const config = useRuntimeConfig();

const { data: initialData } = await useFetch(
  `${config.public.payloadUrl}/api/pages`,
  {
    query: {
      where: {
        slug: {
          equals: route.params.slug,
        },
      },
    },
  },
);

const initialPage = initialData.value?.docs?.[0];

const { data: page } = useLivePreview({
  initialData: initialPage,
  serverURL: config.public.payloadUrl,
});
</script>

<template>
  <main v-if="page">
    initialData {{ initialData }}
    <h1>{{ page.title }}</h1>

    <p>{{ page.content }}</p>
  </main>

  <div v-else>Page not found</div>
</template>

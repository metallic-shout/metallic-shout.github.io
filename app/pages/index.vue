<template>
  <section class="mx-auto max-w-3xl">
    <div class="flex-col rounded-2xl border bg-card p-6 shadow-sm min-w-96 max-h-fit">
      <label class="block text-sm font-medium" for="main-text"> Message </label>
      <textarea
        id="main-text"
        class="bg-background mt-3 min-h-[11.25rem] w-full resize-y rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2"
        :value="shout"
        readonly
      />
      <div class="mt-4 flex justify-end">
        <button
          class="bg-background inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition"
          type="button"
        >
          Send
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import elements from '#elements';
import { makeShout } from '#root/lib/make-shout';

const elementPairs = Object.entries(elements) as [string, string][];
const randomIndex = Math.floor(Math.random() * elementPairs.length);
const [name, label] = elementPairs[randomIndex]!;
const shout = ref(makeShout(label, name.length));
</script>

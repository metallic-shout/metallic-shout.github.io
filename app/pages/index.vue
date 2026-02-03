<template>
  <section class="mx-auto max-w-3xl">
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <label class="block text-sm font-medium text-slate-700" for="main-text"> Message </label>
      <textarea
        id="main-text"
        class="mt-3 min-h-[11.25rem] w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        :value="shout"
        readonly
      />
      <div class="mt-4 flex justify-end">
        <button
          class="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
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
import { makeShout } from '~~/lib/make-shout';

const elementPairs = Object.entries(elements) as [string, string][];
const randomIndex = Math.floor(Math.random() * elementPairs.length);
const [name, label] = elementPairs[randomIndex]!;
const shout = useState('shout', () => makeShout(label, name.length));
</script>

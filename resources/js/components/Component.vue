<template>
  <VContainer>
    <VCard>
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <th class="px-2 py-1 text-left">Title</th>
            <th class="px-2 py-1 text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="card in project.cards" :key="project.id + '-' + card.id">
            <td class="px-2 py-1">
              <VLink :href="route('cards.show', card)">{{ card.title }}</VLink>
            </td>
            <td class="px-2 py-1">
              <div
                class="flex items-center space-x-2 w-full"
                v-for="field in project.fields"
                :key="field.id"
              >
                <VFieldWrapper :card="card" :field="field"></VFieldWrapper>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </VCard>
  </VContainer>
</template>

<script lang="ts" setup>
import { VFieldWrapper, VCard, VButton, VContainer, VLink } from "taskday";
import { defineComponent, watch } from "vue";
import { getCurrentInstance } from "vue";

defineProps({
  project: {
    tyoe: Object,
    required: true,
  },
});
</script>

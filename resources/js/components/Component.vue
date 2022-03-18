<template>
  <VContainer>
    <VCard>
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-2 py-1 text-left">Title</th>
            <th class="px-2 py-1 text-left"></th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr>
            <td colspan="99">
              <form @submit.prevent="submit">
                <VFormInput
                  placeholder="Create a card..."
                  v-model="form.title"
                ></VFormInput>
              </form>
            </td>
          </tr>
          <tr v-for="card in project.cards" :key="project.id + '-' + card.id">
            <td class="px-2 py-2">
              <VLink :href="route('cards.show', card)">{{ card.title }}</VLink>
              <span></span>
            </td>
            <td class="px-2 py-2">
              <div
                class="flex justify-end items-center space-x-2 w-full"
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
import {
  VDrawer,
  VFormInput,
  VFieldWrapper,
  VCard,
  VContainer,
  VLink,
  useCardForm,
} from "taskday";

const props = defineProps({
  project: {
    tyoe: Object,
    required: true,
  },
});

const { form, store } = useCardForm();

function submit() {
  store(props.project);
}
</script>

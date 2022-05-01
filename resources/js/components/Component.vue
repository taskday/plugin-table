<template>
  <VContainer>
    <div class="hidden md:block w-full">
      <VCard>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-2 py-1 text-left">Title</th>
              <th class="px-2 py-1 text-left" v-for="field in project.fields">
                {{ field.title }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr>
              <td colspan="99" class="py-2">
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
                <Link
                  class="text-base hover:underline"
                  :href="route('cards.show', card)"
                >
                  {{ card.title }}
                </Link>
                <span></span>
              </td>
              <td class="px-2 py-2" v-for="field in project.fields">
                <div class="flex justify-start items-center space-x-2 w-full">
                  <VFieldWrapper
                    :key="field.id"
                    :card="card"
                    :field="field"
                  ></VFieldWrapper>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </VCard>
    </div>
    <div class="flex flex-col gap-2 md:hidden">
      <VCard v-for="card in project.cards">
        <Link
          class="text-base hover:underline"
          :href="route('cards.show', card)"
          >{{ card.title }}</Link
        >
        <div class="flex items-center gap-3 mt-2">
          <div
            v-for="field in card.project.fields"
            :key="card.id + '' + field.handle"
          >
            <VFieldWrapper
              :field="{ ...field, ...card.customFields[field.handle] }"
              :card="card"
            />
          </div>
        </div>
      </VCard>
    </div>
  </VContainer>
</template>

<script lang="ts" setup>
import {
  VFormInput,
  VFieldWrapper,
  VCard,
  VContainer,
  useCardForm,
} from "taskday";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const { form, store } = useCardForm();

function submit() {
  store(props.project);
}
</script>

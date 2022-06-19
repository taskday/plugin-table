<template>
  <div class="hidden md:block w-full px-6">
    <VCard style="padding: 0">
      <table class="w-full">
        <thead>
          <tr class="">
            <th class="px-4 py-2 text-left">Title</th>
            <th class="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 border-l" v-for="field in project.fields" @click="sortBy(field)">
              <div class="flex items-center justify-between cursor-pointer">
                <span>{{ field.title }}</span>
                <svg v-if="isCurrent(field) && !isDesc(field)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <svg v-else-if="isCurrent(field) && isDesc(field)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="card in project.cards" :key="project.id + '-' + card.id"  class="border-t last:border-b">
            <td class="px-4 py-2">
              <Link
                class="text-base hover:underline"
                :href="route('cards.show', card)"
              >
                {{ card.title }}
              </Link>
              <span></span>
            </td>
            <td class="px-4 py-2" v-for="field in project.fields">
              <div class="flex justify-start items-center space-x-2 w-full">
                <VFieldWrapper
                  :key="field.id"
                  :card="card"
                  :field="field"
                ></VFieldWrapper>
              </div>
            </td>
            <td>
              <div class="flex justify-end items-center space-x-2">
                <VDropdown>
                  <VDropdownButton>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </VDropdownButton>
                  <VDropdownItems>
                    <VDropdownItem @click="remove(card)" class="hover:text-red-600">
                      <p>Delete</p>
                    </VDropdownItem>
                  </VDropdownItems>
                </VDropdown>
              </div>
            </td>
          </tr>
          <tr class="border-t border-b">
            <td class="" colspan="99">
              <form @submit.prevent="submit">
                <VFormInput
                  placeholder="Create a card..."
                  v-model="form.title"
                  class="w-full border-none focus:ring-0 shadow-none" 
                ></VFormInput>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </VCard>
  </div>
  <div class="flex flex-col gap-4 md:hidden px-6">
    <form @submit.prevent="submit">
      <VFormInput
        placeholder="Create a card..."
        v-model="form.title"
      ></VFormInput>
    </form>
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
</template>

<script lang="ts" setup>
import {
  VFormInput,
  VFieldWrapper,
  VCard,
  useCardForm,
  useSorter,
  VDropdown,
  VDropdownButton,
  VDropdownItems,
  VDropdownItem,
  VButton,
} from "taskday";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const { form, store, destroy } = useCardForm();
const { sortBy, isDesc, isCurrent } = useSorter();

function submit() {
  if (!form.processing) {
    store(props.project);
  }
}

function remove(card: Card) {
  confirm(`Are you sure to delete "${card.title}"?`) && destroy(card);
}
</script>

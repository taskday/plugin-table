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

import {
  flexRender,
  getCoreRowModel,
  useVueTable,
  ColumnDef,
  ColumnOrderState,
  VisibilityState,
  Column,
} from "@tanstack/vue-table";

import columns from './columns';

import { ref, h } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const columnsDefs = columns(props);
const columnVisibility = ref<VisibilityState>({});
const columnOrder = ref<ColumnOrderState>([]);

function toggleColumnVisibility(column: Column<any, any>) {
  columnVisibility.value = {
    ...columnVisibility.value,
    [column.id]: !column.getIsVisible(),
  };
}

function toggleAllColumnsVisibility() {
  table.getAllLeafColumns().forEach((column) => {
    toggleColumnVisibility(column);
  });
}

const table = useVueTable({
  get data() {
    return props.project.cards;
  },
  columns: columnsDefs,
  state: {
    get columnVisibility() {
      return columnVisibility.value;
    },
    get columnOrder() {
      return columnOrder.value;
    },
  },
  onColumnOrderChange: (order) => {
    columnOrder.value = order;
  },
  onColumnVisibilityChange: (vis) => {
    columnVisibility.value = vis;
  },
  getCoreRowModel: getCoreRowModel(),
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

<template>
  <div class="hidden md:block w-full px-6">
    <VCard class="[&>div]:p-[0!important]">
      <table class="w-full">
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            class="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <component
              v-if="!header.isPlaceholder"
              :is="
                flexRender(header.column.columnDef.header, header.getContext())
              "
            />
          </th>
        </tr>
      </thead>
        <tbody class="">
          <tr class="border-t last:border-b" v-for="row in table.getRowModel().rows" :key="row.id">
            <td class="px-4 py-2" v-for="cell in row.getVisibleCells()" :key="cell.id">
              <component :is="cell.renderValue" />
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
<script lang="ts" setup>
import { BookCategory } from '@/constants/data'
import { ref, watch } from 'vue'
import type { FilterOptions } from '@/constants/types'

const props = defineProps<{
  filterOptions: FilterOptions
}>()

const filterOptions = ref(props.filterOptions)

const emit = defineEmits(['onFilterBook', 'onResetFilterBook'])
const handleFilterSubmmit = () => {
  emit('onFilterBook', filterOptions)
}
const handleResetFilter = () => {
  emit('onResetFilterBook')
}

</script>

<template>
  <h2>Filters</h2>
  <v-sheet width="70%">
    <v-form @submit.prevent>
      <div class="text-subtitle-2 font-weight-bold">Search Book by Title</div>
      <v-text-field
        variant="outlined"
        v-model="filterOptions.searchString"
        class="mt-2"
        placeholder="Enter search string"
        density="compact"
        clearable
      ></v-text-field>
      <div class="text-subtitle-2">Categories</div>
      <template v-for="category in Object.values(BookCategory)" :key="category">
        <v-checkbox
          v-model="filterOptions.categoryCheckedList"
          :label="category"
          :value="category"
          color="primary"
          density="compact"
          hide-details
        />
      </template>
      <v-btn
        type="submit"
        variant="flat"
        class="text-none my-4 mr-3"
        color="primary"
        @click.stop="handleFilterSubmmit"
        ><v-icon icon="mdi-filter" class="mr-1"></v-icon> Filter</v-btn
      >
      <v-btn
        type="submit"
        variant="flat"
        class="text-none my-4"
        color="primary"
        @click.stop="handleResetFilter"
        ><v-icon icon="mdi-arrow-u-left-top" class="mr-1"></v-icon> Reset</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<template>
  <div class="flex flex-wrap justify-start items-end w-full pt-8">
    <component
      v-for="field in fields"
      :key="field.name"
      :name="field.name"
      :is="renderComponentsArray[field.component]"
      :landingPositionX="field.landingPositionX"
      :landingPositionY="field.landingPositionY"
      :landingPositionN="field.landingPositionN"
      :instructionsPosition="field.instructionsPosition"
      :placeholder="field.placeholder"
    />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';

defineProps({
  fields: {
    type: Array,
    required: true,
  },
});

const renderComponentsArray = {
  roverPanel: defineAsyncComponent(
    () => import('@/components/RoversPanelComponent.vue'),
  ),
};
</script>
<style scoped>
.linhaHorizontal {
  height: 1px;
  background-color: #ccc;
}

.textoBase {
  line-height: 0.5;
}
</style>

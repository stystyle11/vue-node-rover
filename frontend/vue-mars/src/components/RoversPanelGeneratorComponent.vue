<template>
  <div class="flex flex-wrap justify-start items-end w-full pt-8">
    <component
      v-for="field in fields"
      :key="field.name"
      :name="field.name"
      :is="renderComponentsArray[field.component]"
      :landingPosition="field.landingPosition"
      :instructionsPosition="field.instructionsPosition"
      :placeholder="field.placeholder"
      :labelRoverInstructions="field.labelRoverInstructions"
      :labelLandingPosition="field.labelLandingPosition"
    />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';
//:variant="field.variant ? field.variant : 'filled'"
//:onDataUpdated="field.handleDataUpdate"
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

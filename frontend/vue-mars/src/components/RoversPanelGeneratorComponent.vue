<template>
  <div class="block md:flex md:space-x-4 p-2 mt-2 mb-2 h-fit w-full justify-start items-end pt-8">
    <component
      v-for="field in fields"
      :key="field.name"
      :name="field.name"
      :class="field.class"
      :landingPositionX="field.landingPositionX"
      :landingPositionY="field.landingPositionY"
      :landingPositionN="field.landingPositionN"
      :instructionsPosition="field.instructionsPosition"
      :placeholderX="field.placeholderX"
      :placeholderY="field.placeholderY"
      :placeholderN="field.placeholderN"
      :placeholderInstructions="field.placeholderInstructions"
      :typeX="field.typeX"
      :typeY="field.typeY"
      :typeN="field.typeN"
      :typeInstructions="field.typeInstructions"
      :maxlengthN="field.maxlengthN"
      :maxlengthInstructions="field.maxlengthInstructions"
      :spanClass="field.spanClass"
      :is="renderComponentsArray[field.component]"
    />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';

defineProps({
  fields: {
    type: Array,
    required: true
  }
});

const renderComponentsArray = {
  roverPanel: defineAsyncComponent(() => import('@/components/RoversPanelComponent.vue'))
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

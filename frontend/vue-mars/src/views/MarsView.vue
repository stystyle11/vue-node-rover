<template>
  <div class="flex space-x-4">
    <RoversPanelGenerator :fields="roverGeneratorFields"> </RoversPanelGenerator>
  </div>
</template>

<script setup>
import RoversPanelGenerator from '@/components/RoversPanelGeneratorComponent.vue';

const roverGeneratorFields = [
  {
    name: 'Rover1',
    class: 'w-1/2 p-4 bg-white-900',
    landingPositionX: 0,
    landingPositionY: 0,
    landingPositionN: 'N',
    instructionsPosition: '',
    placeholderX: 'ex:1 ,11, 111',
    placeholderY: 'ex:1 ,11, 111',
    placeholderN: 'ex:E',
    placeholderInstructions: 'ex:LMLRRM',
    typeX: 'number',
    typeY: 'number',
    typeN: 'text',
    typeInstructions: 'text',
    maxlengthN: 1,
    maxlengthInstructions: 15,
    labelRoverInstructions: 'Rover Instructions',
    labelLandingPosition: 'Landing Position',
    inputClass: 'w-full p-2 border border-gray-300 mt-2',
    component: 'roverPanel'
  },
  {
    name: 'Rover2',
    class: 'w-1/2 p-4 bg-white-900',
    landingPositionX: 0,
    landingPositionY: 0,
    landingPositionN: 'N',
    instructionsPosition: '',
    placeholderX: 'ex:1 ,11, 111',
    placeholderY: 'ex:1 ,11, 111',
    placeholderN: 'ex:E',
    placeholderInstructions: 'ex:LMLRRM',
    typeX: 'number',
    typeY: 'number',
    typeN: 'text',
    typeInstructions: 'text',
    maxlengthN: 1,
    maxlengthInstructions: 15,
    labelRoverInstructions: 'Rover Instructions',
    labelLandingPosition: 'Landing Position',
    inputClass: 'w-full p-2 border border-gray-300 mt-2',
    component: 'roverPanel'
  }
];
</script>

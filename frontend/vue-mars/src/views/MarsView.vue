<template>
  <div class="flex space-x-4">
    <RoversPanelGenerator :fields="roverGeneratorFields">
    </RoversPanelGenerator>
  </div>
</template>

<script setup>
import RoversPanelGenerator from '@/components/RoversPanelGeneratorComponent.vue';

const roverGeneratorFields = [
  {
    name: 'Rover1',
    class: 'w-1/2 p-4 bg-gray-100',

    landingPositionX: 0,
    landingPositionY: 0,
    landingPositionN: 'N',
    instructionsPosition: '',
    placeholder: 'ex: LMLRRM',
    labelRoverInstructions: 'Rover Instructions',
    labelLandingPosition: 'Landing Position',
    component: 'roverPanel',
  },
  {
    name: 'Rover2',
    class: 'w-1/2 p-4 bg-white-900',
    landingPositionX: 0,
    landingPositionY: 0,
    landingPositionN: 'N',
    instructionsPosition: 'LM',
    placeholder: 'ex:LMLRRM',
    labelRoverInstructions: 'Rover Instructions',
    labelLandingPosition: 'Landing Position',
    component: 'roverPanel',
  },
];
</script>

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
    class: 'w-full md:w-1/2 p-4 bg-yellow-100 border-2 border-red-300',
    landingPositionX: 0,
    landingPositionY: 0,
    landingPositionN: '',
    instructionsPosition: '',
    placeholderX: 'ex: 5, 10, 15',
    placeholderY: 'ex: 5, 10, 15',
    placeholderN: 'ex: N, E, S, W',
    placeholderInstructions: 'ex: LMLRRM',
    typeX: 'number',
    typeY: 'number',
    typeN: 'text',
    typeInstructions: 'text',
    maxlengthN: 1,
    maxlengthInstructions: 15,
    inputClass: 'w-full p-2 border border-gray-300',
    spanClass: 'p-2 m-1 text-xs font-bold text-red-800 whitespace-normal',
    component: 'roverPanel'
  },
  {
    name: 'Rover2',
    class: 'w-full md:w-1/2 p-4 bg-yellow-100',
    landingPositionX: 0,
    landingPositionY: 0,
    landingPositionN: '',
    instructionsPosition: '',
    placeholderX: 'ex: 5, 10, 15',
    placeholderY: 'ex: 5, 10, 15',
    placeholderN: 'ex: N, E, S, W',
    placeholderInstructions: 'ex: LMLRRM',
    typeX: 'number',
    typeY: 'number',
    typeN: 'text',
    typeInstructions: 'text',
    maxlengthN: 1,
    maxlengthInstructions: 15,
    inputClass: 'w-full p-2 border border-gray-300',
    spanClass: 'p-2 m-1 text-xs font-bold text-red-800 whitespace-normal',
    component: 'roverPanel'
  }
];
</script>

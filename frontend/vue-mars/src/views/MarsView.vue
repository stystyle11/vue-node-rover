<template>
  <div
    class="grid grid-rows-[10%_90%] grid-cols-[20%_80%] h-screen bg-slate-600"
  >
    <div class="row-start-1 col-start-1 h-90 bg-slate-600">
      <RoversPanelGenerator :fields="roverGeneratorFields">
      </RoversPanelGenerator>
    </div>
  </div>
</template>

<script setup>
import RoversPanelGenerator from '@/components/RoversPanelGeneratorComponent.vue';

const roverGeneratorFields = [
  {
    name: 'Rover1',
    landingPosition: ['x', 'y', 'N'],
    instructionsPosition: 'LMRRMMRMMML',
    placeholder: 'Rover1',
    labelRoverInstructions: 'Rover Instructions',
    labelLandingPosition: 'Landing Position',
    component: 'roverPanel',
  },
  {
    name: 'Rover1',
    landingPosition: ['x', 'y', 'S'],
    instructionsPosition: 'LM',
    placeholder: 'Rover1',
    labelRoverInstructions: 'Rover Instructions',
    labelLandingPosition: 'Landing Position',
    component: 'roverPanel',
  },
];
</script>

<style scoped>
.grid-container {
  display: grid;

  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  height: 100%;
  width: 100%;

  margin: 0;
  padding: 0;
  background-image: url('@/assets/marssurface.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgb(255, 255, 255);
  box-sizing: border-box;
  font-size: 10px;
  color: white;
}
</style>

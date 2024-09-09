<template>
  <div
    class="grid grid-rows-[10%_90%] grid-cols-[20%_80%] h-screen bg-slate-600"
  >
    <div class="row-start-1 col-start-1 h-90 bg-slate-600">
      <RoversPanelGenerator :fields="roverGeneratorFields">
      </RoversPanelGenerator>
    </div>

    <div class="row-start-2 col-start-2 grid-container">
      <div
        :style="{ bottom: computedHeight, left: computedWidth, rotate: model }"
        class="absolute bg-slate-500"
      >
        <SvgRover
          :fill="rectColor"
          :heightPx="height"
          :widthPx="width"
        ></SvgRover>
      </div>

      <div
        v-for="n in 100"
        :key="n"
        class="grid-item"
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SvgRover from '@/components/RoverSvgComponent.vue';
import RoversPanelGenerator from '@/components/RoversPanelGeneratorComponent.vue';

const roverGeneratorFields = [
  {
    name: 'Rover1',
    landingPosition: ['x10', 'y2', 'N'],
    instructionsPosition: ['LRLRLRLML11'],
    placeholder: 'Rover1',
    labelRoverInstructions: 'Rover Instructions',
    labelLandingPosition: 'Landing Position',
    component: 'roverPanel',
  },
];

const calculateBorderSides = () => {};

const calculateBorderTopBottom = () => {};

const moveRover = () => {};

const height = ref('45px');
const width = ref('45px');
const rectColor = ref('#222');

// Refs to store width and height
const columnHeight = ref('');
const columnWidth = ref('');

const numberColumns = ref('');
const numberRows = ref('');

const getQuerySelector = (selectedElement) => {
  const grid = document.querySelector(selectedElement);
  if (grid) {
    return window.getComputedStyle(grid);
  }
};
const getGridItem = (elementItem) => {
  columnWidth.value = elementItem.getPropertyValue('width');
  columnHeight.value = elementItem.getPropertyValue('height');
};

const getGridContainer = (elementItem) => {
  numberColumns.value = elementItem.getPropertyValue('grid-template-columns');
  numberRows.value = elementItem.getPropertyValue('grid-template-rows');
};

const model = defineModel();

onMounted(() => {
  const getGridItemValue = getQuerySelector('.grid-item');
  const getGridContainerColumnsRows = getQuerySelector('.grid-container');
  getGridContainer(getGridContainerColumnsRows);
  getGridItem(getGridItemValue);

  console.log('width:', columnWidth.value, 'height:', columnHeight.value);

  console.log(
    'numero colunas:',
    typeof numberColumns.value,
    'numero rows:',
    numberRows.value.length,
  );
});

// Computed properties
const computedWidth = computed(() => columnWidth.value);
const computedHeight = computed(() => columnHeight.value);
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

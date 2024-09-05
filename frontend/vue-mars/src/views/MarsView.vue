<template>
    <div class="grid grid-rows-[10%_90%] grid-cols-[20%_80%] h-screen bg-slate-600">
        <div class ="row-start-1 col-start-2">EEQEWQW</div>
    <div class="row-start-2 col-start-2 grid-container ">
       
       <div class="absolute bottom-0 left-[20%] ml-[2%]">
      <SvgRover :fill="rectColor" :heightPx="height" :widthPx="width"></SvgRover>
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
import { ref } from 'vue';
import SvgRover from '@/components/RoverSvgComponent.vue';  
const height = ref('45px');
const width = ref('45px')
const isStarred = ref(true);
const rectColor = ref('#222')
const circleStrokeColor = ref('#2ecc71')
</script>

<style scoped>
.rover-position{

    position: absolute;
    bottom:0;
    left:0;
}

.grid-container {
  display: grid;
  
  grid-template-columns: repeat(10, 1fr); /* 100 equal columns */
  grid-template-rows: repeat(10, 1fr);    /* 100 equal rows */
  height: 100%; width: 100%;

  margin: 0;
  padding: 0;
  background-image: url("@/assets/marssurface.png"); /* Image from assets folder */
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
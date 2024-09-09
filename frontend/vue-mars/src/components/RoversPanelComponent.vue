<template>
  <div>
    <h1>Rover Panel:{{ name }}</h1>
    <h5>Landing Position:{{ roverInstructionsModel }}</h5>

    <input
      v-model="landingPositionModel"
      @input="handleInput"
      type="text"
      :maxlength="maxlength"
      :disabled="false"
      :autofocus="true"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <input
      v-model="roverInstructionsModel"
      @input="handleInput"
      type="text"
      :maxlength="maxlength"
      :disabled="false"
      :autofocus="true"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <!-- 
    <InputBaseComponent
      :modelValueFromParent="roverInstructionsModel"
      type="text"
      :maxlength="maxlength"
      :label="labelRoverInstructions"
      :disabled="false"
      :autofocus="true"
      @blur="onBlur"
      @focus="onFocus"
    />
    -->
    <ButtonBaseComponent @click="handleClick">Submit</ButtonBaseComponent>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
//import InputBaseComponent from '@/components/InputBaseComponent.vue';
import ButtonBaseComponent from '@/components/ButtonBaseComponent.vue';
//provide('landingPosition');
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  landingPosition: {
    type: Object,

    default: () => ({ x: 0, y: 0, heading: 'N' }),
  },
  instructionsPosition: {
    type: Array,
  },
});

const maxlength = 15;
const landingPositionModel = ref(props.landingPosition);
const roverInstructionsModel = ref(props.instructionsPosition);

const headingToNumber = () => {};
const calculateHeading = () => {};
const calculatePositonForward = () => {};
const moveRovers = (instructionsArray) => {};

const onBlur = () => {
  console.log('Input blurred');
};

const onFocus = () => {
  console.log('Input focused');
};

const handleClick = () => {
  console.log(`Button clicked, input value: ${inputValue.value}`);
};
</script>

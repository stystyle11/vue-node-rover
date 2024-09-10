<template>
  <div>
    <h1>Rover Panel:{{ name }}</h1>

    <h5>Rover instructionModel:{{ roverInstructionsModel }}</h5>
    <h5>Landing Position:{{ landingPositionModel }}</h5>
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
    Direction:{{ heading }}
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
import { ref, computed } from 'vue';
//import InputBaseComponent from '@/components/InputBaseComponent.vue';
import ButtonBaseComponent from '@/components/ButtonBaseComponent.vue';

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
const finalPosition = ref('');
const movingPosition = ref('');

// Computed HEading
const computedHeading = computed(() => {
  if (finalPosition.value.length > 0) {
    return finalPosition.value[2];
  } else {
    return landingPositionModel.value[2];
  }
});
// Get the Heading of the Rover
const heading = computedHeading.value;

const headingToNumber = (headingString) => {
  switch (headingString) {
    case 'N':
      return 0;
    case 'E':
      return 90;
    case 'S':
      return 180;
    case 'W':
      return 270;
    default:
      return 0;
  }
};
const headingNumber = headingToNumber(heading);

const calculateHeading = (inputString) => {
  if (inputString === 'L') {
    headingNumber.value = headingNumber - 90;
  } else {
    headingNumber.value = headingNumber + 90;
  }
  headingNumber.value > 270
    ? 0
    : headingNumber.value < 0
      ? 270
      : headingNumber.value;

  switch (headingNumber.value) {
    case 0:
      return 'N';
    case 90:
      return 'E';
    case 180:
      return 'S';
    case 270:
      return 'W';
    default:
      return 'N';
  }
};
const calculateMovingForward = (headingString) => {
  switch (headingString.value) {
    case 'N':
      return ['x', 'y1', 'N'];
    case 'E':
      return ['x1', 'y', 'E'];
    case 'S':
      return ['x', 'y-1', 'S'];
    case 'W':
      return ['x-1', 'y', 'W'];
    default:
      return ['x', 'y', 'N'];
  }
};
const updatePositions = (oldPosition, newPosition) => {
  let xSum =
    parseInt(oldPosition[0].replace('x', '')) +
    parseInt(newPosition[0].replace('x', ''));
  let ySum =
    parseInt(oldPosition[1].replace('y', '')) +
    parseInt(newPosition[1].replace('y', ''));

  return [`x${xSum}`, `y${ySum}`, newPosition[2]];
};
const createArrayFromInstructionString = (instructionsString, stringSize) => {
  const instructionsArray = [];

  for (let i = 0; i < instructionsString.length; i += stringSize) {
    instructionsArray.push(instructionsString.substring(i, i + stringSize));
  }

  return instructionsArray;
};
const finalArrayInstructions = createArrayFromInstructionString(
  roverInstructionsModel,
);
const getFinalPosition = (instructionsStringArray) => {
  instructionsStringArray.forEach((string) => {
    let currentHeading;
    let currentPosition;

    if (string === 'L' || string === 'M') {
      currentHeading = calculateHeading(string);
    } else {
      currentPosition = calculateMovingForward(currentHeading);
    }
    movingPosition.value = updatePositions(
      movingPosition.value,
      currentPosition,
    );
  });
  finalPosition.value = updatePositions(
    landingPositionModel.value,
    movingPosition.value,
  );
};

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

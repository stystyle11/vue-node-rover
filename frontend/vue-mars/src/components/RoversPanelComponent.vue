<template>
  <button
    class="w-fit h-fit border-2 border-white-600 rounded-md p-1 m-1 bg-blue-900"
    @click="getFinalPosition(roverInstructionsModel)"
    >mama</button
  >

  <form
    class="w-fit h-fit border-2 border-white-600 rounded-md p-12 m-12 bg-blue-900"
  >
    <h1 class="p-4 m-4 h-16 w-80">Rover Panel:{{ nameModel }}</h1>
    <div>
      <span class="p-2 m-0 h-fit w-80">Landing Position:</span>
      <input
        class="border border-gray-300 p-2 m-2 h-fit w-80"
        v-model="landingPositionModel"
        type="text"
        :maxlength="maxlength"
        :disabled="false"
        :autofocus="true"
        @focus="handleFocus"
      />
    </div>
    <div>
      <span class="p-2 m-0 h-16 w-80">Instructions:</span>
      <input
        class="border border-gray-300 p-2 m-2 h-fit w-80"
        v-model="roverInstructionsModel"
        type="text"
        :maxlength="maxlength"
        :disabled="false"
        :autofocus="true"
        @focus="handleFocus"
      />
    </div>
    <div class="p-2 m-0 h-16 w-80"> Direction:{{ finalPosition }}</div>

    <ButtonBaseComponent class="border border-gray-300 p-2 m-2 h-fit w-80"
      >Submit</ButtonBaseComponent
    >
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';

import ButtonBaseComponent from '@/components/ButtonBaseComponent.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  landingPosition: {
    type: Array,
  },
  instructionsPosition: {
    type: String,
  },
});

const maxlength = 15;
const nameModel = ref(props.name);
const landingPositionModel = ref(props.landingPosition);
const roverInstructionsModel = ref(props.instructionsPosition);

const finalPosition = ref(null);
const movingPosition = ref(null);

// Computed HEading
const computedHeading = computed(() => {
  if (finalPosition.value !== null) {
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
let headingNumber = headingToNumber(heading);

const calculateHeading = (inputString) => {
  let tempNumber;
  if (inputString === 'L') {
    //console.log('heading BEFORE number', headingNumber);
    tempNumber = headingNumber - 90;
    tempNumber > 270
      ? (headingNumber = 0)
      : tempNumber < 0
        ? (headingNumber = 270)
        : (headingNumber = tempNumber);
    //console.log('heading AFTER L', headingNumber);
  } else {
    tempNumber = headingNumber + 90;
    tempNumber > 270
      ? (headingNumber = 0)
      : tempNumber < 0
        ? (headingNumber = 270)
        : (headingNumber = tempNumber);
    // console.log('heading AFTER R', headingNumber);
  }

  // console.log('heading final number', headingNumber);
  switch (headingNumber) {
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
  //console.log('heading strig for calculate moving Foward', headingString);
  switch (headingString) {
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
const extractNumber = (str, prefix) => {
  if (str.startsWith(prefix)) {
    let num = str.replace(prefix, '');

    return num === '' ? '' : parseInt(num);
  }
};
const updatePositions = (oldPosition, newPosition) => {
  if (oldPosition === null) {
    oldPosition = ['x', 'y', 'N'];
  }

  let result = [];

  let xSum =
    extractNumber(oldPosition[0], 'x') + extractNumber(newPosition[0], 'x');

  if (xSum === 0) {
    xSum = '';
  }
  result.push(`x${xSum}`);

  let ySum =
    extractNumber(oldPosition[1], 'y') + extractNumber(newPosition[1], 'y');

  if (ySum === 0) {
    ySum = '';
  }
  result.push(`y${ySum}`);

  result.push(newPosition[2]);

  return result;
};
const createArrayFromInstructionString = (instructionsString) => {
  let foTransudo = instructionsString;
  console.log(typeof foTransudo);
  return foTransudo.split('');
};

const getFinalPosition = (instructionsStringArray) => {
  console.log('instruction', instructionsStringArray);
  //let mama = createArrayFromInstructionString(instructionsStringArray);
  let currentHeading;
  let currentPosition;
  let curatedString;
  curatedString = createArrayFromInstructionString(instructionsStringArray);

  console.log('curated', curatedString);
  curatedString.forEach((item) => {
    console.log(item[0]);
    if (item === 'L' || item === 'R') {
      currentHeading = calculateHeading(item);
    } else {
      currentPosition = calculateMovingForward(currentHeading);
      movingPosition.value = updatePositions(
        movingPosition.value,
        currentPosition,
      );
      console.log('moving position AFTER update', movingPosition.value);
    }
  });
  //Needs an If for current Position
  //movingPosition.value = updatePositions(movingPosition.value, currentPosition);
  console.log('moving position AFTERREEEEEEEEEACH', movingPosition.value);

  if (finalPosition.value === null) {
    finalPosition.value = updatePositions(
      landingPositionModel.value,
      movingPosition.value,
    );
    movingPosition.value = null;
  } else {
    finalPosition.value = updatePositions(
      finalPosition.value,
      movingPosition.value,
    );
    movingPosition.value = null;
  }

  console.log('Final Position', finalPosition.value);
};
//getFinalPosition(finalArrayInstructions);
const handleInput = (model) => {
  const validInputs = ['L', 'M', 'R'];
  let inputValue;
  if (model.value) {
    inputValue = model.value.toUpperCase();
  }

  if (!validInputs.includes(inputValue)) {
    model.value = '';
  } else {
    model.value = inputValue;
    console.log('Valid input:', model.value);
  }
};

const onBlur = () => {
  console.log('Input blurred');
};

const onFocus = () => {
  console.log('Input focused');
};

const handleClick = () => {};
</script>

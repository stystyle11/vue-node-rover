<template>
  <!--
  <button
    class="w-fit h-fit border-2 border-white-600 rounded-md p-1 m-1 bg-blue-900"
    @click="getFinalPosition(roverInstructionsModel)"
    >mama</button
  >
-->
  <form
    class="w-fit h-fit border-2 border-white-600 rounded-md p-12 m-12 bg-blue-900"
  >
    <h1 class="p-4 m-4 h-16 w-80">Rover Panel:{{ nameModel }}</h1>
    <div>
      <label for="inputX">Input X:</label>
      <input
        id="inputX"
        v-model.number="inputX"
        type="number"
      />

      <label for="inputY">Input Y:</label>
      <input
        id="inputY"
        v-model.number="inputY"
        type="number"
      />

      <label for="inputN">Input N:</label>
      <input
        id="inputN"
        v-model="inputN"
        type="text"
      />

      <div>
        <p>Computed Array: {{ computedArrayHeading }}</p>
      </div>
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
    <div class="p-2 m-0 h-16 w-80"> Final Position:{{ finalPosition }}</div>

    <ButtonBaseComponent class="border border-gray-300 p-2 m-2 h-fit w-80"
      >Submit</ButtonBaseComponent
    >
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';

import ButtonBaseComponent from '@/components/ButtonBaseComponent.vue';

// PROPS
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  landingPositionX: {
    type: Number,
  },
  landingPositionY: {
    type: Number,
  },
  landingPositionN: {
    type: String,
  },
  instructionsPosition: {
    type: String,
  },
});

const inputX = ref(props.landingPositionX);
const inputY = ref(props.landingPositionY);
const inputN = ref(props.landingPositionN);

const maxlength = 15;
const nameModel = ref(props.name);
//const landingPositionModel = ref(props.landingPosition);
const roverInstructionsModel = ref(props.instructionsPosition);

const finalPosition = ref(null);
const movingPosition = ref(null);

// Get the Heading of the Rover

const createArrayFromInstructionString = (instructionsString) => {
  console.log('instructionString', instructionsString);
  let stringToArray = instructionsString.toUpperCase();

  return stringToArray.split('');
};

// Computed HEading
const computedHeading = computed(() => {
  if (finalPosition.value !== null) {
    return finalPosition.value[2];
  } else {
    return computedArrayHeading.value[2];
  }
});
const computedArrayHeading = computed(() => {
  return [inputX.value, inputY.value, inputN.value];
});
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
      return [0, 1, 'N'];
    case 'E':
      return [1, 0, 'E'];
    case 'S':
      return [0, -1, 'S'];
    case 'W':
      return [-1, 0, 'W'];
    default:
      return [0, 0, 'N'];
  }
};

const updatePositions = (oldPosition, newPosition) => {
  console.log('old position:', oldPosition);
  if (oldPosition === null) {
    oldPosition = [0, 0, 'N'];
  }

  let result = [];

  let xSum = oldPosition[0] + newPosition[0];
  console.log('posicoes da soma:', oldPosition, newPosition);
  console.log('resultado some xx', xSum);
  result.push(xSum);

  let ySum = oldPosition[1] + newPosition[1];
  console.log('resultado some y', ySum);
  result.push(ySum);

  result.push(newPosition[2]);
  console.log('resultado  update positiuon function', result);
  return result;
};

const getFinalPosition = (instructionsStringArray) => {
  let currentHeading;
  let currentPosition;

  let instructionStringToArray;

  instructionStringToArray = createArrayFromInstructionString(
    instructionsStringArray,
  );

  instructionStringToArray.forEach((item) => {
    // console.log(item[0]);
    if (item === 'L' || item === 'R') {
      currentHeading = calculateHeading(item);
    } else {
      // returns lik [1,0,S]
      currentPosition = calculateMovingForward(
        currentHeading ?? computedArrayHeading.value[2],
      );
      // console.log('BWEFORE CURRENT', currentPosition);
      movingPosition.value = updatePositions(
        movingPosition.value ?? [0, 0, 'N'],
        currentPosition,
      );
      // console.log('AFTERcurent', currentPosition);
    }
  });

  //console.log('moving position AFTERREEEEEEEEEACH', movingPosition.value);

  if (finalPosition.value === null) {
    // console.log('FinalPositionBefore', finalPosition.value);
    // console.log('CompuitedArrayLandingBefore', computedArrayHeading.value);
    // finalPosition.value = movingPosition.value;

    finalPosition.value = updatePositions(
      computedArrayHeading.value,
      movingPosition.value,
    );

    //console.log('CompuitedArrayLandingafter', computedArrayHeading.value);
    // console.log('FinalPositionAfter', finalPosition.value);
    movingPosition.value = null;
  } else {
    // console.log('FinalPositionBeforeNotNull', finalPosition.value);
    finalPosition.value = updatePositions(
      finalPosition.value,
      movingPosition.value,
    );
    // console.log('FinalPositionAfterNotNull', finalPosition.value);
    movingPosition.value = null;
  }

  //console.log('Final Position', finalPosition.value);
};

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

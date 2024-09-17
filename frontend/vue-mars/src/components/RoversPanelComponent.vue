<template>
  <div :class="classFromParent">
    <h1 class="p-4 m-4 h-16 w-80">Rover Panel:{{ nameModel }}</h1>

    <form class="w-fit h-fit border-2 border-white-600 rounded-md p-12 m-12 bg-blue-900">
      <div class="flex space-x-4 p-2 mt-2 w-full mb-2 h-28">
        <!-- inputX-->
        <div class="w-[30%] h-fit">
          <label for="inputX">Input X:</label>
          <input
            id="inputX"
            v-model="inputX"
            placeholder="ex:1 ,11 ,112"
            type="number"
            class="w-full p-2 border border-gray-300"
            @blur="
              resetFinalPosition(direction);
              validateField('inputX', inputX);
            "
          />
          <span class="p-2 m-1 text-red-800">{{ errors.inputX }}</span>
        </div>
        <!-- Input Y-->
        <div class="w-[30%] h-fit">
          <label for="inputY">Input Y:</label>
          <input
            id="inputY"
            v-model="inputY"
            placeholder="ex:1 ,11 ,112"
            type="number"
            class="w-full p-2 border border-gray-300"
            @blur="
              resetFinalPosition(direction);
              validateField('inputY', inputY);
            "
          />
          <span class="p-2 m-1 text-red-800">{{ errors.inputY }}</span>
        </div>
        <!-- Input N Direction-->
        <div class="w-[30%] h-fit">
          <div class="w-full">
            <label for="inputN">Navigation Direction</label>
            <input
              id="inputN"
              v-model="inputN"
              maxlength="1"
              placeholder="ex: N or S"
              type="text"
              class="w-full p-2 border border-gray-300"
              @blur="
                resetFinalPosition(direction);
                validateField('inputN', inputN);
              "
            />
          </div>
          <span class="p-2 m-1 text-red-800">{{ errors.inputN }}</span>
        </div>
      </div>
      <!-- Input input Instructions-->
      <div class="p-2 mt-2 w-full">
        <span class="p-2 mt-4 h-16 w-80">Instructions:</span>
        <input
          id="roverInstructionsModel"
          class="w-full p-2 border border-gray-300 mt-2"
          v-model="roverInstructionsModel"
          type="text"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :disabled="false"
          :autofocus="true"
          @blur="
            resetFinalPosition(direction);
            validateField('roverInstructionsModel', roverInstructionsModel);
          "
        />
      </div>
      <span class="p-2 m-1 text-red-800">{{ errors.roverInstructionsModel }}</span>
      <div class="p-2 m-0 h-16 w-80">Final Position:{{ finalPosition }}</div>
      <!-- Submit button-->
      <button
        :disabled="isDisabled"
        @click.prevent="validateForm"
        class="border border-gray-300 p-2 m-2 h-fit w-80"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue';

//import ButtonBaseComponent from '@/components/ButtonBaseComponent.vue';
//import InputBaseComponent from './InputBaseComponent.vue';

// PROPS
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  },

  landingPositionX: {
    type: Number,
    default: 0
  },
  landingPositionY: {
    type: Number,
    default: 0
  },
  landingPositionN: {
    type: String
  },
  class: {
    type: String
  },
  instructionsPosition: {
    type: String
  }
});
const finalPosition = ref(null);
const movingPosition = ref(null);

const inputX = ref(props.landingPositionX);

const inputY = ref(props.landingPositionY);
const inputN = ref(props.landingPositionN);
const classFromParent = ref(props.class);
const maxlength = 15;
const nameModel = ref(props.name);

//const landingPositionModel = ref(props.landingPosition);
const roverInstructionsModel = ref(props.instructionsPosition);
const msg = ref({
  instructions: '',
  direction: '',
  axis: ''
});
const errors = reactive({});
const validateField = (id, field) => {
  if (field === '') {
    errors[id] = 'This field cannot be empty my man.';
  } else {
    errors[id] = ''; // Clear error if valid
  }
};
const validateErrorMessages = () => {
  return Object.values(msg.value).every((value) => value === '');
};

const modelsToBeChecked = [inputX, inputY, inputN, roverInstructionsModel];

const validateVmodelsNotEmpty = () => {
  return modelsToBeChecked.every((variable) => variable.value !== '');
};
const isDisabled = ref(false);
const validateForm = () => {
  let noErrors = validateErrorMessages();
  let noEmptyInputs = validateVmodelsNotEmpty();

  if (noErrors && noEmptyInputs) {
    getFinalPosition(roverInstructionsModel.value);
  }
};

const validateInstructions = (value) => {
  if (!/^[LRM]+$/.test(value)) {
    errors.roverInstructionsModel = 'Only "L", "R", or "M" are allowed';

    return;
  }

  if (!value.includes('M')) {
    errors.roverInstructionsModel = 'The Rover needs to move forward (include "M")';
  } else {
    errors.roverInstructionsModel = '';
  }
};

watch(roverInstructionsModel, (newValue) => {
  roverInstructionsModel.value = newValue.toUpperCase();

  validateInstructions(newValue);
});
const validateDirection = (value) => {
  if (/^[NEWS]+$/.test(value)) {
    errors.inputN = '';
  } else {
    errors.inputN = `Invalid caracter`;
  }
};

watch(inputN, (newValue) => {
  inputN.value = newValue.toUpperCase();

  validateDirection(newValue);
});

// Get the Direction of the Rover

const createArrayFromInstructionString = (instructionsString) => {
  let stringToArray = instructionsString.toUpperCase();

  return stringToArray.split('');
};

// Computed Direction
const computedDirection = computed(() => {
  if (finalPosition.value !== null) {
    return finalPosition.value[2];
  } else {
    return computedArrayDirection.value[2];
  }
});
const computedArrayDirection = computed(() => {
  return [inputX.value, inputY.value, inputN.value];
});
const direction = computedDirection;
const directionToNumber = (directionString) => {
  switch (directionString) {
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
let directionNumber = ref(directionToNumber(direction));
const resetFinalPosition = (direction) => {
  directionNumber.value = directionToNumber(direction);
  finalPosition.value = null;
  movingPosition.value = null;
};

const calculateDirection = (inputString) => {
  let tempNumber;

  if (inputString === 'L') {
    tempNumber = directionNumber.value - 90;
    tempNumber > 270
      ? (directionNumber.value = 0)
      : tempNumber < 0
        ? (directionNumber.value = 270)
        : (directionNumber.value = tempNumber);
  } else {
    tempNumber = directionNumber.value + 90;
    tempNumber > 270
      ? (directionNumber.value = 0)
      : tempNumber < 0
        ? (directionNumber.value = 270)
        : (directionNumber.value = tempNumber);
  }

  switch (directionNumber.value) {
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
const calculateMovingForward = (directionString) => {
  switch (directionString) {
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
  if (oldPosition === null) {
    oldPosition = [0, 0, 'N'];
  }

  let result = [];

  let xSum = oldPosition[0] + newPosition[0];

  result.push(xSum);

  let ySum = oldPosition[1] + newPosition[1];

  result.push(ySum);

  result.push(newPosition[2]);

  return result;
};

const getFinalPosition = (instructionsStringArray) => {
  let currentDirection;
  let currentPosition;

  let instructionStringToArray;

  instructionStringToArray = createArrayFromInstructionString(instructionsStringArray);

  instructionStringToArray.forEach((item) => {
    if (item === 'L' || item === 'R') {
      currentDirection = calculateDirection(item);
    } else {
      currentPosition = calculateMovingForward(currentDirection ?? computedArrayDirection.value[2]);

      movingPosition.value = updatePositions(movingPosition.value ?? [0, 0, 'N'], currentPosition);
    }
  });

  finalPosition.value = updatePositions(
    finalPosition.value ?? computedArrayDirection.value,
    movingPosition.value
  );

  movingPosition.value = null;
};
</script>

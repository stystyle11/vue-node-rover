<template>
  <div class="w-full md:w-1/2">
    <form
      class="w-fit p-0 m-4 md:w-[90%] md:p-4 h-fit border-2 border-white-600 rounded-md bg-blue-900"
    >
      <h1 class="p-4 m-1 h-16 w-80 from-neutral-200 text-white">Rover's Name:{{ name }}</h1>
      <div class="block md:flex md:space-x-4 p-2 mt-2 w-full sm:w-full mb-2 h-fit">
        <!-- inputX-->

        <div class="w-full md:w-[30%] h-22">
          <label
            class="p-1 from-neutral-200 text-white"
            for="inputX"
            >Input X:</label
          >
          <input
            id="inputX"
            v-model="inputX"
            :placeholder="placeholderX"
            :type="typeX"
            class="w-full p-1 border-2 text-center placeholder:text-xs"
            @blur="
              resetFinalPosition();
              validateField('inputX', inputX);
            "
          />
          <div class="w-full">
            <span :class="spanClass">{{ errors.inputX }}</span>
          </div>
        </div>

        <!-- Input Y-->

        <div class="w-full md:w-[30%] h-22">
          <label
            class="p-1 from-neutral-200 text-white"
            for="inputY"
            >Input Y:</label
          >
          <input
            id="inputY"
            v-model="inputY"
            :placeholder="placeholderY"
            :type="typeY"
            class="w-full p-1 border-2 text-center placeholder:text-xs"
            @blur="
              resetFinalPosition();
              validateField('inputY', inputY);
            "
          />
          <div class="w-full">
            <span :class="spanClass">{{ errors.inputY }}</span>
          </div>
        </div>

        <!-- Input N Direction-->

        <div class="w-full md:w-[30%] h-22">
          <label
            class="p-1 from-neutral-200 text-white"
            for="inputN"
            >Direction:</label
          >
          <input
            id="inputN"
            v-model="inputN"
            :maxlength="maxlengthN"
            :placeholder="placeholderN"
            :type="typeN"
            class="w-full p-1 border-2 text-center placeholder:text-xs md:w-[80%]"
            @blur="
              resetFinalPosition();
              validateField('inputN', inputN);
            "
          />
          <div class="w-full">
            <span :class="spanClass">{{ errors.inputN }}</span>
          </div>
        </div>
      </div>

      <!-- Input input Instructions-->

      <div class="p-2 mt-2 w-full min-h-36">
        <label
          class="p-1 from-neutral-200 text-white"
          for="inputN"
          >Moving Instructions:</label
        >
        <input
          id="roverInstructionsModel"
          class="w-full p-2 border border-gray-300 mt-2 placeholder:text-xs"
          v-model="roverInstructionsModel"
          :type="typeInstructions"
          :placeholder="placeholderInstructions"
          :maxlength="maxlengthInstructions"
          :disabled="false"
          :autofocus="false"
          @blur="
            resetFinalPosition();
            validateField('roverInstructionsModel', roverInstructionsModel);
          "
        />
        <span :class="spanClass">{{ errors.roverInstructionsModel }}</span>
      </div>

      <div class="p-2 mb-4 w-full text-white">Final Position:{{ finalPosition }}</div>

      <!-- Submit button-->

      <button
        :disabled="isDisabled"
        @click.prevent="validateForm"
        class="border border-white p-2 m-8 h-fit w-[90%] md:w-1/2 lg:w-1/2 mx-auto block"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue';

// PROPS
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  spanClass: {
    type: String
  },

  placeholderX: {
    type: String
  },
  placeholderY: {
    type: String
  },
  placeholderN: {
    type: String
  },
  placeholderInstructions: {
    type: String
  },
  maxlengthN: {
    type: Number,
    default: 1
  },
  typeX: {
    type: String,
    default: 'number'
  },
  typeInstructions: {
    type: String,
    default: 'text'
  },
  typeY: {
    type: String,
    default: 'number'
  },
  typeN: {
    type: String,
    default: 'text'
  },
  maxlengthInstructions: {
    type: Number,
    default: 15
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
  inputClass: {
    type: String
  },
  instructionsPosition: {
    type: String
  }
});

/*
// V Models Input Received from Props
*/
const inputX = ref(props.landingPositionX);
const roverInstructionsModel = ref(props.instructionsPosition);
const inputY = ref(props.landingPositionY);
const inputN = ref(props.landingPositionN);

/*
// Validation logic
*/

const errors = reactive({});

const validateField = (id, field) => {
  if (field === '') {
    errors[id] = 'Field is empty!';
  } else {
    errors[id] = '';
  }
};
const validateErrorMessages = () => {
  return Object.values(errors).every(
    (value) => value === '' || value === null || value === undefined
  );
};

const modelsToBeChecked = [inputX, inputY, inputN, roverInstructionsModel];

const idsToBeChecked = ['inputX', 'inputY', 'inputN', 'roverInstructionsModel'];

const validateVmodelsNotEmpty = () => {
  modelsToBeChecked.map((item, index) => {
    if (index < idsToBeChecked.length) {
      validateField(idsToBeChecked[index], item.value);
    }
  });
};

const isDisabled = ref(false);

const validateForm = () => {
  validateVmodelsNotEmpty();

  // Check Watch function that disables on submit
  validateInstructions(roverInstructionsModel.value);
  validateDirection(inputN.value);

  let noErrors = validateErrorMessages();

  if (noErrors) {
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

/*
// Logic To calculate the Final Position
*/
const finalPosition = ref(null);
const movingPosition = ref(null);

const computedArrayDirection = computed(() => {
  return [inputX.value, inputY.value, inputN.value];
});

// Get the Direction of the Rover

const createArrayFromInstructionString = (instructionsString) => {
  let stringToArray = instructionsString.toUpperCase();

  return stringToArray.split('');
};

// Get the string and turn it to a number to calculate the direction further in the logic

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

let directionNumber = ref(directionToNumber(computedArrayDirection.value[2]));

// Reset all variables when the Landing position of direction changes

const resetFinalPosition = () => {
  directionNumber.value = directionToNumber(computedArrayDirection.value[2]);
  finalPosition.value = null;
  movingPosition.value = null;
};

// Calculate of rover direction, thinking it will never be 360 and never below 0 and so
// it can match E,W,S,N

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
// Calculate the distance it has moved forward
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
// update position is basically a math operation between old and new positions

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
/*
//  Final position runs a foreach over the instructions array and runs a function depending on the directio
// and movement
*/

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

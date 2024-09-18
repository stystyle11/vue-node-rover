<template>
  <label v-if="label">{{ label }}</label>
  <input
    :class="classFromParent"
    v-model="getValueFromParent"
    @input="handleInput"
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :disabled="disabled"
    :autofocus="autofocus"
    @change="emitEvent"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>

<script setup>
import { ref } from 'vue';

// Define the emit function for the component

const props = defineProps({
  modelValueFromParent: {
    type: Number,
  },
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  maxlength: {
    type: Number,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
});
const getValueFromParent = ref(props.modelValueFromParent);
const classFromParent = ref(props.class);
const emit = defineEmits(['updateModelValue', 'blur', 'focus']);

// A method to emit an event
function emitEvent() {
  emit('updateModelValue', getValueFromParent);
}
</script>

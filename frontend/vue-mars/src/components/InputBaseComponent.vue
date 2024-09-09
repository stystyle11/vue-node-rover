<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      v-model="getValueFromParent"
      @input="handleInput"
      :type="type"
      :maxlength="maxlength"
      :disabled="disabled"
      :autofocus="autofocus"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  modelValueFromParent: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
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

const emit = defineEmits(['update:modelValue', 'blur', 'focus']);

const allowedLetters = ['E', 'W', 'N', 'S', 'L', 'M'];

const handleInput = (event) => {
  const filteredValue = event.target.value
    .toUpperCase()
    .split('')
    .filter((char) => allowedLetters.includes(char))
    .join('');

  emit('update:modelValue', filteredValue);
};

const handleBlur = (event) => {
  emit('blur', event);
};

const handleFocus = (event) => {
  emit('focus', event);
};
</script>

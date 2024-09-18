import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import RoversPanelComponent from '@/components/RoversPanelComponent.vue';

describe('RoversPanelComponent', () => {
  it('renders the component properly', () => {
    const wrapper = mount(RoversPanelComponent, {
      props: {
        name: 'Test Rover',
        placeholder: 'Enter instructions',
        landingPositionX: 0,
        landingPositionY: 0,
        landingPositionN: 'N',
        instructionsPosition: ''
      }
    });

    expect(wrapper.text()).toContain("Rover's Name:Test Rover");
    expect(wrapper.find('#inputX').exists()).toBe(true);
    expect(wrapper.find('#inputY').exists()).toBe(true);
    expect(wrapper.find('#inputN').exists()).toBe(true);
  });

  it('validates required fields', async () => {
    const wrapper = mount(RoversPanelComponent, {
      props: {
        name: 'Test Rover',
        placeholder: 'Enter instructions',
        landingPositionX: 0,
        landingPositionY: 0,
        landingPositionN: 'N',
        instructionsPosition: ''
      }
    });

    const inputX = wrapper.find('#inputX');
    const inputY = wrapper.find('#inputY');
    const inputN = wrapper.find('#inputN');

    await inputX.setValue('');
    await inputX.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Field is empty!');

    await inputY.setValue('');
    await inputY.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Field is empty!');

    await inputN.setValue('');
    await inputN.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Field is empty!');
  });

  it('submits the form with valid data', async () => {
    const wrapper = mount(RoversPanelComponent, {
      props: {
        name: 'Test Rover',
        placeholder: 'Enter instructions',
        landingPositionX: 0,
        landingPositionY: 0,
        landingPositionN: 'N',
        instructionsPosition: ''
      }
    });

    const inputX = wrapper.find('#inputX');
    const inputY = wrapper.find('#inputY');
    const inputN = wrapper.find('#inputN');
    const instructions = wrapper.find('#roverInstructionsModel');
    const button = wrapper.find('button');

    await inputX.setValue(3);
    await inputY.setValue(5);
    await inputN.setValue('E');
    await instructions.setValue('RMLMR');

    await button.trigger('click');

    expect(wrapper.text()).toContain('Final Position:');
  });
});

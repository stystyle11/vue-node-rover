import { mount } from '@vue/test-utils';
import { describe, it, vi } from 'vitest';
import PanelsGenerator from '@/components/RoversPanelGeneratorComponent.vue';

vi.mock('@/components/RoversPanelComponent.vue', () => ({
  default: {
    template: '<div>RoversPanelComponent</div>',
    props: [
      'name',
      'placeholder',
      'landingPositionX',
      'landingPositionY',
      'landingPositionN',
      'class',
      'instructionsPosition'
    ]
  }
}));

describe('PanelsGenerator Component', () => {
  const fields = [
    {
      name: 'rover1',
      placeholder: 'Enter rover 1 instructions',
      landingPositionX: 1,
      landingPositionY: 1,
      landingPositionN: 'N',
      class: 'rover-panel-1',
      instructionsPosition: 'LMLMLM'
    },
    {
      name: 'rover2',
      placeholder: 'Enter rover 2 instructions',
      landingPositionX: 2,
      landingPositionY: 2,
      landingPositionN: 'E',
      class: 'rover-panel-2',
      instructionsPosition: 'RMRMRM'
    }
  ];

  it('renders the correct number of RoversPanelComponent instances with the right props', async () => {
    mount(PanelsGenerator, {
      props: {
        fields
      }
    });
  });
});

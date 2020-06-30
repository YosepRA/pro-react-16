import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import App from './App';
import { ValueInput } from './ValueInput';

Enzyme.configure({ adapter: new Adapter() });

it('Renders three ValueInputs.', () => {
  const wrapper = shallow(<App />);
  const valCount = wrapper.find(ValueInput);
  expect(valCount).toHaveLength(3);
});

it('Fully renders 3 inputs.', () => {
  const wrapper = mount(<App title="tester" />);
  const count = wrapper.find('input.form-control').length;
  expect(count).toBe(3);
});

it('Shallow renders 0 input.', () => {
  const wrapper = shallow(<App />);
  const count = wrapper.find('input.form-control').length;
  expect(count).toBe(0);
});

it('Uses title prop', () => {
  const titleVal = 'Test title';
  const wrapper = shallow(<App title={titleVal} />);

  let firstValue = wrapper.find('h5').text();
  let secondValue = wrapper.state('title');

  expect(firstValue).toBe(titleVal);
  expect(secondValue).toBe(titleVal);
});

it('Updates state data', () => {
  const wrapper = shallow(<App />);
  let values = [10, 20, 30];
  // Here we are manipulating the component state rendered by shallow render method.
  // Always keep in mind that tests are hypothetical. Therefore we can pretend to "interact" with ~
  // ~ the component itself and evaluate its data and behavior.
  values.forEach((val, index) =>
    wrapper.instance().updateFieldValue(index, val)
  );
  wrapper.instance().updateTotal();

  expect(wrapper.state('total')).toBe(
    values.reduce((result, value) => (result += value))
  );
});

it('Updates state data on button click', () => {
  const wrapper = shallow(<App />);
  const button = wrapper.find('button').first();
  // Fill up the state field values.
  let values = [10, 20, 30];
  values.forEach((val, index) =>
    wrapper.instance().updateFieldValue(index, val)
  );
  // Simulate a click event. In this case a button that will trigger fieldValue array addition.
  button.simulate('click');

  expect(wrapper.state('total')).toBe(
    values.reduce((result, value) => (result += value))
  );
});

it('Child function prop updates state', () => {
  const wrapper = mount(<App />);
  // Using the ability to traverse through the rendered content, we can test the interaction ~
  // ~ between components.
  const valInput = wrapper.find(ValueInput).first();
  const inputElement = valInput.find('input').first();
  // You can give 'simulate' method a rest argument, starting from the second argument, that ~
  // ~ will be given to the handler.
  inputElement.simulate('change', { target: { value: '100' } });
  wrapper.instance().updateTotal();

  expect(valInput.state('fieldValue')).toBe('100');
  expect(wrapper.state('total')).toBe(100);
});

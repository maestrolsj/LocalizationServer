import React from 'react';
import { mount } from 'enzyme';
import LayOut from '../Layout';

describe('LayOut page', () => {
    it('match snapshot', () => {
        const wrapper = mount(<LayOut />);
        expect(wrapper).toMatchSnapshot();
    });
});

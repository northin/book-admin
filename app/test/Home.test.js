import Home from ".././view/Home.js";
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'antd/lib/radio';
Enzyme.configure({ adapter: new Adapter() });
const setup = () => {
    // 模拟 props
    const props = {
      // Jest 提供的mock 函数
    //   onAddClick: jest.fn()
    }
  
    // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
    const wrapper = Enzyme.shallow(<Home {...props} />)
    return {
      props,
      wrapper
    }
}

describe("Home",() => {
    const { wrapper, props } = setup();
    it("test render", () => {
        console.log(wrapper.find("button").exists())
        expect(wrapper.find('div').exists()).toEqual(true)
    })
})


import User from ".././view/User.js";
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    userQueryAll
} from "@redux/action/action.js"
import Immutable from 'immutable';
import { Button } from 'antd/lib/radio';
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureMockStore();
// const store = mockStore({'test':{'user':[{'name':'sj1'}]}});
const store = mockStore(Immutable.fromJS({
    // test:[{id:1}],
    test:{user:[]}
}))
Enzyme.configure({ adapter: new Adapter() });
const setup = () => {
    // 模拟 props
    const props = {
      // Jest 提供的mock 函数
    //   onAddClick: jest.fn()
    }
  
    // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
    const wrapper = Enzyme.render(
        <Provider store={store}>
            <User {...props} />
        </Provider>)
    return {
      props,
      wrapper
    }
}

describe("Home",() => {
    const { wrapper, props } = setup();
    it("test render", () => {
        console.log(wrapper.find("p").exists())
        // expect(wrapper.find("button")).to.have.length(1)
        expect(wrapper.find("p").exists()).toEqual(true)
    })
})

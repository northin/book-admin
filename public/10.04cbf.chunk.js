/*! 版权所有，翻版必究 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"./app/view/User.js":
/*!**************************!*\
  !*** ./app/view/User.js ***!
  \**************************/
/*! no static exports found */function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");\n\nvar _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _action = __webpack_require__(/*! @redux/action/action.js */ "./app/redux/action/action.js");\n\nvar _radio = __webpack_require__(/*! antd/lib/radio */ "./node_modules/antd/lib/radio/index.js");\n\nvar _BaseComponment2 = __webpack_require__(/*! @comp/BaseComponment.js */ "./app/componments/BaseComponment.js");\n\nvar _BaseComponment3 = _interopRequireDefault(_BaseComponment2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar User = function (_BaseComponment) {\n    _inherits(User, _BaseComponment);\n\n    function User(props) {\n        _classCallCheck(this, User);\n\n        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, props));\n    }\n\n    _createClass(User, [{\n        key: \'componentWillMount\',\n        value: function componentWillMount() {\n            this.props.userQueryAll(); //发送get请求\n            console.log(this.props.users);\n        }\n    }, {\n        key: \'render\',\n        value: function render() {\n            return _react2.default.createElement(\n                \'div\',\n                null,\n                _react2.default.createElement(\n                    _radio.Button,\n                    null,\n                    \'ttttt\'\n                ),\n                _react2.default.createElement(\n                    \'ul\',\n                    null,\n                    this.props.users.map(function (todo, index) {\n                        return _react2.default.createElement(\n                            \'li\',\n                            {\n                                key: index\n                            },\n                            todo.name\n                        );\n                    })\n                )\n            );\n        }\n    }]);\n\n    return User;\n}(_BaseComponment3.default);\n\nUser.propTypes = {\n    users: _propTypes2.default.arrayOf(_propTypes2.default.shape({\n        // name: PropTypes.string.isRequired,\n        // age: PropTypes.number.isRequired,\n    }).isRequired).isRequired,\n    userQueryAll: _propTypes2.default.func.isRequired\n};\nvar mapStateToProps = function mapStateToProps(state) {\n    return {\n        users: state.getIn(["test", "user"]).toJS()\n    };\n};\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n    return {\n        userQueryAll: function userQueryAll() {\n            dispatch((0, _action.userQueryAll)());\n        }\n    };\n};\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(User);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvdmlldy9Vc2VyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC92aWV3L1VzZXIuanM/ODAwYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcclxuaW1wb3J0IHtcclxuICAgIHVzZXJRdWVyeUFsbFxyXG59IGZyb20gXCJAcmVkdXgvYWN0aW9uL2FjdGlvbi5qc1wiXHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ2FudGQvbGliL3JhZGlvJztcclxuaW1wb3J0IEJhc2VDb21wb25tZW50IGZyb20gXCJAY29tcC9CYXNlQ29tcG9ubWVudC5qc1wiXHJcbmNsYXNzIFVzZXIgZXh0ZW5kcyBCYXNlQ29tcG9ubWVudHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy51c2VyUXVlcnlBbGwoKSAvL+WPkemAgWdldOivt+axglxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMudXNlcnMpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbj50dHR0dDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnVzZXJzLm1hcCgodG9kbyxpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dG9kby5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5Vc2VyLnByb3BUeXBlcyA9IHtcclxuICAgIHVzZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihcclxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgICAgICAvLyBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIC8vIGFnZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICkuaXNSZXF1aXJlZCxcclxuICAgIHVzZXJRdWVyeUFsbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyAgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHVzZXJzIDogc3RhdGUuZ2V0SW4oW1widGVzdFwiLFwidXNlclwiXSkudG9KUygpXHJcbiAgICB9XHJcbn1cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB1c2VyUXVlcnlBbGw6ICgpID0+IHtcclxuICAgICAgICAgICAgZGlzcGF0Y2godXNlclF1ZXJ5QWxsKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShVc2VyKSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7Ozs7OztBQUFBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUhBO0FBREE7QUFEQTtBQUZBO0FBYUE7Ozs7QUF4QkE7QUFDQTtBQTBCQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/view/User.js\n')}}]);
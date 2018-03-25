'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _smartInputValidator = require('smart-input-validator');

var _smartInputValidator2 = _interopRequireDefault(_smartInputValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextField = function (_Component) {
  _inherits(TextField, _Component);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));

    _this.valueChanged = _this.valueChanged.bind(_this);
    _this.randomNumber = _this.randomNumber.bind(_this);
    _this.showOptions = _this.showOptions.bind(_this);
    _this.inputValueChange = _this.inputValueChange.bind(_this);
    _this.handleArrowPress = _this.handleArrowPress.bind(_this);
    _this.clearSelectedOptionIndex = _this.clearSelectedOptionIndex.bind(_this);

    _this.state = {
      optionsVisible: false,
      inputValue: _this.props.value,
      selectedOptionIndex: null
    };
    return _this;
  }

  _createClass(TextField, [{
    key: 'valueChanged',
    value: function valueChanged(inputValue) {
      var rules = void 0;

      if (this.props.required) {
        rules = 'required|in:';
      } else {
        rules = 'in:';
      }

      this.props.options.forEach(function (option) {
        if (option.constructor == Object) {
          rules += ',' + option.inputValue;
        } else {
          rules += ',' + option;
        }
      });

      var errors = (0, _smartInputValidator2.default)({
        inputValue: inputValue
      }, {
        inputValue: rules,
        _$options: this.props.validationOptions || {}
      }, {
        inputValue: this.props.validationMessages || {}
      });

      return this.setState(_extends({}, this.state, {
        inputValue: inputValue,
        optionsVisible: false,
        selectedOptionIndex: null
      }), this.props.onChange(inputValue, errors));
    }
  }, {
    key: 'inputValueChange',
    value: function inputValueChange(inputValue) {
      if (!inputValue) return this.valueChanged('');

      return this.setState(_extends({}, this.state, {
        inputValue: inputValue
      }));
    }
  }, {
    key: 'randomNumber',
    value: function randomNumber() {
      return Math.floor(Math.random() * (999999 - 111111)) + 111111;
    }
  }, {
    key: 'clearSelectedOptionIndex',
    value: function clearSelectedOptionIndex() {
      return this.setState(_extends({}, this.state, {
        selectedOptionIndex: null
      }));
    }
  }, {
    key: 'showOptions',
    value: function showOptions() {
      var _this2 = this;

      var options = void 0;

      if (this.state.inputValue != this.props.value) {
        options = this.props.options.filter(function (option) {
          var regex = _this2.state.inputValue.split(' ').join('|');
          regex = new RegExp('' + regex, 'igm');

          if (option.constructor == Object) return regex.test(option.value);
          return regex.test(option);
        });
      } else {
        options = this.props.options;
      }

      return options.map(function (option, i) {
        return option.constructor == Object ? _react2.default.createElement(
          'li',
          { key: i },
          _this2.state.selectedOptionIndex == i ? _react2.default.createElement(
            'a',
            {
              className: 'onlink',
              onMouseDown: function onMouseDown() {
                return _this2.valueChanged(option.value);
              },
              onMouseOver: _this2.clearSelectedOptionIndex
            },
            option.label
          ) : _react2.default.createElement(
            'a',
            {
              onMouseDown: function onMouseDown() {
                return _this2.valueChanged(option.value);
              },
              onMouseOver: _this2.clearSelectedOptionIndex
            },
            option.label
          )
        ) : _react2.default.createElement(
          'li',
          { key: i },
          _this2.state.selectedOptionIndex == i ? _react2.default.createElement(
            'a',
            {
              className: 'onlink',
              onMouseDown: function onMouseDown() {
                return _this2.valueChanged(option);
              },
              onMouseOver: _this2.clearSelectedOptionIndex
            },
            option
          ) : _react2.default.createElement(
            'a',
            {
              onMouseDown: function onMouseDown() {
                return _this2.valueChanged(option);
              },
              onMouseOver: _this2.clearSelectedOptionIndex
            },
            option
          )
        );
      });
    }
  }, {
    key: 'handleArrowPress',
    value: function handleArrowPress(keyCode) {
      if (keyCode == 38) {
        // arrow up
        if (this.state.selectedOptionIndex === null || this.state.selectedOptionIndex < 1) {
          return this.setState(_extends({}, this.state, {
            selectedOptionIndex: this.props.options.length - 1,
            optionsVisible: true
          }));
        }

        return this.setState(_extends({}, this.state, {
          selectedOptionIndex: this.state.selectedOptionIndex - 1,
          optionsVisible: true
        }));
      } else if (keyCode == 40) {
        // arrow down
        if (this.state.selectedOptionIndex === null || this.state.selectedOptionIndex >= this.props.options.length - 1) {
          return this.setState(_extends({}, this.state, {
            selectedOptionIndex: 0,
            optionsVisible: true
          }));
        }

        return this.setState(_extends({}, this.state, {
          selectedOptionIndex: this.state.selectedOptionIndex + 1,
          optionsVisible: true
        }));
      } else if (keyCode == 13) {
        // enter
        return this.valueChanged(this.props.options[this.state.selectedOptionIndex]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var optionsWrapperClassName = 'options-wrapper-' + this.randomNumber(),
          inputWrapperClassName = 'input-wrapper-' + this.randomNumber();

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: inputWrapperClassName },
          _react2.default.createElement('input', {
            type: 'text',
            onFocus: function onFocus() {
              return _this3.setState(_extends({}, _this3.state, {
                optionsVisible: true
              }));
            },
            onBlur: function onBlur() {
              return _this3.setState(_extends({}, _this3.state, {
                optionsVisible: false,
                inputValue: _this3.props.value
              }));
            },
            onKeyDown: function onKeyDown(keyPressEvent) {
              return _this3.handleArrowPress(keyPressEvent.keyCode);
            },
            value: this.state.inputValue,
            onChange: function onChange(changeEvent) {
              return _this3.inputValueChange(changeEvent.target.value);
            }
          }),
          _react2.default.createElement(
            'ul',
            { className: this.props.optionsWrapperClassName ? '' + this.props.optionsWrapperClassName : '' + optionsWrapperClassName
            },
            this.showOptions()
          )
        ),
        _react2.default.createElement(
          'div',
          { className: this.props.errorsWrapperClassName },
          this.props.errors.map(function (error, i) {
            return _react2.default.createElement(
              'p',
              { key: i },
              error
            );
          })
        ),
        _react2.default.createElement(
          'style',
          null,
          '\n            .' + inputWrapperClassName + ' {\n              position: relative;\n              display: inline-block;\n            }\n            .' + inputWrapperClassName + ':after {\n              content: \'\';\n              position: absolute;\n              width: 0;\n              height: 0;\n              border-left: 5px solid transparent;\n              border-right: 5px solid transparent;\n              border-top: 5px solid #000000;\n              top: 50%;\n              right: 5px;\n              transform: translate(0, -50%);\n              z-index: 1;\n            }\n            .' + inputWrapperClassName + ' input {\n              padding-right: 15px;\n            }\n            .' + optionsWrapperClassName + ' {\n              display: ' + (this.state.optionsVisible ? 'block' : 'none') + ';\n              position: absolute;\n              left: 0;\n              right: 0;\n              top: 100%;\n              border: 1px solid #d0d1d5;\n              maxHeight: ' + (this.props.optionsWrapperMaxHeight ? this.props.optionsWrapperMaxHeight + 'px' : '200px') + ';\n              overflowY: auto;\n              margin: 0;\n              padding: 0;\n              z-index: 1;\n              background: #ffffff;\n            }\n            .' + optionsWrapperClassName + ' li {\n              list-style: none;\n              border-bottom: 1px solid #d0d1d5;\n            }\n            .' + optionsWrapperClassName + ' li:last-child {\n              border-bottom: 0;\n            }\n            .' + optionsWrapperClassName + ' li a {\n              display: block;\n            }\n            .' + optionsWrapperClassName + ' li .onlink {\n              background: #d0d1d5;\n              color: #ffffff;\n            }\n            .' + optionsWrapperClassName + ' li a:hover {\n              cursor: pointer;\n              background: #d0d1d5;\n              color: #ffffff;\n            }\n          '
        )
      );
    }
  }]);

  return TextField;
}(_react.Component);

TextField.propTypes = {
  // styling
  inputClassName: _propTypes2.default.string,
  errorsWrapperClassName: _propTypes2.default.string,
  optionsWrapperClassName: _propTypes2.default.string,
  optionsWrapperMaxHeight: _propTypes2.default.number,
  // validations
  required: _propTypes2.default.bool,
  validationMessages: _propTypes2.default.object,
  validationOptions: _propTypes2.default.object,
  // input options
  placeholder: _propTypes2.default.string,
  errors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])).isRequired
};
TextField.defaultProps = {
  // styling
  className: '',
  errorsWrapperClassName: '',
  optionsWrapperClassName: '',
  optionsWrapperMaxHeight: null,
  // validations
  required: false,
  validationMessages: null,
  validationOptions: null,
  // input options
  placeholder: '',
  errors: []
};
exports.default = TextField;
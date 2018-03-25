'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    return _this;
  }

  _createClass(TextField, [{
    key: 'valueChanged',
    value: function valueChanged(value) {
      var errors = (0, _smartInputValidator2.default)({
        value: value
      }, {
        value: this.props.validationRules,
        _$options: this.props.validationOptions || {}
      }, {
        value: this.props.validationMessages || {}
      });

      return this.props.onChange(value, errors);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', {
          type: this.props.password ? 'password' : 'text',
          className: this.props.inputClassName,
          placeholder: this.props.placeholder,
          onChange: function onChange(changeEvent) {
            return _this2.valueChanged(changeEvent.target.value);
          },
          value: this.props.value,
          maxLength: this.props.maxLength
        }),
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
  // validations
  validationRules: _propTypes2.default.string.isRequired,
  validationMessages: _propTypes2.default.object,
  validationOptions: _propTypes2.default.object,
  // input options
  placeholder: _propTypes2.default.string,
  errors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  maxLength: _propTypes2.default.number,
  password: _propTypes2.default.bool,
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired
};
TextField.defaultProps = {
  // styling
  className: '',
  errorsWrapperClassName: '',
  // validations
  validationMessages: null,
  validationOptions: null,
  // input options
  placeholder: '',
  errors: [],
  maxLength: null,
  password: false
};
exports.default = TextField;
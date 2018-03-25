import React, {Component} from 'react';
import PropTypes from 'prop-types';
import validator from 'smart-input-validator';

export default class TextField extends Component {
  static propTypes = {
    // styling
    inputClassName: PropTypes.string,
    errorsWrapperClassName: PropTypes.string,
    optionsWrapperClassName: PropTypes.string,
    optionsWrapperMaxHeight: PropTypes.number,
    // validations
    required: PropTypes.bool,
    validationMessages: PropTypes.object,
    validationOptions: PropTypes.object,
    // input options
    placeholder: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])).isRequired
  };

  static defaultProps = {
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

  constructor(props) {
    super(props);

    this.valueChanged = this.valueChanged.bind(this);
    this.randomNumber = this.randomNumber.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);

    this.state = {
      optionsVisible: false,
      inputValue: this.props.value
    };
  }

  valueChanged(inputValue) {
    let rules;

    if (this.props.required) {
      rules = 'required|in:';
    } else {
      rules = 'in:'
    }

    this.props.options.forEach(option => {
      if (option.constructor == Object) {
        rules += `,${option.inputValue}`;
      } else {
        rules += `,${option}`;
      }
    });

    let errors = validator({
      inputValue
    }, {
      inputValue: rules,
      _$options: this.props.validationOptions || {}
    }, {
      inputValue: this.props.validationMessages || {}
    });

    return this.setState({
      ...this.state,
      inputValue
    }, this.props.onChange(inputValue, errors));
  }

  inputValueChange(inputValue) {
    if (!inputValue) return this.valueChanged('');

    return this.setState({
      ...this.state,
      inputValue
    });
  }

  randomNumber() {
    return Math.floor(Math.random() * (999999 - 111111)) + 111111;
  }

  showOptions() {
    let options;

    if (this.state.inputValue != this.props.value) {
      options = this.props.options.filter(option => {
        let regex = this.state.inputValue.split(' ').join('|');
        regex = new RegExp(`${regex}`, 'igm');

        if (option.constructor == Object) return regex.test(option.value);
        return regex.test(option);
      });
    } else {
      options = this.props.options;
    }

    return options.map((option, i) =>
      option.constructor == Object
      ? <li key={i}>
          <a onMouseDown={() => this.valueChanged(option.value)}>{option.label}</a>
        </li>
      : <li key={i}>
          <a onMouseDown={() => this.valueChanged(option)}>{option}</a>
        </li>
    );
  }

  render() {
    let optionsWrapperClassName = `options-wrapper-${this.randomNumber()}`,
        inputWrapperClassName = `input-wrapper-${this.randomNumber()}`;

    return (
      <div>
        <div className={inputWrapperClassName}>
          <input
            type="text"
            onFocus={() => this.setState({
              ...this.state,
              optionsVisible: true
            })}
            onBlur={() => this.setState({
              ...this.state,
              optionsVisible: false,
              inputValue: this.props.value
            })}
            value={this.state.inputValue}
            onChange={changeEvent => this.inputValueChange(changeEvent.target.value)}
          />
          <ul className={this.props.optionsWrapperClassName
            ? `${this.props.optionsWrapperClassName}`
            : `${optionsWrapperClassName}`}
          >
            {this.showOptions()}
          </ul>
        </div>
        <div className={this.props.errorsWrapperClassName}>
          {
            this.props.errors.map((error, i) =>
              <p key={i}>{error}</p>
            )
          }
        </div>
        <style>
          {`
            .${inputWrapperClassName} {
              position: relative;
              display: inline-block;
            }
            .${inputWrapperClassName}:after {
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid #000000;
              top: 50%;
              right: 5px;
              transform: translate(0, -50%);
              z-index: 1;
            }
            .${inputWrapperClassName} input {
              padding-right: 15px;
            }
            .${optionsWrapperClassName} {
              display: ${this.state.optionsVisible? 'block': 'none'};
              position: absolute;
              left: 0;
              right: 0;
              top: 100%;
              border: 1px solid #d0d1d5;
              maxHeight: ${this.props.optionsWrapperMaxHeight
              ? `${this.props.optionsWrapperMaxHeight}px`
              : `200px`};
              overflowY: auto;
              margin: 0;
              padding: 0;
              z-index: 1;
              background: #ffffff;
            }
            .${optionsWrapperClassName} li {
              list-style: none;
              border-bottom: 1px solid #d0d1d5;
            }
            .${optionsWrapperClassName} li:last-child {
              border-bottom: 0;
            }
            .${optionsWrapperClassName} li a {
              display: block;
            }
            .${optionsWrapperClassName} li a:hover {
              cursor: pointer;
              background: #d0d1d5;
              color: #ffffff;
            }
          `}
        </style>
      </div>
    );
  }
}
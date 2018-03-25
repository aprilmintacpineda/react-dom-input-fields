import React, {Component} from 'react';
import PropTypes from 'prop-types';
import validator from 'smart-input-validator';

export default class TextField extends Component {
  static propTypes = {
    // styling
    inputClassName: PropTypes.string,
    errorsWrapperClassName: PropTypes.string,
    // validations
    validationRules: PropTypes.string.isRequired,
    validationMessages: PropTypes.object,
    validationOptions: PropTypes.object,
    // input options
    placeholder: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    maxLength: PropTypes.number,
    password: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
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

  constructor(props) {
    super(props);

    this.valueChanged = this.valueChanged.bind(this);
  }

  valueChanged(value) {
    let errors = validator({
      value
    }, {
      value: this.props.validationRules,
      _$options: this.props.validationOptions || {}
    }, {
      value: this.props.validationMessages || {}
    });

    return this.props.onChange(value, errors);
  }

  render() {
    return (
      <div>
        <input
          type={this.props.password? 'password' : 'text'}
          className={this.props.inputClassName}
          placeholder={this.props.placeholder}
          onChange={changeEvent => this.valueChanged(changeEvent.target.value)}
          value={this.props.value}
          maxLength={this.props.maxLength}
        />
        <div className={this.props.errorsWrapperClassName}>
          {
            this.props.errors.map((error, i) =>
              <p key={i}>{error}</p>
            )
          }
        </div>
      </div>
    );
  }
}
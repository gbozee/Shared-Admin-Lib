import React, { cloneElement, useState, useReducer } from "react";

const LabelWrapper = ({ children, label, name }) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    {cloneElement(children, { id: name })}
  </div>
);
const Input = ({ onChange = () => {}, options, ...props }) => (
  <LabelWrapper {...props}>
    {Array.isArray(options) ? (
      <>
        {options.map(option => (
          <LabelWrapper label={option} name={option}>
            <input
              {...props}
              id={option}
              onChange={e => onChange(e.target.value, e)}
            />
          </LabelWrapper>
        ))}
      </>
    ) : (
      <input {...props} onChange={e => onChange(e.target.value, e)} />
    )}
  </LabelWrapper>
);
const Select = ({ onChange = () => {}, label, options = [], ...props }) => (
  <LabelWrapper {...props}>
    <select {...props} onChange={e => onChange(e.target.value, e)}>
      {options.map((option, index) => {
        let data = option;
        if (typeof data === "string") {
          data = { label: option, value: option };
        }
        if (Array.isArray(option)) {
          data = { value: option[0], label: option[1] };
        }
        return <option value={data.value}>{data.label}</option>;
      })}
    </select>
  </LabelWrapper>
);
function reducer(state, action) {
  if (action.type == "change") {
    return { ...state, [action.field]: action.value };
  }
  throw new Error();
}
const Button = ({ text = "Submit", ...props }) => (
  <button {...props}>{text}</button>
);
let formComponents = {
  text: Input,
  email: Input,
  radio: Input,
  select: Select,
  checkbox: Input
};
export const Form = ({
  fields = [],
  render,
  error_messages = {},
  onSubmit,
  data,
  ButtonComponent = Button,
  className = "simple-form"
}) => {
  let formValues = {};
  let errorMessages = {};
  fields.forEach(field => {
    formValues[field.name] = "";
  });
  Object.keys(error_messages).forEach(field => {
    let error = error_messages[field];
    if (typeof error === "string") {
      return value => (!Boolean(value) || value.length === 0) && error;
    }
    let func = value => {
      let empty = (!Boolean(value) || value.length === 0) && error.empty;
      let invalid = !fields[field].validate(value) && error.invalid;
      return empty || invalid;
    };
    errorMessages[field] = func;
  });
  if (Boolean(data) && typeof data === "object") {
    formValues = { ...formValues, data };
  }
  let [state, dispatch] = useReducer(reducer, formValues);
  let [displayError, toggleError] = useState(false);
  let formFields = fields
    .map(field => {
      let result = {
        ...field
      };
      if (!Boolean(result.type)) {
        if (Array.isArray(result.options)) {
          result.type = "select";
        } else {
          result.type = "text";
        }
      }
      return result;
    })
    .map(field => {
      let Component = formComponents[field.type];
      let { type, ...rest } = field;
      let errorMessageFunc =
        errorMessages[field.name] ||
        function() {
          return undefined;
        };
      return {
        name: field.name,
        component: Component ? (
          <Component
            key={field.name}
            {...rest}
            value={state[field.name]}
            type={type}
            onChange={value =>
              dispatch({ type: "change", value, field: field.name })
            }
            errorMessage={displayError && errorMessageFunc(state[field.name])}
          />
        ) : (
          undefined
        )
      };
    });
  const onFormSubmit = e => {
    e.preventDefault();
    let hasErrors = Object.keys(errorMessages).filter(field =>
      Boolean(errorMessages[field](state[field]))
    );
    if (hasErrors.length === 0) {
      onSubmit(state, { toggleError });
    } else {
      toggleError(true);
    }
  };
  const submitButton = <ButtonComponent type="submit" />;
  if (!Boolean(render)) {
    return (
      <form className={className} onSubmit={onFormSubmit}>
        {formFields.map(x => x.component)}
        {submitButton}
      </form>
    );
  }
  let formRenderFields = {};
  formFields.forEach(field => {
    formRenderFields[field.name] = field.component;
  });
  return (
    <form className={className} onSubmit={onFormSubmit}>
      {render(formRenderFields, submitButton)}
    </form>
  );
};

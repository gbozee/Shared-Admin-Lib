import React, { useState, useReducer, useEffect } from "react";
import { Button } from "../primitives";
import { Select, Input, Textarea, Checkbox } from "./form-elements";
import TagsInput from "./TagsInput";

function reducer(state, action) {
  if (action.type == "change") {
    return { ...state, [action.field]: action.value };
  }
  if (action.type === "initialize") {
    return action.value;
  }
  throw new Error();
}
let defaultFormComponents = {
  checkbox: Checkbox,
  textarea: Textarea,
  text: Input,
  select: Select,
  button: Button,
  tagsInput: TagsInput
};
const FormContext = React.createContext(defaultFormComponents);

export const FormProvider = ({ formElements = {}, children }) => {
  let components = { ...defaultFormComponents, ...formElements };
  return (
    <FormContext.Provider value={components}>{children}</FormContext.Provider>
  );
};
function getErrors(schema, data) {
  return schema
    .validate(data, { abortEarly: false })
    .then(r => ({}))
    .catch(error => {
      let result = {};
      for (let i of error.inner) {
        result[i.path] = i.errors;
      }
      return result;
    });
}
const DefaultFormComponent = props => <form {...props} />;
export const Form = ({
  fields = [],
  render,
  onSubmit = () => {},
  data,
  FormComponent = DefaultFormComponent,
  className = "simple-form",
  buttonProps = {
    buttonText: "Submit",
    appearance: "primary",
    iconAfter: "right-arrow"
  },
  rerender,
  statePropsOnForm = e => ({}),
  formProps = { noValidate: true },
  validationSchema
}) => {
  let formValues = {};
  fields.forEach(field => {
    formValues[field.name] = "";
  });
  if (Boolean(data) && typeof data === "object") {
    formValues = { ...formValues, ...data };
  }
  let [state, dispatch] = useReducer(reducer, formValues);
  let [displayError, toggleError] = useState(false);
  let [errorMessages, setErrorMessages] = useState({});
  let formComponentsContext = React.useContext(FormContext);
  useEffect(() => {
    dispatch({ type: "initialize", value: formValues });
  }, [rerender]);
  let formFields = fields
    .map(field => {
      let result = {
        ...field
      };
      if (!Boolean(result.kind)) {
        if (Array.isArray(result.options)) {
          result.kind = "select";
        } else if(result.tags) {
          result.kind = "tagsInput"
        } else {
          result.kind = "text";
        }
      }
      return result;
    })
    .map(field => {
      let Component = formComponentsContext[field.kind];
      let { kind, component, overrideOnchange, ...rest } = field;
      if (component) {
        Component = component;
      }
      return {
        name: field.name,
        component: Component ? (
          <Component
            key={field.name}
            {...rest}
            value={state[field.name]}
            onChange={value => {
              if (overrideOnchange) {
                overrideOnchange(dispatch, value);
              } else {
                let result = value;
                dispatch({ type: "change", value: result, field: field.name });
              }
            }}
            onBlur={value => {
              if (displayError) {
                updateErrorMessage(field.name, value);
              }
            }}
            isInvalid={displayError && errorMessages[field.name]}
            errorMessage={errorMessages[field.name]}
          />
        ) : (
          undefined
        )
      };
    });
  const updateErrorMessage = field => {
    if (Object.keys(validationSchema.fields).includes(field)) {
      validationSchema
        .validateAt(field, state)
        .then(result => {
          setErrorMessages({ ...errorMessages, [field]: undefined });
        })
        .catch(error => {
          setErrorMessages({ ...errorMessages, [field]: error.errors });
        });
    }
  };
  const onFormSubmit = e => {
    e.preventDefault();
    if (validationSchema) {
      getErrors(validationSchema, state).then(result => {
        if (Object.keys(result).length === 0) {
          onSubmit(state);
        } else {
          setErrorMessages(result);
          toggleError(true);
        }
      });
    } else {
      onSubmit(state);
    }
  };
  const ButtonComponent = formComponentsContext.button;
  let { buttonText, ...remainingButtonProps } = buttonProps;
  const submitButton = (
    <ButtonComponent type="submit" {...remainingButtonProps}>
      {buttonText}
    </ButtonComponent>
  );
  if (!Boolean(render)) {
    return (
      <FormComponent
        {...formProps}
        {...statePropsOnForm(state)}
        className={className}
        onSubmit={onFormSubmit}
      >
        {formFields.map(x => x.component)}
        {submitButton}
      </FormComponent>
    );
  }
  let formRenderFields = {};
  formFields.forEach(field => {
    formRenderFields[field.name] = field.component;
  });
  return (
    <FormComponent
      {...formProps}
      {...statePropsOnForm(state)}
      className={className}
      onSubmit={onFormSubmit}
    >
      {render(formRenderFields, submitButton)}
    </FormComponent>
  );
};

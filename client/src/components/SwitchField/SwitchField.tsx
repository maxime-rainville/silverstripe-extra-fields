import React, {useState, ChangeEvent} from 'react';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import Switch from '@material-ui/core/Switch';
import classnames from 'classnames';

interface SwitchFieldProps {
  checkstart?: boolean,
  onChange?: (event: Event) => void
}

interface SwitchWrapperProps {
  extraClass?: string
  checked?: boolean
  value?: boolean
  // onChange?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void
  onChange?: any

  name: string
  checkedIcon?: HTMLElement
  color?: 'primary' | 'secondary' | 'default'
  disabled?: boolean
  disableRipple?: boolean
  edge?: 'start' | 'end' | false
  icon?: HTMLElement
  id?: string
  inputProps?: any
  required?: true
}

const SwitchWrapper = ({value, onChange, extraClass, ...props}: SwitchWrapperProps) => {
  const [checked, setChecked] = useState(value ?  true : false);
  const toggle = (e: ChangeEvent<HTMLInputElement>, eventChecked: boolean) => {
    setChecked(eventChecked);
    if (onChange) {
      onChange(e, {id: props.id, value: eventChecked ? 1 : 0});
    }
  }

  const switchProps = {
    onChange: toggle,
    checked,
    value: 1,
    // checkedIcon: props.checkedIcon,
    color: props.color,
    disabled: props.disabled,
    disableRipple: props.disableRipple,
    edge: props.edge,
    // icon: props.icon,
    id: props.id,
    inputProps: props.inputProps,
    required: props.required,
    name: props.name
  }

  return <Switch {...switchProps} className={classnames(extraClass)} />;
};

const SwitchField = (props: SwitchFieldProps) => {
  const FieldHolder:any = fieldHolder(SwitchWrapper);
  return <FieldHolder {...props} />;
};

export { SwitchField as Component };

export default SwitchField;

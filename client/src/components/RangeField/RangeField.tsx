import React, {useState, ChangeEvent} from 'react';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import Slider from '@material-ui/core/Slider';
import classnames from 'classnames';

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

const RangeWrapper = ({extraClass, onChange, ...props}: any) => {
  const [value, setValue] = useState(props.value);

  const handler = (e: ChangeEvent, value: number) => {
    setValue(value);
    if (onChange) {
      onChange(e, {id: props.id, value});
    }
  }
  return <Slider
    {...props} className={classnames(extraClass)}
    onChange={handler} onChangeCapture={handler} onChangeCommitted={handler}
    value={value} marks={true} valueLabelDisplay={'auto'} />;
};

const SwitchField = (props: any) => {
  const FieldHolder:any = fieldHolder(RangeWrapper);
  return <FieldHolder {...props} />;
};

export { SwitchField as Component };

export default SwitchField;

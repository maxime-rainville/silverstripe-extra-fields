import React, {useState} from 'react';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import Switch from '@material-ui/core/Switch';
import classnames from 'classnames';

interface SwitchFieldProps {
  checkstart?: boolean,
  onChange?: (event: Event) => void
}

interface SwitchWrapperProps {
  extraClass?: string,
  rightTitle?: string,
  hideLabels?: true,
  leftTitle?: string,
  noHolder?: boolean,
  checked?: boolean,
  type?: string,
}

const SwitchWrapper = ({extraClass, rightTitle, hideLabels, leftTitle, noHolder, type, ...props}: SwitchWrapperProps) => {
  return <Switch {...props} className={classnames(extraClass)} />;
};

const SwitchField = ({checkstart, onChange, ...props}: SwitchFieldProps) => {
  let toggle: ((e: Event) => void) | undefined;
  let checked: undefined|boolean;

  if (typeof checkstart === 'undefined') {
    console.log('checkstart undefined');
    toggle = onChange;
  } else {
    const [checked, setChecked] = useState(checkstart || false);
    toggle = (event: Event) => {
      console.log('changing');
      setChecked(!checked)
      if (onChange) {
        onChange(event);
      }
    };
  }

  const FieldHolder:any = fieldHolder(SwitchWrapper);

  // console.dir(props)
  return <FieldHolder checked={checked} onChange={toggle} {...props} />;
};

export { SwitchField as Component };

export default SwitchField;

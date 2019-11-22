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
  noHolder?: true,
}

const SwitchWrapper = ({extraClass, rightTitle, hideLabels, leftTitle, noHolder, ...props}: SwitchWrapperProps) => (
  <Switch className={classnames(extraClass)} {...props} />
);

const SwitchField = ({checkstart, onChange, ...props}: SwitchFieldProps) => {
  const [checked, setChecked] = useState(checkstart || false);

  const toggle = (event: Event) => {
    setChecked(!checked)
    if (onChange) {
      onChange(event);
    }
  };

  const FieldHolder:any = fieldHolder(SwitchWrapper);
  return <FieldHolder checked={checked} onChange={toggle} {...props} />;
};

export { SwitchField as Component };

export default SwitchField;

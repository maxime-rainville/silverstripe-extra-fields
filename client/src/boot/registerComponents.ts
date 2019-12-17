import Injector from 'lib/Injector';
import SwitchField from 'components/SwitchField/SwitchField';
import RangeField from 'components/RangeField/RangeField';

const registerComponents = () => {
  Injector.component.registerMany({
    RangeField,
    SwitchField
  });
};

export default registerComponents;

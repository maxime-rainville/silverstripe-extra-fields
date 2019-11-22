import Injector from 'lib/Injector';
import SwitchField from 'components/SwitchField/SwitchField';

const registerComponents = () => {
  Injector.component.registerMany({
    SwitchField
  });
};

export default registerComponents;

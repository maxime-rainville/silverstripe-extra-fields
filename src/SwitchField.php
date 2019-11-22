<?php

namespace MaximeRainville\ExtraFields;

use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FormField;

class SwitchField extends CheckboxField
{

    protected $fieldHolderTemplate = FormField::class . '_holder';

    protected $schemaComponent = 'SwitchField';

    public function Type()
    {
        return 'entwine-switchfield switchfield';
    }

}

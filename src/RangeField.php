<?php

namespace MaximeRainville\ExtraFields;

use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FormField;
use SilverStripe\Forms\NumericField;

class RangeField extends NumericField
{

//    protected $fieldHolderTemplate = FormField::class . '_holder';

    protected $schemaComponent = 'RangeField';

    public function Type()
    {
        return 'entwine-rangefield rangefield';
    }

    public function getSchemaDataDefaults()
    {
        $defaults = parent::getSchemaDataDefaults();

        return array_merge($defaults, [
            'min' => 0,
            'max' => 100,
            'step' => 1
        ]);
    }

    private function setter($attr, $value): self
    {
        $this->setAttribute($attr, $value);
        $this->setSchemaData([$attr => $value]);
        return $this;
    }

    public function setMin($value): self
    {
        return $this->setter('min', $value);
    }

    public function getMin()
    {
        $this->getAttribute('min');
    }

    public function setMax($value): self
    {
        return $this->setter('max', $value);
    }

    public function getMax()
    {
        $this->getAttribute('max');
    }

    public function setStep($value): self
    {
        return $this->setter('step', $value);
    }

    public function getStep()
    {
        $this->getAttribute('step');
    }
}

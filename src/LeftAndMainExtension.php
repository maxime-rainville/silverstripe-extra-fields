<?php

namespace MaximeRainville\ExtraFields;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class LeftAndMainExtension extends Extension
{

    public function init()
    {
        Requirements::add_i18n_javascript('maximerainville/silverstripe-extra-field:client/lang', false, true);
        Requirements::javascript('maximerainville/silverstripe-extra-field:client/dist/js/bundle.js');
        Requirements::css('maximerainville/silverstripe-extra-field:client/dist/styles/bundle.css');
    }

}

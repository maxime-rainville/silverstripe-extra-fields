/* global window */
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { schemaMerge } from 'lib/schemaFieldValues';
import { loadComponent } from 'lib/Injector';

declare global {
  interface JQueryStatic {
    entwine: (
      namespace: string,
      callback: (jquery: JQueryStatic) => any)
      => any
  }

  interface JQuery {
    entwine: (config: any) => any
  }
}

/**
 * Shiv for inserting react UploadField into entwine forms
 */
jQuery.entwine('ss', ($: JQueryStatic) => {
  /**
   * See boot/index.js for `.react-boot` bootstrap
   */
  $('.js-injector-boot input.entwine-switchfield').entwine({
    Component: null,
    props: null,

    getContainer() {
      let container = this.siblings('.switchfield-holder')[0];
      if (!container) {
        const newContainer = $('<div class="switchfield-holder"></div>');
        this.before(newContainer);

        container = newContainer[0];
      }

      return container;
    },

    // onunmatch() {
    //   this._super();
    //   // solves errors given by ReactDOM "no matched root found" error.
    //   ReactDOM.unmountComponentAtNode(this.siblings('.switchfield-holder')[0]);
    // },

    onmatch() {
      const cmsContent = this.closest('.cms-content').attr('id');
      const context = (cmsContent)
        ? { context: cmsContent }
        : {};

      const SwitchField = loadComponent('SwitchField', context);
      this.setComponent(SwitchField);

      this._super();
      this.hide();
      this.refresh();
    },

    refresh() {
      const props = this.getAttributes();
      const form = $(this).closest('form');
      const SwitchField = this.getComponent();

      ReactDOM.render(
        <SwitchField {...props} noHolder />,
        this.getContainer()
      );
    },

    /**
     * Find the selected node and get attributes associated to attach the data to the form
     *
     * @returns {Object}
     */
    getAttributes() {
      if ($(this).data('reactprop')) {
        return $(this).data('reactprop');
      }

      const name = $(this).attr('name');
      const value = $(this).attr('value');
      const checkstart = $(this).attr('checked') ? true : false;
      const disabled = $(this).attr('disabled') ? true : false;
      const readOnly = $(this).attr('readonly') ? true : false;

      $(this).data('reactprop', {name, value, checkstart, disabled, readOnly});
      $(this).removeAttr('name');
      return $(this).data('reactprop');
    },

    toggle() {
      const newValue = $(this).attr('checked') ? '' : 'checked';
      $(this).attr('checked', newValue);
      // this.refresh();
    }
  });
});

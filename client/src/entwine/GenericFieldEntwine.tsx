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

const reactpropAttr = 'reactprop';

const GenericFieldEntwine = (componentName: string) => {

  const cssFieldname = componentName.toLowerCase();

  /**
   * Shiv for inserting react UploadField into entwine forms
   */
  jQuery.entwine('ss', ($: JQueryStatic) => {
    /**
     * See boot/index.js for `.react-boot` bootstrap
     */
    $(`.js-injector-boot input.entwine-${cssFieldname}`).entwine({
      Component: null,
      // props: null,

      getContainer() {
        let container = this.siblings(`.${cssFieldname}-holder`)[0];
        if (!container) {
          const newContainer = $(`<div class="${cssFieldname}-holder"></div>`);
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

        const Component = loadComponent(componentName, context);
        this.setComponent(Component);

        this._super();
        this.hide();
        this.refresh();
      },

      refresh() {
        const props = this.getAttributes();
        const form = $(this).closest('form');
        const Component = this.getComponent();

        ReactDOM.render(
          <Component {...props} noHolder />,
          this.getContainer()
        );
      },

      /**
       * Find the selected node and get attributes associated to attach the data to the form
       *
       * @returns {Object}
       */
      getAttributes() {
        if ($(this).data(reactpropAttr)) {
          return $(this).data(reactpropAttr);
        }

        const name = $(this).attr('name');
        const value = $(this).attr('value');
        const disabled = $(this).attr('disabled') ? true : false;
        const readOnly = $(this).attr('readonly') ? true : false;
        const min = $(this).attr('min');
        const max = $(this).attr('max');

        $(this).data(reactpropAttr, {name, value, disabled, readOnly, min, max});
        $(this).removeAttr('name');
        return $(this).data(reactpropAttr);
      }

    });
  });
}

export default GenericFieldEntwine;

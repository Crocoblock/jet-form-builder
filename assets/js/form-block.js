!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=31)}({31:function(e,t){var n=wp.blocks.registerBlockType,o=wp.i18n.__,r=wp.blockEditor?wp.blockEditor:wp.editor,l=(r.ColorPalette,r.RichText,r.Editable,r.MediaUpload,r.BlockControls,r.InspectorControls),i=wp.components,a=i.PanelBody,u=(i.Button,i.ComboboxControl,i.SelectControl),s=i.TextControl,c=i.ToggleControl,m=wp.serverSideRender,p=(wp.element.useState,!!window.jetFormBuilderBlocks&&window.jetFormBuilderBlocks[0]);n(p.blockName,{title:p.title,category:"layout",icon:wp.element.createElement("span",{dangerouslySetInnerHTML:{__html:p.icon}}),attributes:p.attributes,edit:function(e){var t=e.attributes,n=e.setAttributes,r=e.isSelected;this.name="jet-forms/form-block",this.keyControls=function(){return this.name+"-controls-edit"},this.keyGeneral=function(){return this.name+"-general-edit"};var i=window.JetFormData;return[r&&wp.element.createElement(l,{key:this.keyControls()},wp.element.createElement(a,{title:o("Form Settings"),key:this.keyGeneral()},wp.element.createElement(u,{key:"form_id",label:o("Choose Form"),labelposition:"top",value:t.form_id,onChange:function(e){n({form_id:Number(e)})},options:i.forms_list}),Boolean(t.form_id)&&wp.element.createElement(React.Fragment,null,wp.element.createElement(u,{label:"Fields Layout",value:t.fields_layout,options:i.fields_layout,onChange:function(e){n({fields_layout:e})}}),wp.element.createElement(s,{label:"Required Mark",value:t.required_mark,onChange:function(e){n({required_mark:e})}}),wp.element.createElement(u,{label:"Submit Type",value:t.submit_type,options:i.submit_type,onChange:function(e){n({submit_type:e})}}),wp.element.createElement(c,{key:"enable_progress",label:o("Enable form pages progress"),checked:t.enable_progress,onChange:function(e){n({enable_progress:Boolean(e)})}})))),wp.element.createElement(m,{block:p.blockName,attributes:t,httpMethod:"POST"})]},save:function(e){return null},supports:{html:!1}})}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ibG9jay5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9mb3JtLWJsb2NrLmpzIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==
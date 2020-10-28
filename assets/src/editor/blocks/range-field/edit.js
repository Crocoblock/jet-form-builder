import JetFormToolbar from '../controls/toolbar';
import JetFormGeneral from '../controls/general';
import JetFormAdvanced from '../controls/advanced';
import JetFieldPlaceholder from '../controls/placeholder';
import Tools from "../../tools/tools";

const block = 'jet-forms/range-field';

window.jetFormBuilderBlockCallbacks = window.jetFormBuilderBlockCallbacks || {};
window.jetFormBuilderBlockCallbacks[ block ] = window.jetFormBuilderBlockCallbacks[ block ] || {};

const { __ } = wp.i18n;

const {
    ColorPalette,
    RichText,
    Editable,
    MediaUpload,
    ServerSideRender,
    BlockControls,
    InspectorControls,
} = wp.blockEditor;

const {
    PanelColor,
    IconButton,
    TextControl,
    TextareaControl,
    SelectControl,
    ToggleControl,
    PanelBody,
    Button,
    RangeControl,
    CheckboxControl,
    Disabled,
    __experimentalNumberControl,
} = wp.components;

let { NumberControl } = wp.components;

if ( typeof NumberControl === 'undefined' ) {
    NumberControl = __experimentalNumberControl;
}



const keyControls = block + '-controls-edit';
const keyPlaceHolder = block + '-placeholder-edit';
const keyGeneral = block + '-general-edit';


window.jetFormBuilderBlockCallbacks[ block ].edit = class RangeEdit extends wp.element.Component {
    render() {
        const props      = this.props;
        const attributes = props.attributes;
        const hasToolbar = Boolean( window.jetFormBuilderControls.toolbar[ block ] && window.jetFormBuilderControls.toolbar[ block ].length );

        return [
            hasToolbar && (
                <BlockControls key={ keyControls + '-block' }>
                    <JetFormToolbar
                        values={ attributes }
                        controls={ window.jetFormBuilderControls.toolbar[ block ] }
                        onChange={ ( newValues ) => {
                            props.setAttributes( newValues );
                        }}
                    />
                </BlockControls>
            ),
            props.isSelected && (
                <InspectorControls
                    key={ keyControls }
                >
                    { window.jetFormBuilderControls.general[ block ] && window.jetFormBuilderControls.general[ block ].length && <JetFormGeneral
                        key={ keyGeneral }
                        values={ attributes }
                        controls={ window.jetFormBuilderControls.general[ block ] }
                        onChange={ ( newValues ) => {
                            props.setAttributes( newValues );
                        }}
                    /> }
                    <PanelBody
                        title={ __( 'Field Settings' ) }
                    >
                        <NumberControl
                            label={ __( 'Min Value' ) }
                            labelPosition='top'
                            key='field__min_value'
                            value={ attributes.field__min_value }
                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__min_value: parseInt(newValue) } );
                            } }
                        />
                        <NumberControl
                            label={ __( 'Max Value' ) }
                            labelPosition='top'
                            key='field__max_value'
                            value={ attributes.field__max_value }
                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__max_value: parseInt(newValue) } );
                            } }
                        />
                        <NumberControl
                            label={ __( 'Step' ) }
                            labelPosition='top'
                            key='field__step'
                            value={ attributes.field__step }
                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__step: parseInt(newValue) } );
                            } }
                        />
                        <TextControl
                            key='field__prefix'
                            label={ __( 'Value prefix' ) }
                            value={ attributes.field__prefix }
                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__prefix: newValue } );
                            } }
                        />
                        <TextControl
                            key='field__suffix'
                            label={ __( 'Value suffix' ) }
                            value={ attributes.field__suffix }
                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__suffix: newValue } );
                            } }
                        />

                    </PanelBody>
                    { window.jetFormBuilderControls.advanced[ block ] && window.jetFormBuilderControls.advanced[ block ].length && <JetFormAdvanced
                        values={ attributes }
                        controls={ window.jetFormBuilderControls.advanced[ block ] }
                        onChange={ ( newValues ) => {
                            props.setAttributes( newValues );
                        }}
                    /> }
                </InspectorControls>
            ),
            <JetFieldPlaceholder
                key={ keyPlaceHolder }
                title={ 'Range Field' }
                subtitle={ [ attributes.label, attributes.name ] }
                isRequired={ attributes.required }
            />
        ];
    }
}
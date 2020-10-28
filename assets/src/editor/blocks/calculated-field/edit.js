import JetFormToolbar from '../controls/toolbar';
import JetFormGeneral from '../controls/general';
import JetFormAdvanced from '../controls/advanced';
import JetFieldPlaceholder from '../controls/placeholder';
import Tools from "../../tools/tools";

const block = 'jet-forms/calculated-field';

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

const NumberControl = __experimentalNumberControl;

const keyControls = block + '-controls-edit';
const keyPlaceHolder = block + '-placeholder-edit';
const keyGeneral = block + '-general-edit';

window.jetFormBuilderBlockCallbacks[ block ].edit = class CalculatedEdit extends wp.element.Component {
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
                        <TextareaControl
                            label={ __( 'Calculation Formula' ) }
                            value={ attributes.field__calc_formula }

                            /* TODO: Need to add line break between fields */
                            help={ Tools.getAvailableFieldsString() }

                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__calc_formula: newValue } );
                            } }
                        />
                        <NumberControl
                            label={ __( 'Decimal Places Number' ) }
                            labelPosition='top'
                            key='field__decimal_place_number'
                            value={ attributes.field__decimal_place_number }
                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__decimal_place_number: parseInt( newValue ) } );
                            } }
                        />
                        <TextControl
                            key='field__calc_prefix'
                            label={ __( 'Calculated Value Prefix' ) }
                            value={ attributes.field__calc_prefix }
                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__calc_prefix: newValue } );
                            } }
                        />
                        <TextControl
                            key='field__calc_suffix'
                            label={ __( 'Calculated Value Suffix' ) }
                            value={ attributes.field__calc_suffix }
                            onChange={ ( newValue ) => {
                                props.setAttributes( { field__calc_suffix: newValue } );
                            } }
                        />
                        <ToggleControl
                            key={ 'field__is_hidden' }
                            label={ __( 'Hidden' ) }
                            checked={ attributes.field__is_hidden }
                            help={ Tools.getHelpMessage(
                                window.jetFormCalculatedFieldData,
                                'field__is_hidden'
                            ) }
                            onChange={ newVal => {
                                props.setAttributes( {
                                    field__is_hidden: Boolean(newVal),
                                } );
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
                title={ 'Calculated Field' }
                subtitle={ [ attributes.label, attributes.name ] }
                isRequired={ attributes.required }
            />
        ];
    }
}
import JetFormToolbar from '../controls/toolbar';
import JetFormGeneral from '../controls/general';
import JetFormAdvanced from '../controls/advanced';

import FromTermsFields from "../../components/base-select-check-radio/from-terms-fields";
import FromPostsFields from "../../components/base-select-check-radio/from-posts-fields";
import FromGeneratorsFields from "../../components/base-select-check-radio/from-generators-fields";
import FromManualFields from "../../components/base-select-check-radio/from-manual-fields";
import Tools from "../../helpers/tools";
import { SelectRadioCheckPlaceholder } from "../../components/select-radio-check-placeholder";

const block = 'jet-forms/select-field';

const localizeData = window.JetFormSelectFieldData;

const { __ } = wp.i18n;

const {
	ColorPalette,
	RichText,
	Editable,
	MediaUpload,
	ServerSideRender,
	BlockControls,
	InspectorControls,
} = wp.blockEditor ? wp.blockEditor : wp.editor;

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
} = wp.components;

const keyControls = block + '-controls-edit';
const keyPlaceHolder = block + '-placeholder-edit';
const keyGeneral = block + '-general-edit';

export default class SelectEdit extends wp.element.Component {

	constructor( props ) {
		super( props );

		this.data = window.JetFormSelectFieldData;
	}

	render() {
		const props = this.props;
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
						} }
					/>
				</BlockControls>
			),
			props.isSelected && (
				<InspectorControls
					key={ keyControls }
				>
					{ window.jetFormBuilderControls.general[ block ] && window.jetFormBuilderControls.general[ block ].length &&
					<JetFormGeneral
						key={ keyGeneral }
						values={ attributes }
						controls={ window.jetFormBuilderControls.general[ block ] }
						onChange={ ( newValues ) => {
							props.setAttributes( newValues );
						} }
					/> }

					{ window.jetFormBuilderControls.advanced[ block ] && window.jetFormBuilderControls.advanced[ block ].length &&
					<JetFormAdvanced
						values={ attributes }
						controls={ window.jetFormBuilderControls.advanced[ block ] }
						onChange={ ( newValues ) => {
							props.setAttributes( newValues );
						} }
					/> }
				</InspectorControls>
			),
			<React.Fragment>
				{ props.isSelected && <div className='inside-block-options'>
					<SelectControl
						key='field_options_from'
						label={ __( 'Fill Options From' ) }
						value={ attributes.field_options_from }
						onChange={ ( newValue ) => {
							props.setAttributes( { field_options_from: newValue } );
						} }
						options={ localizeData.options_from }
					/>
					{ 'manual_input' === attributes.field_options_from && <FromManualFields
						key='from_manual'
						attributes={ attributes }
						parentProps={ props }
					/> }
					{ 'posts' === attributes.field_options_from && <FromPostsFields
						key='from_posts'
						attributes={ attributes }
						parentProps={ props }
					/> }
					{ 'terms' === attributes.field_options_from && <FromTermsFields
						key='from_terms'
						attributes={ attributes }
						parentProps={ props }
						localizeData={ this.data }
					/> }

					{ 'meta_field' === attributes.field_options_from && <TextControl
						key='field_options_key'
						label={ __( 'Meta field to get value from' ) }
						value={ attributes.field_options_key }
						onChange={ ( newValue ) => {
							props.setAttributes( { field_options_key: newValue } );
						} }
					/> }

					{ 'generate' === attributes.field_options_from && <FromGeneratorsFields
						key='from_generator'
						attributes={ attributes }
						parentProps={ props }
					/> }

					<ToggleControl
						key='switch_on_change'
						label={ __( 'Switch page on change' ) }
						checked={ attributes.switch_on_change }
						help={ Tools.getHelpMessage( this.data, 'switch_on_change' ) }
						onChange={ ( newValue ) => {
							props.setAttributes( { switch_on_change: Boolean( newValue ) } );
						} }
					/>
				</div> }
				<SelectRadioCheckPlaceholder
					blockName={ block }
					scriptData={ this.data }
					source={ attributes }
				/>
			</React.Fragment>
		];
	}
}
import JetFormToolbar from '../controls/toolbar';
import JetFormGeneral from '../controls/general';
import JetFormAdvanced from '../controls/advanced';
import JetFieldPlaceholder from '../controls/placeholder';

import FromTermsFields from "../../components/base-select-check-radio/from-terms-fields";
import FromPostsFields from "../../components/base-select-check-radio/from-posts-fields";
import FromGeneratorsFields from "../../components/base-select-check-radio/from-generators-fields";
import FromManualFields from "../../components/base-select-check-radio/from-manual-fields";
import { SelectRadioCheckPlaceholder } from "../../components/select-radio-check-placeholder";

const block = 'jet-forms/radio-field';

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
} = wp.blockEditor ? wp.blockEditor : wp.editor;

const {
	PanelColor,
	IconButton,
	TextControl,
	TextareaControl,
	SelectControl,
	ToggleControl,
	PanelBody,
	RadioControl,
	Button,
	RangeControl,
	CheckboxControl,
	Disabled,
} = wp.components;

const uniqKey = suffix => `${ block }-${ suffix }`;

window.jetFormBuilderBlockCallbacks[ block ].edit = class RadioEdit extends wp.element.Component {

	constructor( props ) {
		super( props );

		this.data = window.JetFormRadioFieldData;
	}

	render() {
		const props = this.props;
		const attributes = props.attributes;
		const hasToolbar = Boolean( window.jetFormBuilderControls.toolbar[ block ] && window.jetFormBuilderControls.toolbar[ block ].length );

		return [
			hasToolbar && (
				<BlockControls key={ uniqKey( 'BlockControls' ) }>
					<JetFormToolbar
						key={ uniqKey( 'JetFormToolbar' ) }
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
					key={ uniqKey( 'InspectorControls' ) }
				>
					{ window.jetFormBuilderControls.general[ block ] && window.jetFormBuilderControls.general[ block ].length &&
					<JetFormGeneral
						key={ uniqKey( 'JetFormGeneral' ) }
						values={ attributes }
						controls={ window.jetFormBuilderControls.general[ block ] }
						onChange={ ( newValues ) => {
							props.setAttributes( newValues );
						} }
					/> }

					{ window.jetFormBuilderControls.advanced[ block ] && window.jetFormBuilderControls.advanced[ block ].length &&
					<JetFormAdvanced
						key={ uniqKey( 'JetFormAdvanced' ) }
						values={ attributes }
						controls={ window.jetFormBuilderControls.advanced[ block ] }
						onChange={ ( newValues ) => {
							props.setAttributes( newValues );
						} }
					/> }
				</InspectorControls>
			),
			<React.Fragment key={ uniqKey( 'Fragment' ) }>
				{ props.isSelected && <div className='inside-block-options'>
					<SelectControl
						key='field_options_from'
						label='Fill Options From'
						labelPosition='top'
						value={ attributes.field_options_from }
						onChange={ ( newValue ) => {
							props.setAttributes( { field_options_from: newValue } );
						} }
						options={ this.data.options_from }
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
						localizeData={ this.data }
					/> }
					{ 'terms' === attributes.field_options_from && <FromTermsFields
						key='from_terms'
						attributes={ attributes }
						parentProps={ props }
						localizeData={ this.data }
					/> }

					{ 'meta_field' === attributes.field_options_from && <TextControl
						key='field_options_key'
						label='Meta field to get value from'
						value={ attributes.field_options_key }
						onChange={ ( newValue ) => {
							props.setAttributes( { field_options_key: newValue } );
						} }
					/> }

					{ 'generate' === attributes.field_options_from && <FromGeneratorsFields
						key='from_generators'
						attributes={ attributes }
						parentProps={ props }
						localizeData={ this.data }
					/> }
				</div> }

				<SelectRadioCheckPlaceholder
					key={ uniqKey( 'SelectRadioCheckPlaceholder' ) }
					blockName={ block }
					scriptData={ this.data }
					source={ attributes }
				/>
			</React.Fragment>
		];
	}
}
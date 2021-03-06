import JetFormToolbar from '../controls/toolbar';
import JetFormGeneral from '../controls/general';
import JetFormAdvanced from '../controls/advanced';
import Tools from "../../helpers/tools";
import FieldWrapper from '../../components/field-wrapper';

const block = 'jet-forms/datetime-field';

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
	Button,
	RangeControl,
	CheckboxControl,
	DateTimePicker,
	Disabled,
} = wp.components;

const uniqKey = suffix => `${ block }-${ suffix }`;

window.jetFormBuilderBlockCallbacks[ block ].edit = class DateTimeEdit extends wp.element.Component {
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
					<PanelBody
						title={ __( 'Field Settings' ) }
					>
						<ToggleControl
							key='is_timestamp'
							label={ __( 'Is Timestamp' ) }
							checked={ attributes.is_timestamp }
							help={ Tools.getHelpMessage( window.jetFormDatetimeFieldData, 'is_timestamp' ) }
							onChange={ ( newValue ) => {
								props.setAttributes( { is_timestamp: Boolean( newValue ) } );
							} }
						/>
					</PanelBody>
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
			<FieldWrapper
				key={ uniqKey( 'FieldWrapper' ) }
				block={ block }
				attributes={ attributes }
			>
				<TextControl
					onChange={ () => {} }
					key={ `place_holder_block_${ block }` }
					placeholder={ 'Input type="datetime-local"' }
				/>
			</FieldWrapper>
		];
	}
}
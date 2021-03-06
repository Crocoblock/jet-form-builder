import JetFormToolbar from '../controls/toolbar';
import JetFormGeneral from '../controls/general';
import JetFormAdvanced from '../controls/advanced';
import JetFieldPlaceholder from '../controls/placeholder';
import Tools from "../../helpers/tools";
import FieldWrapper from '../../components/field-wrapper';

const block = 'jet-forms/media-field';

window.jetFormBuilderBlockCallbacks = window.jetFormBuilderBlockCallbacks || {};
window.jetFormBuilderBlockCallbacks[ block ] = window.jetFormBuilderBlockCallbacks[ block ] || {};

const { __ } = wp.i18n;

const {
	BlockControls,
	InspectorControls,
} = wp.blockEditor ? wp.blockEditor : wp.editor;

const {
	SelectControl,
	ToggleControl,
	PanelBody,
	__experimentalNumberControl,
	__experimentalInputControl,
} = wp.components;

let { NumberControl, InputControl } = wp.components;

if ( typeof NumberControl === 'undefined' ) {
	NumberControl = __experimentalNumberControl;
}

if ( typeof InputControl === 'undefined' ) {
	InputControl = __experimentalInputControl;
}

const localizeData = window.jetFormMediaFieldData;
const uniqKey = suffix => `${ block }-${ suffix }`;

window.jetFormBuilderBlockCallbacks[ block ].edit = class MediaEdit extends wp.element.Component {
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
						className='jet-form-media-fields'
						key={ uniqKey( 'PanelBody' ) }
					>
						<SelectControl
							key='allowed_user_cap'
							label={ __( 'User access' ) }
							labelPosition='top'
							value={ attributes.allowed_user_cap }
							onChange={ ( newValue ) => {
								props.setAttributes( { allowed_user_cap: newValue } );
							} }
							options={ localizeData.user_access }
						/>
						{ 'any_user' !== attributes.allowed_user_cap && <ToggleControl
							key='insert_attachment'
							label={ __( 'Insert attachment' ) }
							checked={ attributes.insert_attachment }
							help={ Tools.getHelpMessage( window.jetFormMediaFieldData, 'insert_attachment' ) }
							onChange={ ( newValue ) => {
								props.setAttributes( { insert_attachment: Boolean( newValue ) } );
							} }
						/> }
						{ attributes.insert_attachment && <SelectControl
							key='value_format'
							label={ __( 'Field value' ) }
							labelPosition='top'
							value={ attributes.value_format }
							onChange={ ( newValue ) => {
								props.setAttributes( { value_format: newValue } );
							} }
							options={ localizeData.value_format }
						/> }
						<NumberControl
							key='max_files'
							label={ __( 'Maximum allowed files to upload' ) }
							labelPosition='top'
							help={ Tools.getHelpMessage( window.jetFormMediaFieldData, 'max_files' ) }
							value={ attributes.max_files }
							onChange={ ( newValue ) => {
								props.setAttributes( { max_files: parseInt( newValue ) } );
							} }
						/>
						<NumberControl
							label={ __( 'Maximum size in Mb' ) }
							labelPosition='top'
							key='max_size'
							help={ Tools.getHelpMessage( window.jetFormMediaFieldData, 'max_size' ) }
							value={ attributes.max_size }
							onChange={ ( newValue ) => {
								props.setAttributes( { max_size: parseInt( newValue ) } );
							} }
						/>
						<SelectControl
							multiple
							className='field-mime-types'
							key='allowed_mimes'
							label={ __( 'Allow MIME types' ) }
							labelPosition='top'
							help={ Tools.getHelpMessage( window.jetFormMediaFieldData, 'allowed_mimes' ) }
							value={ attributes.allowed_mimes }
							onChange={ ( newValue ) => {
								props.setAttributes( { allowed_mimes: newValue } );
							} }
							options={ localizeData.mime_types }
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
				block={ block }
				attributes={ attributes }
				key={ uniqKey( 'FieldWrapper' ) }
			>
				<InputControl
					key={ `place_holder_block_${ block }` }
					type={ 'file' }
					disabled={ true }
				/>
			</FieldWrapper>
		];
	}
}
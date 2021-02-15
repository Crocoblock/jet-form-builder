import JetFormToolbar from '../controls/toolbar';
import JetFormGeneral from '../controls/general';
import JetFormAdvanced from '../controls/advanced';
import Tools from "../../helpers/tools";
import FieldWrapper from "../../components/field-wrapper";

const block = 'jet-forms/calculated-field';

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
	Popover,
	RangeControl,
	CheckboxControl,
	Disabled,
	ToolbarGroup,
	ToolbarItem,
	__experimentalNumberControl,
} = wp.components;

const NumberControl = __experimentalNumberControl;

const keyControls = block + '-controls-edit';
const keyPlaceHolder = block + '-placeholder-edit';
const keyGeneral = block + '-general-edit';

class CalculatedEdit extends wp.element.Component {

	constructor( props ) {
		super( props );

		this.state = { showMacrosPopover: false };
	}

	render() {
		const props = this.props;
		const attributes = props.attributes;
		const hasToolbar = Boolean( window.jetFormBuilderControls.toolbar[ block ] && window.jetFormBuilderControls.toolbar[ block ].length );

		const formFields = Tools.getAvailableFields( [block] );

		const insertMacros = ( macros ) => {
			const formula = attributes.calc_formula || '';
			props.setAttributes( { calc_formula: formula + '%FIELD::' + macros + '%' } );
		}

		return [
			<BlockControls key={ keyControls + '-block' }>
				<ToolbarGroup>
					<Button
						isTertiary
						isSmall
						icon={ this.state.showMacrosPopover ? 'no-alt' : 'admin-tools' }
						onClick={ () => {
							this.setState( { showMacrosPopover: ! this.state.showMacrosPopover } );
						} }
					/>
					{ this.state.showMacrosPopover && (
						<Popover
							position={ 'bottom left' }
						>
							{ formFields.length && <PanelBody title={ 'Form Fields' }>
								{ formFields.map( field => {
									return <div key={ 'field_' + field }>
										<Button
											isLink
											onClick={ () => {
												insertMacros( field )
											} }
										>{ '%FIELD::' + field + '%' }</Button>
									</div>;
								} ) }
							</PanelBody> }
						</Popover>
					) }
				</ToolbarGroup>
			</BlockControls>,
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
					<PanelBody
						title={ __( 'Field Settings' ) }
					>
						<div className="jet-form-editor__row-notice">
							{ __( 'Set math formula to calculate field value.', 'jet-form-builder' ) }<br/>
							{ __( 'For example:', 'jet-form-builder' ) }<br/><br/>
							%FIELD::quantity%*%META::price%<br/><br/>
							{ __( 'Where:', 'jet-form-builder' ) }<br/>
							-
							{ __( '%FIELD::quantity% - macros for form field value. "quantity" - is a field name to get value from', 'jet-form-builder' ) }<br/>
							-
							{ __( '%META::price% - macros for current post meta value. "price" - is a meta key to get value from', 'jet-form-builder' ) }<br/><br/>
						</div>

						<NumberControl
							label={ __( 'Decimal Places Number' ) }
							labelPosition='top'
							key='precision'
							value={ attributes.precision }
							onChange={ ( newValue ) => {
								props.setAttributes( { precision: parseInt( newValue ) } );
							} }
						/>
						<TextControl
							key='calc_prefix'
							label={ __( 'Calculated Value Prefix' ) }
							value={ attributes.calc_prefix }
							help={ __( 'For space before or after text use: &nbsp;' ) }
							onChange={ ( newValue ) => {
								props.setAttributes( { calc_prefix: newValue } );
							} }
						/>
						<TextControl
							key='calc_suffix'
							label={ __( 'Calculated Value Suffix' ) }
							value={ attributes.calc_suffix }
							help={ __( 'For space before or after text use: &nbsp;' ) }
							onChange={ ( newValue ) => {
								props.setAttributes( { calc_suffix: newValue } );
							} }
						/>
						<ToggleControl
							key={ 'calc_hidden' }
							label={ __( 'Hidden' ) }
							checked={ attributes.calc_hidden }
							help={ Tools.getHelpMessage( this.data, 'calc_hidden' ) }
							onChange={ newVal => {
								props.setAttributes( {
									calc_hidden: Boolean( newVal ),
								} );
							} }
						/>

					</PanelBody>
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
			<FieldWrapper
				block={ block }
				attributes={ attributes }
				valueIfEmptyLabel={ 'Calculated Field' }
			>
				{ props.isSelected && <TextareaControl
					key="calc_formula"
					value={ attributes.calc_formula }
					onChange={ ( newValue ) => {
						props.setAttributes( { calc_formula: newValue } );
					} }
				/> }
				<div className={ 'jet-form-builder__calculated-field' }>
					<div className={ 'calc-prefix' }>{ attributes.calc_prefix }</div>
					<div className={ 'calc-formula' }>{ attributes.calc_formula }</div>
					<div className={ 'calc-suffix' }>{ attributes.calc_suffix }</div>
				</div>
			</FieldWrapper>
		];
	}
}

window.jetFormBuilderBlockCallbacks[ block ].edit = CalculatedEdit;
import { useMetaWithEffect } from "../helpers/hooks-helper";

function ArgsMeta() {

	const {
		TextControl,
		SelectControl,
		ToggleControl,
	} = wp.components;

	const {
		registerPlugin
	} = wp.plugins;

	const {
		PluginDocumentSettingPanel
	} = wp.editPost;

	const {
		useSelect,
		useDispatch
	} = wp.data;

	const {
		useState,
		useEffect
	} = wp.element;

	const DocumentSettingPanelArgs = () => {
		const [ args, setArgs ] = useMetaWithEffect( '_jf_args', '{}' );

		return (
			<PluginDocumentSettingPanel
				name={ 'jf-args' }
				title={ 'Form Settings' }
			>
				<SelectControl
					label={ 'Fields Layout' }
					value={ args.fields_layout }
					options={ [
						{ value: '', label: '--' },
						{ value: 'column', label: 'Column' },
						{ value: 'row', label: 'Row' }
					] }
					onChange={ newVal => {
						setArgs( ( prevArgs ) => ( {
							...prevArgs,
							fields_layout: newVal
						} ) );
					} }
				/>
				<TextControl
					label={ 'Required Mark' }
					value={ args.required_mark }
					onChange={ newVal => {
						setArgs( ( prevArgs ) => ( {
							...prevArgs,
							required_mark: newVal
						} ) );
					} }
				/>
				<SelectControl
					label={ 'Submit Type' }
					value={ args.submit_type }
					options={ [
						{ value: '', label: '--' },
						{ value: 'reload', label: 'Page Reload' },
						{ value: 'ajax', label: 'AJAX' }
					] }
					onChange={ newVal => {
						setArgs( ( prevArgs ) => ( {
							...prevArgs,
							submit_type: newVal
						} ) );
					} }
				/>

				<ToggleControl
					key={ 'enable_progress' }
					label={ 'Enable form pages progress' }
					checked={ args.enable_progress }
					onChange={ newVal => {
						setArgs( prev => ( {
							...prev,
							enable_progress: Boolean( newVal )
						} ) );
					} }
				/>
			</PluginDocumentSettingPanel>
		)
	};

	registerPlugin( 'jf-args-panel', {
		render: DocumentSettingPanelArgs,
		icon: null,
	} );
}

export default ArgsMeta;

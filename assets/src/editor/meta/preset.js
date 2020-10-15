import JetFormPresetEditor from '../blocks/controls/preset-editor';

function PresetMeta() {

	const {
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

	const DocumentSettingPanel = () => {

		const meta = useSelect( ( select ) => {
			return select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
		} );

		const {
			editPost
		} = useDispatch( 'core/editor' );

		const [ args, setArgs ] = useState( JSON.parse( meta._jf_preset ) );

		useEffect( () => {

			editPost({
				meta: ( {
					...meta,
					_jf_preset: JSON.stringify( args )
				} )
			});

		} );

		const formFields = []
		const blocksRecursiveIterator = ( blocks ) => {

			blocks = blocks || wp.data.select( 'core/block-editor' ).getBlocks();

			blocks.map( ( block ) => {

				if ( block.name.includes( 'jet-forms/' ) && block.attributes.name ) {
					formFields.push( block.attributes.name );
				}

				if ( block.innerBlocks.length ) {
					blocksRecursiveIterator( block.innerBlocks );
				}

			} );

		};

		blocksRecursiveIterator();

		return (
			<PluginDocumentSettingPanel
				name={ 'jf-preset' }
				title={ 'Preset Settings' }
			>
				<ToggleControl
					key={ 'enable_preset' }
					label={ 'Enable' }
					checked={ args.enabled }
					help={ 'Check this to enable global form preset' }
					onChange={ newVal => {
						setArgs( ( prevArgs ) => ( {
							...prevArgs,
							enabled: newVal
						} ) );
					} }
				/>
				{ args.enabled && <JetFormPresetEditor
					value={ args }
					onChange={ newVal => {
						setArgs( ( prevArgs ) => ( {
							...prevArgs,
							...newVal,
							enabled: prevArgs.enabled
						} ) );
					} }
					decode={ false }
					encode={ false }
					availableFields={ formFields }
				/> }
			</PluginDocumentSettingPanel>
		)
	};

	registerPlugin( 'jf-preset-panel', {
		render: DocumentSettingPanel,
		icon: null,
	} );
}

export default PresetMeta;
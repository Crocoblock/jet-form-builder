import WysiwygEdit from "./edit";
import metadata from "./block.json";

const { __ } = wp.i18n;

const { name, icon = '' } = metadata;

/**
 * Available items for `useEditProps`:
 *  - uniqKey
 *  - formFields
 *  - blockName
 *  - attrHelp
 */
const settings = {
	title: __( 'Wysiwyg Field' ),
	icon: <span dangerouslySetInnerHTML={ { __html: icon } }></span>,
	edit: WysiwygEdit,
	useEditProps: [ 'uniqKey', 'attrHelp' ],
};

export {
	metadata,
	name,
	settings
};
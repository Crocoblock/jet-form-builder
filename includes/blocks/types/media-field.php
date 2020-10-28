<?php
namespace Jet_Form_Builder\Blocks\Types;

use Jet_Form_Builder\Blocks\Render\Media_Field_Render;
use Jet_Form_Builder\Classes\Tools;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define Text field block class
 */
class Media_Field extends Base {

	/**
	 * Returns block title
	 *
	 * @return [type] [description]
	 */
	public function get_title() {
		return 'Media Field';
	}

	/**
	 * Returns block name
	 *
	 * @return [type] [description]
	 */
	public function get_name() {
		return 'media-field';
	}

	/**
	 * Returns icon class name
	 *
	 * @return [type] [description]
	 */
	public function get_icon() {
		return '<SVG width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm.5 16c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V9.8l4.7-5.3H19c.3 0 .5.2.5.5v14zm-6-9.5L16 12l-2.5 2.8 1.1 1L18 12l-3.5-3.5-1 1zm-3 0l-1-1L6 12l3.5 3.8 1.1-1L8 12l2.5-2.5z"></Path></SVG>';
	}

	/**
	 * Returns current block render instatnce
	 *
	 * @return [type] [description]
	 */
	public function get_block_renderer( $attributes = array() ) {
		return new Media_Field_Render( $attributes );
	}

    public function block_data($editor, $handle)
    {
        wp_localize_script( $handle, 'jetFormMediaFieldData', array(
            'user_access' => array(
                array(
                  'value' => 'all',
                  'label' => __( 'Any registered user', 'jet-form-builder' ),
                ),
                array(
                    'value' => 'upload_files',
                    'label' => __( 'Any user, who allowed to upload files', 'jet-form-builder' ),
                ),
                array(
                    'value' => 'edit_posts',
                    'label' => __( 'Any user, who allowed to edit posts', 'jet-form-builder' ),
                ),
            ),
            'mime_types' => Tools::get_allowed_mimes_list_for_js(),

            'help_messages' => array(
                'field__is_insert_attachment' => __(
                    'If checked new attachment will be inserted for uploaded file',
                    'jet-form-builder'
                ),
                'field__max_allowed_to_upload' => __(
                    'If not set allow to upload 1 file',
                    'jet-form-builder'
                ),
                'field__max_size_mb' => __(
                    'Mb',
                    'jet-form-builder'
                ),
                'field__mime_types' => __(
                    'If no MIME type selected will allow all types.
                    Hold down the Ctrl (windows) / Command (Mac) button to select multiple options.',
                    'jet-form-builder'
                )
            ),
        ) );
    }

    /**
	 * Return attributes array
	 *
	 * @return array
	 */
	public function get_attributes() {
        return array(
            'field__user_access' => array(
                'type' => 'string',
                'default' => 'all'
            ),
            'field__is_insert_attachment' => array(
                'type' => 'boolean',
                'default' => false
            ),
            'field__max_allowed_to_upload' => array(
                'type' => 'number',
                'default' => ''
            ),
            'field__max_size_mb' => array(
                'type' => 'number',
                'default' => ''
            ),
            'field__mime_types' => array(
                'type' => 'array',
                'default' => array()
            ),
        );
	}

    /**
     * Returns global attributes list
     * P.S. here was removed `placeholder` & `default`
     *
     * @return [type] [description]
     */
    public function get_global_attributes() {
        return array(
            'label' => array(
                'type'    => 'string',
                'default' => '',
                'general' => array(
                    'type'  => 'text',
                    'label' => __( 'Field Label', 'jet-form-builder' )
                ),
            ),
            'name' => array(
                'type' => 'string',
                'default' => '',
                'general' => array(
                    'type'  => 'text',
                    'label' => __( 'Field Name', 'jet-form-builder' )
                ),
            ),
            'desc' => array(
                'type' => 'string',
                'default' => '',
                'general' => array(
                    'type'  => 'text',
                    'label' => __( 'Field Description', 'jet-form-builder' )
                ),
            ),
            'required' => array(
                'type'    => 'boolean',
                'default' => false,
                'toolbar' => array(
                    'type'  => 'toggle',
                    'label' => __( 'Is Required', 'jet-form-builder' )
                ),
            ),
            'add_prev' => array(
                'type' => 'boolean',
                'default' => false,
                'advanced' => array(
                    'type'  => 'toggle',
                    'label' => __( 'Add Prev Page Button', 'jet-form-builder' )
                ),
            ),
            'prev_label' => array(
                'type' => 'string',
                'default' => '',
                'advanced' => array(
                    'type'      => 'text',
                    'label'     => __( 'Prev Page Button Label', 'jet-form-builder' ),
                    'condition' => 'add_prev'
                ),
            ),
            'visibility' => array(
                'type' => 'string',
                'default' => '',
                'advanced' => array(
                    'type'    => 'select',
                    'label'   => __( 'Field Visibility', 'jet-form-builder' ),
                    'options' => array(
                        array(
                            'value' => 'all',
                            'label' => __( 'For all', 'jet-form-builder' ),
                        ),
                        array(
                            'value' => 'logged_id',
                            'label' => __( 'Only for logged in users', 'jet-form-builder' ),
                        ),
                        array(
                            'value' => 'not_logged_in',
                            'label' => __( 'Only for NOT-logged in users', 'jet-form-builder' ),
                        ),
                    ),
                ),
            ),
            'class_name' => array(
                'type' => 'string',
                'default' => '',
                'advanced' => array(
                    'type'  => 'text',
                    'label' => __( 'CSS Class Name', 'jet-form-builder' )
                ),
            ),
        );
    }

}
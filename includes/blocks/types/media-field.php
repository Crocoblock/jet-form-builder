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
	 * Returns current block render instatnce
	 *
	 * @param null $wp_block
	 *
	 * @return string
	 */
	public function get_block_renderer( $wp_block = null ) {
		return ( new Media_Field_Render( $this ) )->render();
	}

	public function block_data( $editor, $handle ) {
		wp_localize_script( $handle, 'jetFormMediaFieldData', array(
			'user_access' => Tools::with_placeholder( array(
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
				array(
					'value' => 'any_user',
					'label' => __( 'Any user ( incl. Guest )', 'jet-form-builder' ),
				),
			) ),
			'mime_types'  => Tools::get_allowed_mimes_list_for_js(),

			'value_format' => Tools::with_placeholder( array(
				array(
					'value' => 'id',
					'label' => __( 'Attachment ID', 'jet-form-builder' )
				),
				array(
					'value' => 'url',
					'label' => __( 'Attachment URL', 'jet-form-builder' )
				),
				array(
					'value' => 'both',
					'label' => __( 'Array with attachment ID and URL', 'jet-form-builder' )
				),
			) ),

			'help_messages' => array(
				'insert_attachment' => __(
					'If checked new attachment will be inserted for uploaded file. Note: work only for logged-in users!',
					'jet-form-builder'
				),
				'max_files'         => __(
					'If not set allow to upload 1 file',
					'jet-form-builder'
				),
				'max_size'          => __(
					'Mb',
					'jet-form-builder'
				),
				'allowed_mimes'     => __(
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
			'allowed_user_cap'  => array(
				'type'    => 'string',
				'default' => ''
			),
			'insert_attachment' => array(
				'type'    => 'boolean',
				'default' => false
			),
			'value_format'      => array(
				'type'    => 'string',
				'default' => ''
			),
			'max_files'         => array(
				'type'    => 'number',
				'default' => ''
			),
			'max_size'          => array(
				'type'    => 'number',
				'default' => ''
			),
			'allowed_mimes'     => array(
				'type'    => 'array',
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
			'label'      => array(
				'type'    => 'string',
				'default' => '',
				'general' => array(
					'type'  => 'text',
					'label' => __( 'Field Label', 'jet-form-builder' )
				),
			),
			'name'       => array(
				'type'    => 'string',
				'default' => 'field_name',
				'general' => $this->general_field_name_params(),
			),
			'desc'       => array(
				'type'    => 'string',
				'default' => '',
				'general' => array(
					'type'  => 'text',
					'label' => __( 'Field Description', 'jet-form-builder' )
				),
			),
			'required'   => array(
				'type'    => 'boolean',
				'default' => false,
				'toolbar' => array(
					'type'  => 'toggle',
					'label' => __( 'Is Required', 'jet-form-builder' )
				),
			),
			'add_prev'   => array(
				'type'     => 'boolean',
				'default'  => false,
				'advanced' => array(
					'type'  => 'toggle',
					'label' => __( 'Add Prev Page Button', 'jet-form-builder' )
				),
			),
			'prev_label' => array(
				'type'     => 'string',
				'default'  => '',
				'advanced' => array(
					'type'      => 'text',
					'label'     => __( 'Prev Page Button Label', 'jet-form-builder' ),
					'condition' => 'add_prev'
				),
			),
			'visibility' => array(
				'type'     => 'string',
				'default'  => '',
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
				'type'     => 'string',
				'default'  => '',
				'advanced' => array(
					'type'  => 'text',
					'label' => __( 'CSS Class Name', 'jet-form-builder' )
				),
			),
		);
	}

}

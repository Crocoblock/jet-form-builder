<?php

namespace Jet_Form_Builder\Actions\Types;

// If this file is called directly, abort.
use Jet_Form_Builder\Actions\Action_Handler;
use Jet_Form_Builder\Actions\Action_Localize;
use Jet_Form_Builder\Classes\Condition_Helper;
use Jet_Form_Builder\Classes\Messages_Helper_Trait;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define Base_Type class
 */
abstract class Base {

	use Messages_Helper_Trait;
	use Action_Localize;

	/**
	 * Stores the action settings
	 * from the form meta field
	 *
	 * @var array
	 */
	public $settings = array();

	/**
	 * Stores the action conditions
	 * from the form meta field
	 *
	 * @var array
	 */
	public $conditions = array();

	/**
	 * Stores the unique id of action
	 * @var integer
	 */
	public $_id;

	public function __construct() {
		$this->set_action_messages();
	}


	/**
	 * @param $request array - Form data
	 * @param $handler Action_Handler
	 *
	 * @return mixed
	 */
	abstract public function do_action( array $request, Action_Handler $handler );

	public function dependence() {
		return true;
	}

	public function condition( Action_Handler $handler ) {
		new Condition_Helper( $this, $handler );
	}


	public function messages() {
		return array();
	}

	public function set_action_messages() {

		$this->messages = apply_filters(
			'jet-form-builder/message-types/' . $this->get_id(),
			$this->messages()
		);
	}

	public function is_repeater_val( $value ) {
		if ( is_array( $value ) && ! empty( $value ) ) {
			return is_array( array_shift( $value ) );
		} else {
			return false;
		}
	}

	public function action_attributes() {
		return array();
	}


}

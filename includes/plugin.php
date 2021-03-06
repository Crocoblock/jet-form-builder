<?php

namespace Jet_Form_Builder;

// If this file is called directly, abort.
use Jet_Form_Builder\Classes\Instance_Trait;
use Jet_Form_Builder\Form_Patterns;
use Jet_Form_Builder\Integrations\Forms_Captcha;
use Jet_Form_Builder\Widgets\Elementor_Controller;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Main file
 */
class Plugin {

	use Instance_Trait;

	public $post_type;
	public $blocks;
	public $actions;
	public $form;
	public $form_handler;
	public $editor;
	public $captcha;
	public $dev_manager;

	public $is_activated_jet_sm;
	public $allow_gateways;

	/**
	 * Register autoloader.
	 */
	private function register_autoloader() {
		require JET_FORM_BUILDER_PATH . 'includes' . DIRECTORY_SEPARATOR . 'autoloader.php';
		Autoloader::run();
	}

	/**
	 * Initialize plugin parts
	 *
	 * @return void
	 */
	public function init_components() {
		$this->allow_gateways = apply_filters( 'jet-form-builder/allow-gateways', false );

		$this->post_type    = new Post_Type();
		$this->blocks       = new Blocks\Manager();
		$this->actions      = new Actions\Manager();
		$this->form         = new Form_Manager();
		$this->form_handler = new Form_Handler();
		$this->captcha      = new Forms_Captcha();

		Dev_Mode\Manager::instance();
		File_Upload::instance();
		new Elementor_Controller();

		if ( is_admin() ) {
			$this->editor = new Admin\Editor();
		}
	}

	/**
	 * Returns url to file or dir inside plugin folder
	 *
	 * @param string $path Path inside plugin dir.
	 *
	 * @return string
	 */
	public function plugin_url( $path = null ) {
		return JET_FORM_BUILDER_URL . $path;
	}

	/**
	 * Returns plugin version
	 */
	public function get_version() {
		return JET_FORM_BUILDER_VERSION;
	}

	/**
	 * Plugin constructor.
	 */
	private function __construct() {

		$this->register_autoloader();

		add_action( 'after_setup_theme', array( $this, 'init_components' ), 0 );
	}

}

Plugin::instance();

<?php
/**
 * submit button template
 */

$has_class = isset( $args['class_name'] );

$classes = array(
	'jet-form-builder__submit'
);

if ( $has_class )  {
    $classes[] = $args['class_name'];
}
$this->add_attribute( 'class', 'jet-form-builder__submit' );

// prevent submit form in editor
if ( ! \Jet_Form_Builder\Classes\Tools::is_editor() ) {
	$this->add_attribute( 'class', 'submit-type-' . $this->live_form->spec_data->submit_type );
}

$has_class ? $this->add_attribute( 'class', $args['class_name'] ) : '';

if ( isset( $this->live_form->spec_data->submit_type ) && 'reload' === $this->live_form->spec_data->submit_type ) {
	$this->add_attribute( 'type', 'submit' );
} else {
	$this->add_attribute( 'type', 'button' );
}

$wrap_classes = array( 'jet-form-builder__submit-wrap' );


if ( isset( $args['add_prev'] ) && $args['add_prev'] && 1 < $this->live_form->page ) {
	$wrap_classes[] = 'has-prev';
}

?>
<div class="<?php echo implode( ' ', $wrap_classes ) ?>">
	<?php include $this->get_global_template( 'common/prev-page-button.php' ); ?>
	<button<?php $this->render_attributes_string(); ?>><?php echo $args['label']; ?></button>
</div>
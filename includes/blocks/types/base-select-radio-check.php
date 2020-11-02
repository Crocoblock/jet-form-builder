<?php


namespace Jet_Form_Builder\Blocks\Types;


use Jet_Form_Builder\Classes\Tools;

trait Base_Select_Radio_Check
{
    /**
     * Return data for Select, Checkboxes and Radio fields
     *
     * @param array $merged
     * @return array
     */
    public function get_local_data_check_radio_select( $merged = array() ) {
        return array_merge( array(
            'options_from' => array(
                array(
                    'value' => 'manual_input',
                    'label' => 'Manual Input'
                ),
                array(
                    'value' => 'posts',
                    'label' => 'Posts'
                ),
                array(
                    'value' => 'terms',
                    'label' => 'Terms'
                ),
                array(
                    'value' => 'meta_field',
                    'label' => 'Meta Field'
                ),
                array(
                    'value' => 'generate',
                    'label' => 'Generate Dynamically'
                ),
            ),
            'post_types_list' => Tools::get_post_types_for_js(),
            'taxonomies_list' => Tools::get_taxonomies_for_js(),
            'generators_list' => Tools::get_generators_list_for_js(),

            'help_messages' => array(
                'value_from_meta' => __(
                    'By default post/term ID is used as value. Here you can set meta field name to use its value as form field value',
                    'jet-form-builder'
                ),
                'calc_value_from_meta' => __(
                    'Here you can set meta field name to use its value as calculated value for current form field',
                    'jet-form-builder'
                ),
                'is_switch_page' => __(
                    'Check this to switch page to next on current value change',
                    'jet-form-builder'
                ),
                'num_range'     => array(
                    'field_name'    => __(
                        'For Numbers range generator set field with max range value',
                        'jet-form-builder'
                    )
                )
            ),
        ), $merged );
    }

    /**
     * Return attributes for Select, Checkboxes and Radio fields
     *
     * @param array $merged
     * @return array
     */
    public function get_attributes_check_radio_select( $merged = array() ) {
        return array_merge( array(
            'field_options_from' => array(
                'type'      => 'string',
                'default'   => 'manual_input'
            ),

            'field_options' => array(
                'type'      => 'array',
                'default'   => array(
                    array(
                        'label' => '',
                        'value' => '',
                        'calculate'  => '',
                    )
                )
            ),

            /**
             * From posts
             */
            'field_options_post_type' => array(
                'type'      => 'string',
                'default'   => ''
            ),
           

            /**
             * From taxonomy
             */
            'field_options_tax' => array(
                'type'      => 'string',
                'default'   => ''
            ),
           

            /**
             * From meta field
             */
            'field_options_key'        => array(
                'type'      => 'string',
                'default'   => ''
            ),


            /**
             * From generators
             */
            'generator_function' => array(
                'type'      => 'string',
                'default'   => ''
            ),
            'generator_field' => array(
                'type'      => 'string',
                'default'   => ''
            ),
            
            
            
            'calculated_value_from_key'     => array(
                'type'      => 'string',
                'default'   => ''
            ),
            'value_from_key'                => array(
                'type'      => 'string',
                'default'   => ''
            ),

            'is_switch_page' => array(
                'type' => 'boolean',
                'default' => false
            ),

        ), $merged );
    }

    /**
	 * Returns block attributes
	 */
	public function get_field_attrs( $attributes ) {
		return array(
			'field_options' => $this->get_field_options( $attributes )
		);
	}

    /*
    * Returns field options list
    *
    * @return array
    */
    public function get_field_options( $args ) {

        $options_from = ! empty( $args['field_options_from'] ) ? $args['field_options_from'] : 'manual_input';
        $options      = array();
        $value_from   = ! empty( $args['value_from_key'] ) ? $args['value_from_key'] : false;
        $calc_from    = ! empty( $args['calculated_value_from_key'] ) ? $args['calculated_value_from_key'] : false;

        if ( 'manual_input' === $options_from ) {

            if ( ! empty( $args['field_options'] ) ) {

               foreach ( $args['field_options'] as $option ) {

                   $item = array(
                       'value' => $option['value'],
                       'label' => $option['label'],
                   );

                   if ( isset( $option['calculate'] ) && '' !== $option['calculate'] ) {
                       $item['calculate'] = $option['calculate'];
                   }

                   $options[] = $item;
               }

           }

       } elseif ( 'posts' === $options_from ) {

           $post_type = ! empty( $args['field_options_post_type'] ) ? $args['field_options_post_type'] : false;

           if ( ! $post_type ) {
               return $options;
           }

           $posts = get_posts( array(
               'post_status'    => 'publish',
               'posts_per_page' => -1,
               'post_type'      => $post_type,
           ) );

           if ( empty( $posts ) ) {
               return $options;
           }

           $result = array();
           $post_props = array( 'post_title', 'post_content', 'post_name', 'post_excerpt' );

           foreach ( $posts as $post ) {

               $item = array(
                   'value' => $post->ID,
                   'label' => $post->post_title,
               );

               if ( ! empty( $value_from ) ) {
                   if ( in_array( $value_from, $post_props ) ) {
                       $item['value'] = $post->$value_from;
                   } else {
                       $item['value'] = get_post_meta( $post->ID, $value_from, true );
                   }
               }

               if ( ! empty( $calc_from ) ) {
                   if ( in_array( $calc_from, $post_props ) ) {
                       $item['calculate'] = $post->$calc_from;
                   } else {
                       $item['calculate'] = get_post_meta( $post->ID, $calc_from, true );
                   }
               }

               $result[] = $item;

           }

           return $result;

       } elseif ( 'terms' === $options_from ) {

           $tax = ! empty( $args['field_options_tax'] ) ? $args['field_options_tax'] : false;

           if ( ! $tax ) {
               return $options;
           }

           $terms = get_terms( array(
               'taxonomy'   => $tax,
               'hide_empty' => false,
           ) );

           if ( empty( $terms ) || is_wp_error( $terms ) ) {
               return $options;
           }

           $result = array();

           foreach ( $terms as $term ) {

               $item = array(
                   'value' => $term->term_id,
                   'label' => $term->name,
               );

               if ( ! empty( $value_from ) ) {
                   $item['value'] = get_term_meta( $term->term_id, $value_from, true );
               }

               if ( ! empty( $calc_from ) ) {
                   $item['calculate'] = get_term_meta( $term->term_id, $calc_from, true );
               }

               $result[] = $item;

           }

           return $result;

       } elseif ( 'generate' === $options_from ) {

           $generator = ! empty( $args['generator_function'] ) ? $args['generator_function'] : false;
           $field     = ! empty( $args['generator_field'] ) ? $args['generator_field'] : false;

           if ( ! $generator ) {
               return $options;
           }

           if ( ! $this->manager ) {
               return $options;
           }

           $generators         = $this->manager->get_options_generators();
           $generator_instance = isset( $generators[ $generator ] ) ? $generators[ $generator ] : false;

           if ( ! $generator_instance ) {
               return $options;
           }

           $generated = $generator_instance->generate( $field );
           $result = array();

           if ( ! empty( $value_from || ! empty( $calc_from ) ) ) {
               foreach ( $generated as $key => $data ) {

                   if ( is_array( $data ) ) {
                       $item = $data;
                   } else {
                       $item = array(
                           'value' => $key,
                           'label' => $data,
                       );
                   }

                   $post_id = $item['value'];

                   if ( ! empty( $value_from ) ) {
                       $item['value'] = get_post_meta( $post_id, $value_from, true );
                   }

                   if ( ! empty( $calc_from ) ) {
                       $item['calculate'] = get_post_meta( $post_id, $calc_from, true );
                   }

                   $result[] = $item;

               }

               return $result;

           } else {
               return $generated;
           }

       } else {

           $key = ! empty( $args['field_options_key'] ) ? $args['field_options_key'] : '';

           if ( $key ) {
               $options = get_post_meta( $this->post->ID, $key, true );
               $options = $this->maybe_parse_repeater_options( $options );
           }

       }

       return $options;

   }



}
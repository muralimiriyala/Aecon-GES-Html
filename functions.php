<?php

function aecon_setup()
{
  add_theme_support('automatic-feed-links');
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  register_nav_menus(
    array(
      'primary' => esc_html__('Primary menu', 'aecon'),
      'footer_one'  => __('Footer menu One', 'aecon'),
      'footer_two'  => __('Footer menu Two', 'aecon'),
      'footer_three'  => __('Footer menu Three', 'aecon'),
      'footer_four'  => __('Footer menu Four', 'aecon'),
    )
  );
}
add_action('after_setup_theme', 'aecon_setup');
add_filter('big_image_size_threshold', '__return_false');

//header and footer setup
if (function_exists('acf_add_options_sub_page')) {
  acf_add_options_sub_page(array(
    'title' => 'Header Options',
    'parent' => 'themes.php',
  ));
}
if (function_exists('acf_add_options_sub_page')) {
  acf_add_options_sub_page(array(
    'title' => 'Footer Options',
    'parent' => 'themes.php',
  ));
}
if (function_exists('acf_add_options_sub_page')) {
  acf_add_options_sub_page(array(
    'title' => 'Free Assessment Header Options',
    'parent' => 'themes.php',
  ));
}

//remove comments
function hide_comments_menu()
{
  remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'hide_comments_menu');


function aecon_scripts()

{
  $p_cache = rand();

  // Enqueue Font Awesome script
  wp_enqueue_script('font-awesome', 'https://kit.fontawesome.com/8918ceb0b7.js', array(), '5.15.4', false);

  // Enqueue style.css
  wp_enqueue_style('main-style', get_stylesheet_directory_uri() . '/style.css', array(), '1.0', 'all');

  // Enqueue core.bundle.css
  wp_enqueue_style('core-bundle-style', get_stylesheet_directory_uri() . '/core.bundle.css', array(), '1.0', 'all');

  // Enqueue Core Bundle JavaScript
  wp_enqueue_script('core-bundle', get_template_directory_uri() . '/dist/core.bundle.js', array('jquery'), '1.0', true);

  // Enqueue the first script
  wp_enqueue_script('custom-ajax-script', get_template_directory_uri() . '/dist/load-more.js', array('jquery'), '1.0', true);

  // Enqueue the second script with a different handle
  wp_enqueue_script('testimonials-ajax-script', get_template_directory_uri() . '/dist/testimonials-load-more.js', array('jquery'), '1.0', true);

  wp_enqueue_script('projects-ajax-script', get_template_directory_uri() . '/dist/projects-load-more.js', array('jquery'), '1.0', true);

  // Localize the first script
  wp_localize_script('custom-ajax-script', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
}

add_action('wp_enqueue_scripts', 'aecon_scripts', 10);



// Common Banner Section

function display_common_banner_section()
{
  $video_or_static_image = get_field('common_banner_static_image_or_video', get_the_ID());
  $banner_desktop_image = get_field('common_banner_desktop_image', get_the_ID());
  $banner_mobile_image = get_field('common_banner_mobile_image', get_the_ID());
  $banner_fallback_desktop_image = get_field('common_banner_fallback_desktop_image', get_the_ID());
  $banner_fallback_mobile_image = get_field('common_banner_fallback_mobile_image', get_the_ID());
  $banner_background_video_type = get_field('common_banner_video_type', get_the_ID());
  $banner_background_youtube_id = get_field('common_banner_youtube_id', get_the_ID());
  $banner_background_vimeo_id = get_field('common_banner_vimeo_id', get_the_ID());
  $banner_microsoft_stream_iframe = get_field('common_banner_microsoft_stream_iframe', get_the_ID());
  $common_banner_sub_heading = get_field('common_banner_sub_heading', get_the_ID());
  $common_banner_heading = get_field('common_banner_heading', get_the_ID());
  $common_banner_description = get_field('common_banner_description', get_the_ID());
?>
  <!-- Banner Section Starts Here-->
  <section class="banner-section relative">
    <?php if ($video_or_static_image == 'static_image') {
      if ($banner_mobile_image ||  $banner_desktop_image) { ?>
        <div class="background-bg banner-bg">
          <?php $banner_mobile_image = $banner_mobile_image ? $banner_mobile_image : $banner_desktop_image;
          $banner_desktop_image = $banner_desktop_image ? $banner_desktop_image : $banner_mobile_image; ?>
          <picture class="banner-thumb object-fit">
            <source srcset="<?php echo $banner_desktop_image['url'];  ?>" media="(min-width: 768px)">
            <img src="<?php echo $banner_mobile_image['url']; ?>" alt="<?php echo $banner_mobile_image['alt']; ?>">
          </picture>
        </div>
      <?php } ?>

    <?php
    } elseif ($video_or_static_image == 'video') {
      $background_image_url = isset($banner_fallback_desktop_image['url']) ? $banner_fallback_desktop_image['url'] : '';
      $background_mobile_image_url = isset($banner_fallback_mobile_image['url']) ? $banner_fallback_mobile_image['url'] : '';
      $mobile_image_alt = isset($banner_fallback_mobile_image['alt']) ? $banner_fallback_mobile_image['alt'] : '';

      if (empty($background_mobile_image_url) || !$background_mobile_image_url) {
        $background_mobile_image_url = $background_image_url;
        if (empty($mobile_image_alt) || !$mobile_image_alt) {
          $mobile_image_alt = isset($banner_fallback_desktop_image['alt']) ? $banner_fallback_desktop_image['alt'] : '';
        }
      }
    ?>
      <div class="poster-bg background-bg">
        <picture class="banner-thumb object-fit">
          <?php if ($background_image_url) { ?>
            <source srcset="<?php echo $background_image_url; ?>" media="(min-width: 768px)">
            <img loading="eager" class="poster-img" src="<?php echo $background_mobile_image_url; ?>" alt="<?php echo $mobile_image_alt; ?>">
          <?php } ?>
        </picture>
      </div>
      <?php if ($banner_background_video_type === 'vimeo' && $banner_background_vimeo_id) { ?>
        <!-- Display Vimeo video when Vimeo ID is available -->
        <div class="banner-bg background-bg home-banner-iframe" data-ytbg-fade-in="true" data-youtube="https://vimeo.com/<?php echo $banner_background_vimeo_id; ?>"> </div>
      <?php } elseif ($banner_background_video_type === 'youtube' && $banner_background_youtube_id) { ?>
        <!-- Display YouTube video when YouTube ID is available -->
        <div class="banner-bg background-bg home-banner-iframe" data-ytbg-fade-in="true" data-youtube="https://www.youtube.com/watch?v=<?php echo $banner_background_youtube_id; ?>"> </div>

      <?php } elseif ($banner_background_video_type === 'microsoft stream' && $banner_microsoft_stream_iframe) { ?>
        <!-- Display Microsoft Stream video when Microsoft Stream Iframe is available -->
        <div class="background-bg video-banner-iframe">
          <?php echo $banner_microsoft_stream_iframe; ?>
        </div>
      <?php } ?>
    <?php } ?>
    <div class="banner-main container">
      <div class="banner-text inverted fs-16">
        <?php if (!empty($common_banner_sub_heading)) : ?>
          <span class="optional-text muted"><?php echo $common_banner_sub_heading; ?></span>
        <?php endif; ?>
        <?php if (!empty($common_banner_heading)) : ?>
          <h1><?php echo $common_banner_heading; ?></h1>
          <hr>
        <?php else : ?>
          <h1><?php echo get_the_title(); ?></h1>
          <hr>
        <?php endif; ?>

        <?php if (!empty($common_banner_description)) : ?>
          <?php echo $common_banner_description; ?>
        <?php endif; ?>
      </div>
    </div>
  </section>
  <?php }

// Short Intro Section Function



function display_short_intro_section()
{
  $short_intro_sub_heading = get_field('short_introduction_sub_heading');
  $short_intro_heading = get_field('short_introduction_heading');
  $short_intro_description = get_field('short_introduction_description');
  $short_intro_features = get_field('short_introduction_features');
  $display = get_field('short_introduction_display');

  if (empty($short_intro_sub_heading) && empty($short_intro_heading)) {
    $class = "no_intro_head";
  } else {
    $class = "";
  }

  if($display == 'yes')
  {
  if ($short_intro_sub_heading || $short_intro_heading || $short_intro_description || is_array($short_intro_features)) {
    if (is_page_template('templates/home.php')) { ?>
      <section class="short-intro-section bg-white">
      <?php } elseif (is_page_template('templates/why-aecon.php')) { ?>
        <section class="short-intro-section bg-white">
        <?php } else { ?>
          <section class="short-intro-section bg-elevated">
          <?php } ?>
          <div class="container">
            <div class="short-intro-main">
              <div class="short-intro-head flex <?php echo $class; ?>">
                <?php if ((!empty($short_intro_sub_heading)) || (!empty($short_intro_heading))) { ?>
                  <div class="short-intro-title">
                    <?php if (!empty($short_intro_sub_heading)) { ?>
                      <span class="optional-text"><?php echo $short_intro_sub_heading; ?></span>
                    <?php } ?>
                    <?php if (!empty($short_intro_heading)) { ?>
                      <h2><?php echo $short_intro_heading; ?></h2>
                    <?php } ?>
                  </div>
                <?php } ?>
                <?php if (!empty($short_intro_description)) { ?>
                  <div class="short-intro-desc fs-18 relative">
                    <?php echo $short_intro_description; ?>
                  </div>
                <?php } ?>
              </div>
              <div class="short-intro-of-4 flex">
                <?php foreach ($short_intro_features as $features) {
                  $svg_or_image = $features['short_introduction_feature_svg_or_image'];
                  $icon = $features['short_introduction_feature_icon'];
                  $svg = $features['short_introduction_feature_svg'];
                  $heading = $features['short_introduction_feature_heading'];
                  $description = $features['short_introduction_feature_description'];
                ?>
                  <div class="short-intro1-of-4 fs-14">
                    <?php if ($svg_or_image === 'image' && !empty($icon)) { ?>
                      <figure class="short-intro-icon">
                        <img src="<?php echo $icon['url']; ?>" alt="<?php echo $icon['alt']; ?>">
                      </figure>
                    <?php } elseif ($svg_or_image === 'svg' && !empty($svg)) { ?>
                      <figure class="short-intro-icon">
                        <?php echo $svg; ?>
                      </figure>
                    <?php } ?>
                    <?php if (!empty($heading)) { ?>
                      <h2 class="h4"><?php echo $heading; ?></h2>
                    <?php } ?>
                    <?php if (!empty($description)) { ?>
                      <?php echo $description; ?>
                    <?php } ?>
                  </div>
                <?php } ?>
              </div>
            </div>
          </div>
          </section>
        <?php }
    } }


    // Testimonial Section Function
  function display_testimonial_section() {
      $testimonial_heading = get_field('testimonial_heading');
      $select_testimonial = get_field('select_testimonial');
  
      if (empty($testimonial_heading)) {
          $class = "no_head";
      } else {
          $class = "";
      }
  
      global $template;
      $template_name = basename($template);
      $section_class = ($template_name == 'home.php' || $template_name == 'careers.php') ? 'what-people-section bg-elevated' : 'what-people-section bg-white';
  
      // Check if the relationship field is empty
      if (empty($select_testimonial)) {
          // If the relationship field is empty, fetch 4 posts from the Testimonials CPT
          $args = array(
              'post_type'      => 'testimonial',  // Change 'testimonial' to your actual CPT name
              'posts_per_page' => 4,
          );
  
          $testimonial_query = new WP_Query($args);
  
          // Check if there are posts in the query
          if ($testimonial_query->have_posts()) {
              $select_testimonial = array();
  
              // Loop through the query and populate the $select_testimonial array
              while ($testimonial_query->have_posts()) {
                  $testimonial_query->the_post();
                  $select_testimonial[] = get_post(); // Add the post object to the array
              }
  
              // Reset post data
              wp_reset_postdata();
          }
      } ?>
  
      <?php if (!empty($testimonial_heading) || is_array($select_testimonial)) { ?>
          <section class="<?php echo $section_class; ?>">
              <div class="container">
                  <div class="what-people-main flex <?php echo $class; ?>">
                      <?php if (!empty($testimonial_heading)) { ?>
                          <div class="what-people-heading">
                              <h2><?php echo $testimonial_heading; ?></h2>
                          </div>
                      <?php } ?>
  
                      <?php if (!empty($select_testimonial)) { ?>
                          <div class="what-people-grids flex">
                              <?php
                              $count = 0;
                              foreach ($select_testimonial as $testimonial) {
                                  if ($count >= 3) {
                                      break;
                                  }
                                  $testimonial_post_review = get_field('testimonial_post_review', $testimonial->ID);
                                  $testimonial_post_profile_image = get_field('testimonial_post_profile_image', $testimonial->ID);
                                  $testimonial_post_name = get_field('testimonial_post_name', $testimonial->ID);
                                  $testimonial_post_position = get_field('testimonial_post_position', $testimonial->ID);
                                  ?>
                  <div class="what-people-grid fs-16 bg-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"  data-animation="ui-svg-dot">
                    <path d="M2 17.5C2 18.5609 2.42143 19.5783 3.17157 20.3284C3.92172 21.0786 4.93913 21.5 6 21.5C7.06087 21.5 8.07828 21.0786 8.82843 20.3284C9.57857 19.5783 10 18.5609 10 17.5C10 16.4391 9.57857 15.4217 8.82843 14.6716C8.07828 13.9214 7.06087 13.5 6 13.5C4.93913 13.5 3.92172 13.9214 3.17157 14.6716C2.42143 15.4217 2 16.4391 2 17.5Z" fill="#71A341" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                    <path d="M14 17.5C14 18.5609 14.4214 19.5783 15.1716 20.3284C15.9217 21.0786 16.9391 21.5 18 21.5C19.0609 21.5 20.0783 21.0786 20.8284 20.3284C21.5786 19.5783 22 18.5609 22 17.5C22 16.4391 21.5786 15.4217 20.8284 14.6716C20.0783 13.9214 19.0609 13.5 18 13.5C16.9391 13.5 15.9217 13.9214 15.1716 14.6716C14.4214 15.4217 14 16.4391 14 17.5Z" fill="#71A341" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                    <path d="M2 17.5V8.5C2 6.9087 2.63214 5.38258 3.75736 4.25736C4.88258 3.13214 6.4087 2.5 8 2.5M14 17.5V8.5C14 6.9087 14.6321 5.38258 15.7574 4.25736C16.8826 3.13214 18.4087 2.5 20 2.5" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                  </svg>
                  <?php if (!empty($testimonial_post_review)) { ?>
                    <?php echo $testimonial_post_review; ?>
                  <?php } ?>
  
                  <?php if (!empty($testimonial_post_profile_image['url'])) { ?>
                    <div class="avatar-main flex flex-vcenter">
                      <figure class="avatar-img object-fit-img radius-img-50">
                        <img src="<?php echo $testimonial_post_profile_image['url']; ?>" alt="<?php echo $testimonial_post_profile_image['alt']; ?>" data-animation="fade-circle">
                      </figure>
                      <div class="avatar-text fs-14">
                        <?php if (!empty($testimonial_post_name)) { ?>
                          <span class="optional-text dark no_margin"><?php echo $testimonial_post_name; ?></span>
                        <?php } ?>
                        <?php if (!empty($testimonial_post_position)) { ?>
                          <?php echo $testimonial_post_position; ?>
                        <?php } ?>
                      </div>
                    </div>
                  <?php } ?>
                </div>
              <?php
                $count++;
                              } ?>
                          </div>
                      <?php } 
  
                      $total_testimonials = count($select_testimonial);
          if ($total_testimonials >= 4) { // Note: Array indices are zero-based, so use 4 instead of 3
            $last_testimonial = $select_testimonial[3];
            if (is_object($last_testimonial)) {
              $testimonial_post_review = get_field('testimonial_post_review', $last_testimonial->ID);
              $testimonial_post_name = get_field('testimonial_post_name', $last_testimonial->ID);
              $testimonial_post_position = get_field('testimonial_post_position', $last_testimonial->ID);
              $testimonial_post_video_type = get_field('testimonial_post_video_type', $last_testimonial->ID);
              $testimonial_post_vimeo_id = get_field('testimonial_post_vimeo_id', $last_testimonial->ID);
              $testimonial_post_youtube_id = get_field('testimonial_post_youtube_id', $last_testimonial->ID);
              $testimonial_post_microsoft_stream_iframe = get_field('testimonial_post_microsoft_stream_iframe', $last_testimonial->ID);
              $testimonial_post_video_mobile_thumbnail = get_field('testimonial_post_video_mobile_thumbnail', $last_testimonial->ID);
              $testimonial_post_video_desktop_thumbnail = get_field('testimonial_post_video_desktop_thumbnail', $last_testimonial->ID);
              $video_source = '';
  
              if ($testimonial_post_video_type === 'vimeo') {
                $video_source = 'https://player.vimeo.com/video/' . $testimonial_post_vimeo_id;
              } elseif ($testimonial_post_video_type === 'youtube') {
                $video_source = 'https://www.youtube.com/watch?v=' . $testimonial_post_youtube_id;
              } elseif ($testimonial_post_video_type === 'microsoft_stream') {
                $video_source = $testimonial_post_microsoft_stream_iframe;
              }
            ?>
              <div class="what-people-quote flex flex-vcenter">
                <?php if (!empty($video_source) && (!empty($testimonial_post_video_mobile_thumbnail) || !empty($testimonial_post_video_desktop_thumbnail))) { ?>
                  <div class="what-quote-image relative">
                    <picture class="object-fit">
                      <?php if (!empty($testimonial_post_video_mobile_thumbnail)) { ?>
                        <source srcset="<?php echo $testimonial_post_video_mobile_thumbnail['url']; ?>" media="(max-width: 739px)">
                      <?php } ?>
                      <?php if (!empty($testimonial_post_video_desktop_thumbnail)) { ?>
                        <source srcset="<?php echo $testimonial_post_video_desktop_thumbnail['url']; ?>" media="(min-width: 740px)">
                      <?php } ?>
                      <img src="<?php echo !empty($testimonial_post_video_mobile_thumbnail) ? $testimonial_post_video_mobile_thumbnail['url'] : $testimonial_post_video_desktop_thumbnail['url']; ?>" alt="">
                    </picture>
                    <div class="play-btn-main flex flex-center">
                      <div class="play-btn relative">
                        <?php if ($testimonial_post_video_type === 'youtube') { ?>
                          <a href="<?php echo $video_source; ?>" class="popup-youtube play-btn-bg flex flex-center">
                            <span class="btn-circle"></span>
                            <span></span>
                            <span></span>
                            video
                          </a>
                        <?php } ?>
                      </div>
                    </div>
                  </div>
                <?php } ?>
                <div class="what-quote-text">
                  <?php if (!empty($testimonial_post_review)) { ?>
                    <h2 class="h4"><?php echo $testimonial_post_review; ?></h2>
                  <?php } ?>
                  <div class="what-quote-desc fs-14">
                    <?php if (!empty($testimonial_post_name)) { ?>
                      <span class="optional-text green"><?php echo $testimonial_post_name; ?></span>
                    <?php } ?>
                    <?php if (!empty($testimonial_post_position)) { ?>
                      <?php echo $testimonial_post_position; ?>
                    <?php } ?>
                  </div>
                </div>
              </div>
              
          <?php
            }
          }
          ?>
          <div class="what-people-btn">
                          <a href="/testimonials/" class="button">More testimonials</a>
                      </div>
                  </div>
              </div>
          </section>
      <?php } ?>
  <?php }
  

    // Approach Section Function
    function display_approach_section()
    {
      $our_approach_sub_heading = get_field('our_approach_sub_heading');
      $our_approach_heading = get_field('our_approach_heading');
      $our_approach_repeater = get_field('our_approach_repeater');
      $free_assessment_options_repeater = get_field('free_assessment_options_repeater', 'option');

      if ($our_approach_sub_heading || $our_approach_heading || is_array($our_approach_repeater)) { ?>
          <section class="our-approach-section bg-elevated">
            <div class="container ipad-0 mobile-0">
              <div class="our-approach-main flex">
                <div class="our-approach-left">
                  <div class="our-approach-image bg-white">
                    <div class="approach-slider-for">
                      <?php $i = 1;
                      foreach ($our_approach_repeater as $repeater) {
                        $desktop_image = $repeater['our_approach_repeater_desktop_image'];
                        $mobile_image = $repeater['our_approach_repeater_mobile_image'];
                        $heading = $repeater['our_approach_repeater_heading'];
                      ?>

                        <?php if ($mobile_image ||  $desktop_image) {

                          $mobile_image = $mobile_image ? $mobile_image : $desktop_image;
                          $desktop_image = $desktop_image ? $desktop_image : $mobile_image; ?>
                          <div class="our-approach-thumb" data-value="approach-<?php echo $i; ?>">
                            <picture class="object-fit">
                              <source srcset="<?php echo $desktop_image['url'];  ?>" media="(min-width: 740px)">
                              <img src="<?php echo $desktop_image['url'];  ?>" alt="<?php echo $mobile_image['alt']; ?>">
                            </picture>
                          </div>
                      <?php }
                        $i++;
                      } ?>
                    </div>

                    <div class="approach-slider-nav">
                      <?php $i = 1;
                      foreach ($our_approach_repeater as $repeater) {
                        $description = $repeater['our_approach_repeater_description'];
                        $button_text = $repeater['our_approach_repeater_button_text'];
                        $button_link = $repeater['our_approach_repeater_button_link'];
                        $approach_free_assessment_or_link = $repeater['approach_free_assessment_or_link_btn'];  ?>
                        <div class="our-approach-desc fs-20 hide-tablet hide-mobile" data-value="approach-<?php echo $i; ?>">
                          <?php if ($description) { ?>
                            <?php echo $description; ?>
                          <?php } ?>
                          <?php if ($approach_free_assessment_or_link == 'free assessment') { ?>
                    <form>
                      <select name="assessment_type" id="assessment_type" onchange="if (this.value !== '#') window.location.href=this.value;">
                        <option value="#" selected disabled>Get a free assessment</option>
                        <?php if($free_assessment_options_repeater) {
                             foreach ($free_assessment_options_repeater as $repeater) {
                          $link = $repeater['free_assessment_option_link'];
                          $option = $repeater['free_assessment_option']; ?>
                          <option value="<?php echo $link; ?>"><?php echo $option; ?></option>
                        <?php }  } ?>
                      </select>
                    </form>
                  <?php } elseif ($approach_free_assessment_or_link == 'link' ) { ?>
                    <?php if( $button_text && $button_link) { ?>
                    <a href="<?php echo $button_link; ?>" class="button btn-gray btn-sm"><?php echo $button_text; ?></a>
                  <?php } } ?>
                        </div>
                      <?php $i++;
                      } ?>
                    </div>
                  </div>
                </div>
                <div class="our-approach-text">
                  <?php if ($our_approach_sub_heading) { ?>
                    <span class="optional-text"><?php echo $our_approach_sub_heading; ?></span>
                  <?php }
                  if ($our_approach_heading) { ?>
                    <h2 class="h3"><?php echo $our_approach_heading; ?></h2>
                  <?php } ?>
                  <ul class="our-approach-links">
                    <?php $i = 1;
                    foreach ($our_approach_repeater as $repeater) {
                      $heading = $repeater['our_approach_repeater_heading'];
                      $description = $repeater['our_approach_repeater_description'];
                      $button_text = $repeater['our_approach_repeater_button_text'];
                      $button_link = $repeater['our_approach_repeater_button_link'];
                      $approach_free_assessment_or_link = $repeater['approach_free_assessment_or_link_btn'];  ?>
                      <li>
                        <a class="our-approach-link" href="javascript:void(0);" data-link="approach-<?php echo $i; ?>">
                          <?php if ($heading) { ?>
                            <span><?php echo $heading; ?></span>
                          <?php } ?>
                          <svg width="35" height="38" viewBox="0 0 35 38" fill="none">
                            <path opacity="0.33" d="M1 1L17 19L1.00002 37" stroke="#71A341" stroke-width="2" stroke-linecap="round" />
                            <path opacity="0.66" d="M9 1L25 19L9.00002 37" stroke="#71A341" stroke-width="2" stroke-linecap="round" />
                            <path d="M17 1L33 19L17 37" stroke="#71A341" stroke-width="2" stroke-linecap="round" />
                          </svg>
                        </a>
                        <div class="our-approach-mobile fs-20 bg-white">
                          <?php if ($description) { ?>
                            <?php echo $description; ?>
                          <?php } ?>
                          <?php if ($approach_free_assessment_or_link == 'free assessment') { ?>
                    <form>
                      <select name="assessment_type" id="assessment_type" onchange="if (this.value !== '#') window.location.href=this.value;">
                        <option value="#" selected disabled>Get a free assessment</option>
                        <?php if($free_assessment_options_repeater) {
                             foreach ($free_assessment_options_repeater as $repeater) {
                          $link = $repeater['free_assessment_option_link'];
                          $option = $repeater['free_assessment_option']; ?>
                          <option value="<?php echo $link; ?>"><?php echo $option; ?></option>
                        <?php }  } ?>
                      </select>
                    </form>
                  <?php } elseif ($approach_free_assessment_or_link == 'link') { ?>
                    <?php if( $button_text && $button_link) { ?>
                    <a href="<?php echo $button_link; ?>" class="button btn-gray btn-sm"><?php echo $button_text; ?></a>
                  <?php } } ?>
                        </div>
                      </li>
                    <?php $i++;
                    } ?>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <?php }
      }

      // Green Energy Section Function
      function display_green_energy_section()
      {
        $green_energy_works_sub_heading = get_field('green_energy_works_sub_heading');
        $green_energy_works_heading = get_field('green_energy_works_heading');
        $green_energy_works_select_resource = get_field('green_energy_works_select_resource');
        $green_energy_works_background_desktop_image = get_field('green_energy_works_background_desktop_image');
        $green_energy_works_background_mobile_image = get_field('green_energy_works_background_mobile_image');

        if (empty($green_energy_works_select_resource)) {
          // If no specific resources are selected, get four default posts
          $default_posts = get_posts(array(
            'post_type'      => 'post',
            'posts_per_page' => 4,
            'tax_query'      => array(
                array(
                    'taxonomy' => 'category',
                    'field'    => 'slug',
                    'terms'    => 'uncategorized',
                    'operator' => 'NOT IN',
                ),
            ),
        ));
        

          // Check if there are default posts
          if ($default_posts) {
          ?>
            <section class="incentives-section relative">
              <div class="parallax-bg background-bg incentives-bg"></div>
              <div class="incentives-navy-bg background-bg"></div>
              <?php if ($green_energy_works_background_desktop_image || $green_energy_works_background_mobile_image) { ?>
                <!-- <div class="incentives-bg background-bg"> -->
                <!-- <picture class="object-fit">
                      <?php if ($green_energy_works_background_desktop_image) { ?>
                        <source srcset="<?php //echo $green_energy_works_background_desktop_image['url']; 
                                        ?>" media="(min-width: 740px)">
                      <?php }
                      if ($green_energy_works_background_mobile_image) { ?>
                        <img src="<?php //echo $green_energy_works_background_mobile_image['url']; 
                                  ?>" alt="<?php //echo $green_energy_works_background_mobile_image['alt']; 
                                            ?>">
                      <?php } ?>
                    </picture> -->
                <!-- <div class="incentives-navy-bg background-bg"></div>
                  </div> -->
              <?php } ?>
              <div class="container">
                <div class="incentives-main">
                  <?php if ($green_energy_works_heading || $green_energy_works_sub_heading) { ?>
                    <div class="incentives-head inverted">
                    <?php if ($green_energy_works_sub_heading) { ?>
                <span class="optional-text muted"><?php echo $green_energy_works_sub_heading; ?></span>
                <?php }  if ($green_energy_works_heading) {?>
                      <h2><?php echo $green_energy_works_heading; ?></h2>
                      <?php } ?>
                    </div>
                  <?php } ?>
                  <div class="incentives-row flex">
                    <?php
                    foreach ($default_posts as $default_post) {
                      // Your existing loop code here for default posts
                      $post_id = $default_post->ID;
                      $post_permalink = get_permalink($post_id);
                      $common_banner_desktop_image = get_field('common_banner_desktop_image', $post_id);
                      $resources_post_short_introduction = get_field('resources_post_short_introduction', $post_id);
                      $post_title = get_the_title($post_id);
                      $post_categories = get_the_category($post_id); ?>
                      <?php if (is_page_template('templates/partners.php')) { ?>
                        <div class="incentives1-of-3 fs-16">
                        <?php } else {  ?>
                          <div class="incentives1-of-4 fs-16">
                          <?php   } ?>
                          <?php if ($common_banner_desktop_image) { ?>
                            <div class="incentives-image">
                              <figure class="incentives-thumb object-fit">
                                <a href="<?php echo $post_permalink; ?>">
                                  <img src="<?php echo $common_banner_desktop_image['url']; ?>" alt="<?php echo $common_banner_desktop_image['alt']; ?>">
                                </a>
                              </figure>
                            </div>
                          <?php } ?>
                          <div class="incentives-text relative">
                            <?php if ($post_categories) { ?>
                              <ul class="res-categories flex">
                                <?php foreach ($post_categories as $category) { ?>
                                  <li><?php echo $category->name; ?></li>
                                <?php } ?>
                              </ul>
                            <?php } ?>
                            <h2 class="h4">
                              <a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a>
                            </h2>
                            <div class="line-clamp clamp-3">
                              <?php echo $resources_post_short_introduction; ?>
                            </div>
                          </div>
                          </div>
                        <?php
                      } ?>
                        </div>
                        <div class="incentives-btn text-md-right">
                          <a href="/resources/" class="button btn-md">More Like This</a>
                        </div>
                  </div>
                </div>
            </section>
          <?php }
        } else {
          // Your existing code for displaying specific resources
          ?>
          <section class="incentives-section relative">
            <div class="parallax-bg background-bg incentives-bg"></div>
            <div class="incentives-navy-bg background-bg"></div>
            <?php if ($green_energy_works_background_desktop_image || $green_energy_works_background_mobile_image) { ?>
              <!-- <div class="incentives-bg background-bg"> -->
              <!-- <picture class="object-fit">
                      <?php if ($green_energy_works_background_desktop_image) { ?>
                        <source srcset="<?php //echo $green_energy_works_background_desktop_image['url']; 
                                        ?>" media="(min-width: 740px)">
                      <?php }
                      if ($green_energy_works_background_mobile_image) { ?>
                        <img src="<?php //echo $green_energy_works_background_mobile_image['url']; 
                                  ?>" alt="<?php //echo $green_energy_works_background_mobile_image['alt']; 
                                            ?>">
                      <?php } ?>
                    </picture> -->
              <!-- <div class="incentives-navy-bg background-bg"></div>
                  </div> -->
            <?php } ?>
            <div class="container">
              <div class="incentives-main">
              <?php if ($green_energy_works_heading || $green_energy_works_sub_heading) { ?>
                    <div class="incentives-head inverted">
                    <?php if ($green_energy_works_sub_heading) { ?>
                <span class="optional-text muted"><?php echo $green_energy_works_sub_heading; ?></span>
                <?php }  if ($green_energy_works_heading) {?>
                      <h2><?php echo $green_energy_works_heading; ?></h2>
                      <?php } ?>
                    </div>
                  <?php } ?>
                <div class="incentives-row flex">
                  <?php
                  foreach ($green_energy_works_select_resource as $resource) {
                    $post_id = $resource->ID;
                    $post_permalink = get_permalink($post_id);
                    $common_banner_desktop_image = get_field('common_banner_desktop_image', $post_id);
                    $resources_post_short_introduction = get_field('resources_post_short_introduction', $post_id);
                    $post_title = get_the_title($post_id);
                    $post_categories = get_the_category($post_id); ?>
                    <?php if (is_page_template('templates/partners.php')) { ?>
                      <div class="incentives1-of-3 fs-16">
                      <?php } else {  ?>
                        <div class="incentives1-of-4 fs-16">
                        <?php   } ?>
                        <?php if ($common_banner_desktop_image) { ?>
                          <div class="incentives-image">
                            <figure class="incentives-thumb object-fit">
                              <a href="<?php echo $post_permalink; ?>">
                                <img src="<?php echo $common_banner_desktop_image['url']; ?>" alt="<?php echo $common_banner_desktop_image['alt']; ?>">
                              </a>
                            </figure>
                          </div>
                        <?php } ?>
                        <div class="incentives-text relative">
                          <?php if ($post_categories) { ?>
                            <ul class="res-categories flex">
                              <?php foreach ($post_categories as $category) { ?>
                                <li><?php echo $category->name; ?></li>
                              <?php } ?>
                            </ul>
                          <?php } ?>
                          <h2 class="h4">
                            <a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a>
                          </h2>
                          <div class="line-clamp clamp-3">
                            <?php echo $resources_post_short_introduction; ?>
                          </div>
                        </div>
                        </div>
                      <?php
                    } ?>
                      </div>
                      <div class="incentives-btn text-md-right">
                        <a href="/resources/" class="button btn-md">More Like This</a>
                      </div>
                </div>
              </div>
          </section>
        <?php
        }
      }


      // Partner With Us Form Section Function
      function display_partner_with_us_form_section()
      {
        $partner_form_sub_heading = get_field('partner_with_us_form_sub_heading');
        $partner_form_heading = get_field('partner_with_us_form_heading');
        $partner_form_description = get_field('partner_with_us_form_description');
        $partner_form_profile_image = get_field('partner_with_us_form_profile_image');
        $partner_form_name = get_field('partner_with_us_form_name');
        $partner_form_position = get_field('partner_with_us_form_position');
        $partner_form_phone_number = get_field('partner_with_us_form_phone_number');
        $partner_form_mail_id = get_field('partner_with_us_form_mail_id');
        $partner_form_form_id = get_field('partner_with_us_form_form_id');

        if ($partner_form_sub_heading || $partner_form_heading || $partner_form_description || $partner_form_profile_image || $partner_form_name || $partner_form_position || $partner_form_phone_number || $partner_form_mail_id || $partner_form_form_id) {
        ?>
          <section class="partner-form-section" id="partner-form-section">
            <div class="container">
              <div class="partner-form-main flex">
                <div class="partner-form-text fs-16">
                  <?php if ($partner_form_sub_heading) { ?>
                    <span class="optional-text sm accent-dark"><?php echo $partner_form_sub_heading; ?></span>
                  <?php } ?>
                  <?php if ($partner_form_heading) { ?>
                    <h3><?php echo $partner_form_heading; ?></h3>
                  <?php } ?>
                  <?php if ($partner_form_description) { ?>
                    <?php echo $partner_form_description; ?>
                  <?php } ?>
                  <div class="partner-detail relative hide-tablet hide-mobile">
                    <h4 class="hide-desktop hide-tablet">Contact Our Team</h4>
                    <div class="partner-ipad-flex flex">
                      <?php if ($partner_form_profile_image) { ?>
                        <div class="partner-image">
                          <figure class="object-fit radius-img-50">
                            <img src="<?php echo $partner_form_profile_image['url']; ?>" alt="<?php echo $partner_form_profile_image['alt']; ?>">
                          </figure>
                        </div>
                      <?php } ?>
                      <div class="partner-info">
                        <?php if ($partner_form_name) { ?>
                          <span class="partner-name"><?php echo $partner_form_name; ?></span>
                        <?php } ?>
                        <?php if ($partner_form_position) { ?>
                          <span class="specialist"><?php echo $partner_form_position; ?></span>
                        <?php } ?>
                        <ul class="partner-contact flex">
                          <?php if ($partner_form_phone_number) { ?>
                            <li>
                              <a href="tel:<?php echo $partner_form_phone_number; ?>" class="call-us flex">
                                <span class="hide-tablet hide-desktop">Call Us</span>
                                <span class="fa-regular fa-phone"></span>
                                <span class="hide-mobile"><?php echo $partner_form_phone_number; ?></span>
                              </a>
                            </li>
                          <?php } ?>
                          <?php if ($partner_form_mail_id) { ?>
                            <li>
                              <a href="mailto:<?php echo $partner_form_mail_id; ?>" class="email flex">
                                <span class="hide-tablet hide-desktop">Email Us</span>
                                <span class="fa-regular fa-at"></span>
                                <span class="hide-mobile"><?php echo $partner_form_mail_id; ?></span>
                              </a>
                            </li>
                          <?php } ?>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="become-partner-form">
                  <div class="frm_forms  with_frm_style frm_inline_form frm_inline_top frm_style_formidable-style" id="frm_form_1_container">
                    <?php echo do_shortcode($partner_form_form_id); ?>
                  </div>
                </div>
                <div class="partner-detail relative hide-desktop">
                  <h4 class="hide-desktop hide-tablet">Contact Our Team</h4>
                  <div class="partner-ipad-flex flex">
                    <?php if ($partner_form_profile_image) { ?>
                      <div class="partner-image">
                        <figure class="object-fit radius-img-50">
                          <img src="<?php echo $partner_form_profile_image['url']; ?>" alt="<?php echo $partner_form_profile_image['alt']; ?>">
                        </figure>
                      </div>
                    <?php } ?>
                    <div class="partner-info">
                      <?php if ($partner_form_name) { ?>
                        <span class="partner-name"><?php echo $partner_form_name; ?></span>
                      <?php } ?>
                      <?php if ($partner_form_position) { ?>
                        <span class="specialist"><?php echo $partner_form_position; ?></span>
                      <?php } ?>
                      <ul class="partner-contact flex">
                        <?php if ($partner_form_phone_number) { ?>
                          <li>
                            <a href="tel:<?php echo $partner_form_phone_number; ?>" class="call-us flex">
                              <span class="hide-tablet hide-desktop">Call Us</span>
                              <span class="fa-regular fa-phone"></span>
                              <span class="hide-mobile"><?php echo $partner_form_phone_number; ?></span>
                            </a>
                          </li>
                        <?php } ?>
                        <?php if ($partner_form_mail_id) { ?>
                          <li>
                            <a href="mailto:<?php echo $partner_form_mail_id; ?>" class="email flex">
                              <span class="hide-tablet hide-desktop">Email Us</span>
                              <span class="fa-regular fa-at"></span>
                              <span class="hide-mobile"><?php echo $partner_form_mail_id; ?></span>
                            </a>
                          </li>
                        <?php } ?>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <?php }
      }

      // Testimonial Shortcode
      function custom_quote_testimonial_shortcode()
      {
        ob_start();
        $testimonial_section_shortcode_select_testimonial = get_field('testimonial_section_shortcode_select_testimonial');
        foreach ($testimonial_section_shortcode_select_testimonial as $testimonial) {
          $post_id = $testimonial->ID;
          $testimonial_post_review = get_field('testimonial_post_review', $post_id);
          $testimonial_name = get_field('testimonial_post_name', $post_id);
          $testimonial_customer_type = get_field('testimonial_post_customer_type', $post_id);
          $testimonial_profile_image = get_field('testimonial_post_profile_image', $post_id);
          if (
            $testimonial_post_review ||
            $testimonial_name ||
            $testimonial_customer_type ||
            $testimonial_profile_image
          ) {
          ?>
            <div class="quote-partner relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 17.5C2 18.5609 2.42143 19.5783 3.17157 20.3284C3.92172 21.0786 4.93913 21.5 6 21.5C7.06087 21.5 8.07828 21.0786 8.82843 20.3284C9.57857 19.5783 10 18.5609 10 17.5C10 16.4391 9.57857 15.4217 8.82843 14.6716C8.07828 13.9214 7.06087 13.5 6 13.5C4.93913 13.5 3.92172 13.9214 3.17157 14.6716C2.42143 15.4217 2 16.4391 2 17.5Z" fill="#71A341" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round"></path>
                <path d="M14 17.5C14 18.5609 14.4214 19.5783 15.1716 20.3284C15.9217 21.0786 16.9391 21.5 18 21.5C19.0609 21.5 20.0783 21.0786 20.8284 20.3284C21.5786 19.5783 22 18.5609 22 17.5C22 16.4391 21.5786 15.4217 20.8284 14.6716C20.0783 13.9214 19.0609 13.5 18 13.5C16.9391 13.5 15.9217 13.9214 15.1716 14.6716C14.4214 15.4217 14 16.4391 14 17.5Z" fill="#71A341" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round"></path>
                <path d="M2 17.5V8.5C2 6.9087 2.63214 5.38258 3.75736 4.25736C4.88258 3.13214 6.4087 2.5 8 2.5M14 17.5V8.5C14 6.9087 14.6321 5.38258 15.7574 4.25736C16.8826 3.13214 18.4087 2.5 20 2.5" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round"></path>
              </svg>
              <?php if ($testimonial_post_review) { ?>
                <h3><?php echo $testimonial_post_review; ?></h3>
              <?php  } ?>
              <div class="avatar-main flex flex-vcenter">
                <?php if ($testimonial_profile_image) { ?>
                  <figure class="avatar-img object-fit-img radius-img-50">
                    <img src="<?php echo $testimonial_profile_image['url']; ?>" alt="<?php echo $testimonial_name; ?>" data-animation="fade-circle">
                  </figure>
                <?php  } ?>
                <div class="avatar-text fs-14">
                  <?php if ($testimonial_name) { ?>
                    <span class="optional-text dark no_margin"><?php echo $testimonial_name; ?></span>
                  <?php  } ?>
                  <?php if ($testimonial_customer_type) { ?>
                    <?php echo $testimonial_customer_type; ?>
                  <?php  } ?>
                </div>
              </div>
            </div>
        <?php
          }
        }

        return ob_get_clean();
      }
      add_shortcode('testimonial', 'custom_quote_testimonial_shortcode');

      // Free Assessment Section Function
      function display_free_assessment_section()
      {
        $heading = get_field('free_assessment_heading');
        $description = get_field('free_assessment_description');
        $free_assessment_or_link = get_field('free_assessment_or_link');
        $first_button_link = get_field('free_assessment_first_button_link');
        $first_button_text = get_field('free_assessment_first_button_text');
        $free_assessment_options_repeater = get_field('free_assessment_options_repeater', 'option');
        $second_button_text = get_field('free_assessment_second_button_text');
        $second_button_link = get_field('free_assessment_second_button_link');
        $desktop_image = get_field('free_assessment_desktop_image');
        $mobile_image = get_field('free_assessment_mobile_image');

        if (empty($desktop_image) && empty($mobile_image)) {
          $class= "no_image"; } else { $class= "";
        }

        if (
          $heading ||
          $description ||
          ($free_assessment_or_link == 'free assessment' && empty($free_assessment_options_repeater)) ||
          ($free_assessment_or_link == 'link' && $first_button_text && $first_button_link) ||
          ($second_button_text && $second_button_link) ||
          $desktop_image ||
          $mobile_image
      ) {
        ?>
        <section class="free-assessment-section bg-navy">
          <div class="free-assessment-main flex <?php echo $class; ?>">
            <div class="free-assessment-text flex flex-center">
              <div class="free-assessment-desc inverted">
                <?php if ($heading) { ?>
                  <h3 class="h1"><?php echo $heading; ?></h3>
                  <hr>
                <?php } ?>

                <?php if ($description) { ?>
                  <?php echo $description; ?>
                <?php } ?>

                <div class="free-assessment-btns flex">
                  <?php if ($free_assessment_or_link == 'free assessment') { ?>
                    <form>
                      <select name="assessment_type" id="assessment_type" onchange="if (this.value !== '#') window.location.href=this.value;">
                        <option value="#" selected disabled>Start your free assessment</option>
                        <?php foreach ($free_assessment_options_repeater as $repeater) {
                          $link = $repeater['free_assessment_option_link'];
                          $option = $repeater['free_assessment_option']; ?>
                          <option value="<?php echo esc_url($link); ?>"><?php echo esc_html($option); ?></option>
                        <?php } ?>
                      </select>
                    </form>
                  <?php } elseif ($free_assessment_or_link == 'link' && $first_button_text && $first_button_link) { ?>
                    <a href="<?php echo esc_url($first_button_link); ?>" class="button btn-green"><?php echo esc_html($first_button_text); ?></a>
                  <?php } ?>


                  <?php if ($second_button_text && $second_button_link) { ?>
                    <span><a href="<?php echo $second_button_link; ?>" class="button btn-gray btn-sm"><?php echo $second_button_text; ?></a></span>
                  <?php } ?>
                </div>
              </div>
            </div>
            <div class="free-assessment-image">
              <?php
              $image_src = $mobile_image ? $mobile_image : $desktop_image;

              if ($image_src) { ?>
                <picture class="object-fit parallax-image">
                  <source srcset="<?php echo $desktop_image['url']; ?>" media="(min-width:768px)">
                  <img src="<?php echo $image_src['url']; ?>" alt="<?php echo $image_src['alt']; ?>">
                </picture>
              <?php } ?>
            </div>
          </div>
        </section>
      <?php
      } }

      // Solar Assessment Section Function
      function solar_assessment_shortcode()
      {
        ob_start();

        // Retrieve ACF fields
        $icon_or_svg = get_field('poject_post_solar_assessment_shortcode_icon_or_svg');
        $icon_image = get_field('poject_post_solar_assessment_shortcode_icon');
        $svg_code = get_field('poject_post_solar_assessment_shortcode_svg');
        $sub_heading = get_field('poject_post_solar_assessment_shortcode_sub_heading');
        $heading = get_field('poject_post_solar_assessment_shortcode_heading');
        $first_button_text = get_field('poject_post_solar_assessment_shortcode_first_button_text');
        $first_button_link = get_field('poject_post_solar_assessment_shortcode_first_button_link');
        $second_button_text = get_field('poject_post_solar_assessment_shortcode_second_button_text');
        $second_button_link = get_field('poject_post_solar_assessment_shortcode_second_button_link');
        if (empty($svg_code) && empty($icon_image)) {
          $class = "no_icon";
        } else {
          $class = "";
        }

      ?>
        <div class="solar-assessment-wrap relative">
          <div class="solar-assessment-main flex flex-vcenter <?php echo $class; ?>">
            <?php if ($icon_image ||  $svg_code) { ?>
              <figure class="solar-assessment-icon object-fit-img">
                <?php
                // Check if the icon_or_svg field indicates an icon and display the image
                if ($icon_or_svg == 'icon' && $icon_image) { ?>
                  <img src="<?php echo  $icon_image['url']; ?> " alt="<?php echo  $icon_image['url']; ?>">
                <?php }
                // If it's an SVG, display the SVG code
                elseif ($icon_or_svg == 'svg' && $svg_code) {
                  echo $svg_code;
                }
                ?>
              </figure>
            <?php } ?>
            <div class="solar-assessment-text relative">
              <span class="optional-text f-dark sm"><?php echo $sub_heading; ?></span>
              <h3 class="h2"><?php echo $heading; ?></h3>
              <?php if ((!empty($first_button_link) && !empty($first_button_text))  ||  (!empty($second_button_link) && !empty($second_button_text))) {?>
              <div class="solar-assessment-btns flex">
    <?php if (!empty($first_button_link) && !empty($first_button_text)) { ?>
        <span><a href="<?php echo $first_button_link; ?>" class="button btn-md yellow"><?php echo $first_button_text; ?></a></span>
    <?php } ?>

    <?php if (!empty($second_button_link) && !empty($second_button_text)) { ?>
        <span><a href="<?php echo $second_button_link; ?>" class="button btn-md btn-transparent yellow"><?php echo $second_button_text; ?></a></span>
    <?php } ?>
</div>
<?php } ?>
            </div>
          </div>
        </div>
        <?php
        return ob_get_clean();
      }
      add_shortcode('solar_assessment', 'solar_assessment_shortcode');

      // Featured Solar Project Section Function
      function display_custom_solar_section()
      {
          $select_project = get_field('select_project');
      
          if ($select_project) {
              foreach ($select_project as $project) {
                  $post_id = $project->ID;
                  $post_title = get_the_title($post_id);
                  $post_thumbnail = get_the_post_thumbnail_url($post_id);
                  $post_permalink = get_permalink($post_id);
                  $custom_categories = get_the_terms($post_id, 'project_category');
                  $description = get_field('projects_post_short_description', $post_id);
                  
                  if (empty($post_thumbnail)) {
                      $class = 'no_image';
                  } else {
                      $class = '';
                  }
      ?>
                  <section class="custom-solar-section">
                      <div class="custom-solar-main flex <?php echo $class; ?>">
                          <div class="custom-solar-text flex flex-center">
                              <div class="custom-solar-desc fs-16">
                                  <ul class="post-cat-btns flex">
                                  <?php foreach ($custom_categories as $category) {
                                     $category_class = '';
                                     $icon_class = '';
                                     $category_name = trim(html_entity_decode($category->name));
                                     switch ($category_name) {
                                       case 'Solar':
                                         $category_class = 'solar';
                                         $icon_class = 'fa-brightness';
                                         break;
                                       case 'EV Charging':
                                         $category_class = 'ev-charging';
                                         $icon_class = 'fa-car';
                                         break;
                                       case 'Heating & Cooling':
                                         $category_class = 'heating';
                                         $icon_class = 'fa-fan';
                                         break;
                                       case 'Battery Storage':
                                         $category_class = 'battery-storage';
                                         $icon_class = 'fa-battery-bolt';
                                         break;
                                       default:
                                         // Set default values
                                         $category_class = '';
                                         $icon_class = '';
                                         break;
                                     } ?>
                                    <li class="<?php echo  $category_class; ?>"><span class="fa-solid <?php echo  $icon_class; ?>" aria-hidden="true"></span> <?php echo $category->name; ?></li>
                                  <?php } ?>
                                    </ul>
                                  <h2 class="h1"><?php echo $post_title; ?></h2>
                                  <hr>
                                  <?php if (!empty($description)) { ?>
                                      <?php echo $description; ?>
                                  <?php } ?>
                                  <div class="custom-solar-btns flex">
                                      <a href="<?php echo $post_permalink; ?>" class="button btn-md">More about this project</a>
                                      <a href="/projects/" class="button btn-gray btn-md">Solar projects</a>
                                  </div>
                              </div>
                          </div>
                          <?php if ($post_thumbnail) { ?>
                              <div class="custom-solar-image relative">
                                  <div class="sun-solar absolute" data-animation="solar-up">
                                      <div class="sun sun-1"></div>
                                      <div class="sun sun-2"></div>
                                      <div class="sun sun-3"></div>
                                      <div class="sun sun-4"></div>
                                      <div class="sun sun-5"></div>
                                  </div>
                                  <picture class="object-fit">
                                          <source srcset="<?php echo $post_thumbnail; ?>" media="(min-width:768px)">
                                          <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                                  </picture>
                              </div>
                          <?php } ?>
                      </div>
                  </section>
      <?php
              
          }
      }
    }
      

      // Featured Project Section Function
      function display_featured_project_section()
      {
        $featured_projects_heading = get_field('featured_projects_heading');
        $featured_projects_select_project = get_field('featured_projects_select_project');

        if (
          $featured_projects_heading ||
          is_array($featured_projects_select_project)
        ) { ?>

          <section class="featured-projects-section bg-elevated">
            <div class="container">
              <div class="featured-projects-main">
                <?php if ($featured_projects_heading) { ?>
                  <h2><?php echo $featured_projects_heading; ?></h2>
                <?php } ?>
                <div class="featured-projects-row flex">
                  <?php
                  $first_post = true;
                  foreach ($featured_projects_select_project as $project) {
                    $post_id = $project->ID;
                    $post_title = get_the_title($post_id);
                    $post_thumbnail = get_the_post_thumbnail_url($post_id);
                    $post_permalink = get_permalink($post_id);
                    $custom_categories = get_the_terms($post_id, 'project_category');
                    $partner_description = get_field('projects_post_short_description', $post_id);

                    if ($first_post) {
                      $first_post = false;
                  ?>
                      <div class="featured-projects-left">
                        <div class="featured-projects-image">
                          <?php if ($post_thumbnail) { ?>
                            <figure class="featured-projects-thumb object-fit">
                            <a href="<?php echo $post_permalink; ?>"> <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>"></a>
                            </figure>
                          <?php } ?>
                        </div>
                        <div class="featured-projects-text fs-16 relative">
                          <ul class="post-cat-btns flex">
                            <?php
                            get_categoryicon($custom_categories);
                            ?>

                          </ul>
                          <?php if ($post_title) { ?>
                            <h2><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                          <?php } ?>
                          <div class="line-clamp clamp-3">
                            <?php if ($partner_description) { ?>
                              <?php echo $partner_description; ?>
                            <?php } ?>
                          </div>
                        </div>
                      </div>
                  <?php
                    }
                  }
                  ?>
                  <div class="featured-projects-right flex">
                    <?php
                    $counter = 0;
                    foreach ($featured_projects_select_project as $project) {
                      $post_id = $project->ID;
                      $post_title = get_the_title($post_id);
                      $post_thumbnail = get_the_post_thumbnail_url($post_id);
                      $post_permalink = get_permalink($post_id);
                      $custom_categories = get_the_terms($post_id, 'project_category');
                      $partner_description = get_field('projects_post_short_description', $post_id);

                      $counter++;
                      if ($counter > 1) {
                    ?>
                        <div class="featured-projects-post flex bg-white">
                          <div class="featured-post-image">
                            <?php if ($post_thumbnail) { ?>
                              <figure class="object-fit-img">
                              <a href="<?php echo $post_permalink; ?>"> <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>"></a>
                              </figure>
                            <?php } ?>
                          </div>
                          <div class="featured-post-text fs-16 relative">
                            <ul class="post-cat-btns flex">
                              <?php
                              get_categoryicon($custom_categories);
                              ?>
                            </ul>
                            <?php if ($post_title) { ?>
                              <h2 class="h4"><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                            <?php } ?>
                            <div class="line-clamp clamp-3">
                              <?php if ($partner_description) { ?>
                                <?php echo $partner_description; ?>
                              <?php } ?>
                            </div>
                          </div>
                        </div>
                    <?php
                      }
                    }
                    ?>
                  </div>
                </div>
                <div class="featured-post-btn text-md-right">
                  <a href="/projects/" class="button btn-white btn-md">More projects</a>
                </div>
              </div>
            </div>
          </section>
        <?php }
      }

      // Supporting Resource Shortcode Function

      function supporting_resource_shortcode()
      {
        $icon_or_svg = get_field('supporting_resource_shortcode_icon_or_svg');
        $icon = get_field('supporting_resource_shortcode_icon');
        $svg = get_field('supporting_resource_shortcode_svg');
        $description = get_field('supporting_resource_shortcode_description');
        $button_text = get_field('supporting_resource_shortcode_button_text');
        $button_link = get_field('supporting_resource_shortcode_button_link');

        if (empty( $icon) && empty( $svg))
        {
          $class= "no_image"; } else { $class= "";
        }

        if (
          $icon_or_svg ||
          $description ||
          ($button_text &&
            $button_link)
        ) {
          ob_start(); ?>

          <div class="supporting-resource">
            <div class="supporting-resource-main flex <?php echo $class; ?>">
              <div class="supporting-resource-icon">
                <?php if ($icon_or_svg === 'icon' && !empty($icon)) { ?>
                  <img src="<?php echo $icon['url']; ?>" alt="<?php echo $icon['alt']; ?>">
                <?php } elseif ($icon_or_svg === 'svg' && !empty($svg)) { ?>
                  <figure>
                    <?php echo $svg; ?>
                  </figure>
                <?php } ?>
              </div>
              <div class="supporting-resource-text relative">
                <?php if ($description) { ?>
                  <?php echo $description; ?>
                <?php } ?>
                <?php if ($button_link && $button_text) { ?>
                  <a href="<?php echo $button_link; ?>" class="button btn-blue btn-sm"><?php echo $button_text; ?></a>
                <?php } ?>
              </div>
            </div>
          </div>

        <?php
          return ob_get_clean();
        }
      }
      add_shortcode('supporting_resource', 'supporting_resource_shortcode');


      // FAQ Shortcode Function

      function accordion_shortcode()
      {
        ob_start();

        $faq_shortcode = get_field('faq_shortcode');

        if (is_array($faq_shortcode)) {
        ?>
          <div class="accordion-main">
            <?php foreach ($faq_shortcode as $faq) {
              $question = $faq['faq_shortcode_question'];
              $answer = $faq['faq_shortcode_answer'];
              if ($question && $answer) {
            ?>
                <div class="accordion-list bg-white">
                  <?php if ($question) { ?>
                    <div class="accordion-header"><span class="fa-solid fa-plus" data-animation="fade-in"></span><?php echo $question; ?></div>
                  <?php }
                  if ($answer) { ?>
                    <div class="accordion-content fs-14">
                      <?php echo $answer; ?>
                    <?php } ?>
                    </div>
                </div>
            <?php }
            } ?>
          </div>
        <?php }

        return ob_get_clean();
      }

      add_shortcode('faq', 'accordion_shortcode');

      // FAQ Section Function
      function display_faq_section()
      {
        $faq_heading = get_field('faq_heading');
        $faq_categories = get_field('faq_category_repeater');
        $faq_description = get_field('faq_description');
        
        if (
          $faq_heading ||
          $faq_categories ||
          $faq_description  

        ) { ?>
        <section class="faqs-section bg-elevated">
          <div class="container sm">
            <div class="faqs-main">
              <?php if ($faq_heading) { ?>
                <div class="faqs-title aligncenter">
                  <h2><?php echo $faq_heading; ?></h2>
                </div>
              <?php } ?>
              <div class="faqs-mobile-btn flex relative">
                <span class="faqs-mobile-span">Installation</span>
                <span class="faqs-mobile-icon absolute"><img src="<?php echo get_template_directory_uri() ?>/images/installation-icon.svg" alt="installation-icon"></span>
              </div>
              <ul class="faq-tabs flex flex-center">
                <?php $i = 1;
                if($faq_categories) {
                foreach ($faq_categories as $category) {
                  $category_name = $category['faq_category_name'];
                  $category_icon = $category['faq_category_icon']; ?>
                  <li><a href="javascript:void(0);" data-name="tab-<?php echo $i; ?>"><?php echo $category_name; ?><span class="faq-tabs-icon"><img src="<?php echo $category_icon['url']; ?>" alt="<?php echo $category_icon['alt']; ?>"></a></li>
                <?php $i++;
                } } ?>
              </ul>

              <div class="faq-tabs-row">
                <?php $i = 1;
                 if($faq_categories) {
                foreach ($faq_categories as $category) {
                  $faqs = $category['faq_repeater']; ?>

                  <div class="faq-tab-content" data-value="tab-<?php echo $i; ?>">
                    <div class="accordion-main">
                      <?php foreach ($faqs as $faq) {
                        $question = $faq['faq_question'];
                        $answer = $faq['faq_answer']; ?>

                        <div class="accordion-list bg-white">
                          <div class="accordion-header">
                            <span class="fa-solid fa-plus" data-animation="fade-in"></span>
                            <?php echo $question; ?>
                          </div>
                          <div class="accordion-content fs-14">
                            <?php echo $answer; ?>
                          </div>
                        </div>
                      <?php } ?>
                    </div>
                  </div>
                <?php $i++;
                }  }?>
              </div>
              <?php if ($faq_description) { ?>
                <div class="faqs-desc aligncenter">
                  <?php echo $faq_description; ?>
                </div>
              <?php } ?>
            </div>
          </div>
        </section>
        <?php } }

      //Commercial Section Function

      function display_commercial_section()
      {
        $commercial_sub_heading = get_field('commercial_solutions_sub_heading');
        $commercial_heading = get_field('commercial_solutions_heading');
        $commercial_button_text = get_field('commercial_solutions_button_text');
        $commercial_button_link = get_field('commercial_solutions_button_link');
        $commercial_partners = get_field('commercial_solutions_partners_repeater');


        if (
          $commercial_sub_heading ||
          $commercial_heading ||
          ($commercial_button_text &&
            $commercial_button_link) || is_array($commercial_partners)
        ) { ?>
          <section class="best-partners-section">
            <div class="container">
              <div class="best-partners-main flex">
                <div class="best-partners-heading">
                  <?php if ($commercial_sub_heading) { ?>
                    <span class="optional-text"><?php echo $commercial_sub_heading; ?></span>
                  <?php } ?>
                  <?php if ($commercial_heading) { ?>
                    <h2><?php echo $commercial_heading; ?></h2>
                  <?php } ?>
                </div>
                <div class="best-partners-row flex">

                  <?php foreach ($commercial_partners as $partner) {
                    $desktop_image = $partner['commercial_solutions_partners_desktop_image'];
                    $mobile_image = $partner['commercial_solutions_partners_mobile_image'];
                    $partner_heading = $partner['commercial_solutions_partners_heading'];
                    $partner_description = $partner['commercial_solutions_partners_description'];
                    $partner_button_text = $partner['commercial_solutions_partners_button_text'];
                    $partner_button_link = $partner['commercial_solutions_partners_button_link'];
                  ?>
                    <div class="best-partners-list flex relative">
                      <?php if ($desktop_image || $mobile_image) { ?>
                        <div class="best-partners-image">
                          <picture class="best-partners-thumb object-fit">
                            <?php if ($desktop_image && $mobile_image) { ?>
                              <source srcset="<?php echo $desktop_image['url']; ?>" media="(min-width: 1024px)">
                              <img src="<?php echo $mobile_image['url']; ?>" alt="<?php echo $mobile_image['alt']; ?>">
                            <?php } elseif ($desktop_image) { ?>
                              <img src="<?php echo $desktop_image['url']; ?>" alt="<?php echo $desktop_image['alt']; ?>">
                            <?php } elseif ($mobile_image) { ?>
                              <img src="<?php echo $mobile_image['url']; ?>" alt="<?php echo $mobile_image['alt']; ?>">
                            <?php } ?>
                          </picture>
                        </div>
                      <?php } ?>
                      <div class="best-partners-text fs-16">
                        <?php if ($partner_heading) { ?>
                          <h2 class="h5"><?php echo $partner_heading; ?></h2>
                        <?php } ?>
                        <div class="line-clamp clamp-3">
                          <?php if ($partner_description) { ?>
                            <?php echo $partner_description; ?>
                          <?php } ?>
                        </div>
                        <?php if ($partner_button_link && $partner_button_text) { ?>
                          <div class="best-text-btn">
                            <a href="<?php echo $partner_button_link; ?>" class="button btn-sm btn-gray"><?php echo $partner_button_text; ?></a>
                          </div>
                        <?php } ?>
                      </div>
                    </div>
                  <?php } ?>
                </div>
                <?php if ($commercial_button_text && $commercial_button_link) { ?>
                  <div class="best-partners-btn">
                    <a href="<?php echo $commercial_button_link; ?>" class="button"><?php echo $commercial_button_text; ?></a>
                  </div>
                <?php } ?>
              </div>
            </div>
          </section>
        <?php }
      }

      //Featured Incentives Section Function
      function display_featured_incentives_section()
      {
          $featured_incentives_heading = get_field('featured_incentives_heading');
          $featured_incentives_select_incentive = get_field('featured_incentives_select_incentive');
              $args = array(
                  'post_type'      => 'post',
                  'posts_per_page' => 3,
				//   'category' => 9,
				'tax_query' => array(
					'relation' => 'AND',
					array(
						'taxonomy' => 'category',
						'field'    => 'term_id',
						'terms'    => 9,
					),
					array(
						'taxonomy' => 'province',
						'field'    => 'term_id',
						'terms'    => 33,
					),
				),
                    );
      
              $incentives_query = new WP_Query($args);
             $featured_incentives_select_incentive =array();
              if ($incentives_query->have_posts()) {
                  while ($incentives_query->have_posts()) :
                      $incentives_query->the_post();
                      $featured_incentives_select_incentive[] = get_the_ID();
                  endwhile;
                  wp_reset_postdata();
              }
      
          if ($featured_incentives_heading || !empty($featured_incentives_select_incentive)) { ?>
              <section class="featured-projects-section bg-elevated">
                  <div class="container">
                    <div class="featured-projects-main">
                      <?php if ($featured_incentives_heading) { ?>
                        <h2><?php echo $featured_incentives_heading; ?></h2>
                      <?php } ?>
                      <div class="featured-projects-row flex">
                        <?php
                        $first_post = true;
                        if(!empty($featured_incentives_select_incentive)){
                        foreach ($featured_incentives_select_incentive as $incentive) {
                          $post_id = $incentive;
                          $post_title = get_the_title($post_id);
                          $image = get_field('common_banner_desktop_image', $post_id);
                          $post_permalink = get_permalink($post_id);
                          $custom_categories = get_the_category($post_id);
                          $resources_post_short_introduction = get_field('resources_post_short_introduction', $post_id);
      
                          if ($first_post) {
                            $first_post = false;
                        ?>
      
                            <div class="featured-projects-left">
                              <?php if ($image) { ?>
                                <div class="featured-projects-image">
                                  <figure class="featured-projects-thumb object-fit">
                                    <img src="<?php echo $image['url']; ?>" alt="<?php echo $post_title; ?>">
                                  </figure>
                                </div>
                              <?php } ?>
                              <div class="featured-projects-text fs-16 relative">
                                <ul class="cat-links cat-orange">
                                  <?php
                                  foreach ($custom_categories as $category) {
                                    echo '<li>' . $category->name . '</li>';
                                  }
                                  ?>
                                </ul>
                                <?php if ($post_title) { ?>
                                  <h2><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                                <?php } ?>
                                <?php if ($resources_post_short_introduction) { ?>
                                  <div class="line-clamp clamp-3">
                                    <?php echo $resources_post_short_introduction; ?>
                                  </div>
                                <?php } ?>
                              </div>
                            </div>
                        <?php
                          }
                        }}
                        ?>

                        <div class="featured-projects-right flex">
                          <?php $counter = 0;
                             if(!empty($featured_incentives_select_incentive) && is_array($featured_incentives_select_incentive)){
                          foreach ($featured_incentives_select_incentive as $incentive) {
                            $post_id = $incentive;
                            $post_title = get_the_title($post_id);
                            $image = get_field('common_banner_desktop_image', $post_id);
                            $post_permalink = get_permalink($post_id);
                            $custom_categories = get_the_category($post_id);
                            $resources_post_short_introduction = get_field('resources_post_short_introduction', $post_id);
                            $counter++;
                            if ($counter > 1) {
                          ?>
                              <div class="featured-full-post flex bg-white">
                                <div class="featured-post-image">
									<?php if ($image) { ?>
										<figure class="object-fit-img">
										<img src="<?php echo $image['url']; ?>" alt="<?php echo $post_title; ?>">
										</figure>
									<?php } ?>
                                </div>
                                <div class="featured-post-text fs-16 relative">
                                  <ul class="cat-links cat-orange">
                                    <?php
                                    foreach ($custom_categories as $category) {
                                      echo '<li>' . $category->name . '</li>';
                                    }
                                    ?>
                                  </ul>
                                  <?php if ($post_title) { ?>
                                    <h2 class="h4"><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                                  <?php } ?> <?php if ($resources_post_short_introduction) { ?>
                                    <div class="line-clamp clamp-3">
                                      <?php echo $resources_post_short_introduction; ?>
								  </div>
                                    <?php } ?>
                                    
                                </div>
                              </div>
      
                          <?php
                            }
                          } }
                          ?>
                        </div>
                      </div>
                      <div class="featured-post-btn text-md-right">
                      <?php if (is_page_template('templates/why-aecon.php')) { ?>
                        <a href="/resources/" class="button btn-white btn-md">More partner offers</a>
                        <?php }  else { ?>
                        <a href="/resources/" class="button btn-white btn-md">More incentives</a>
                        <?php } ?>
                      </div>
                    </div>
                  </div>
                </section>
              <?php
          }
      }
      

      // load more ajax function

      function load_more_posts()
      {
        $total_posts = 0; 
        $offset = ($_POST['offset'])? $_POST['offset'] : 12;
        $incentives_category_id = get_cat_ID('incentives');
        $uncategorized = get_term_by('name', 'Uncategorized', 'category');
        $uncategorized_id = $uncategorized->term_id;
        $args = array(
          'post_type'      => 'post',
          'posts_per_page' => 12,
          'offset'          => $offset,
          'category__not_in' => array($incentives_category_id, $uncategorized_id),
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) :
          $total_posts = $query->post_count?$query->post_count:0;
          while ($query->have_posts()) : $query->the_post();
            $post_id = get_the_ID();
            $image = get_field('common_banner_desktop_image', $post_id);
            $custom_categories = get_the_category($post_id);
            $resources_post_short_introduction = get_field('resources_post_short_introduction', $post_id);
            if (empty($image)) {
              $class = 'no_image';
            } else {
              $class = '';
            } ?>

            <div class="card1-of-4 fs-16">
              <div class="card-main bg-elevated <?php echo $class; ?>">
                <?php if ($image) { ?>
                  <div class="card-image relative">
                    <figure class="card-thumb object-fit">
                      <?php
                      echo '<img src="' . $image['url'] . '" alt="' . get_the_title() . '">';
                      ?>
                    </figure>
                  </div>
                <?php } ?>
                <div class="card-text">
                  <ul class="res-categories flex">
                    <?php
                    foreach ($custom_categories as $category) {
                      echo '<li>' . $category->name . '</li>';
                    }
                    ?>
                  </ul>
                  <h3 class="h4"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                  <div class="line-clamp clamp-3">
                    <?php
                    if ($resources_post_short_introduction) {
                      echo $resources_post_short_introduction;
                    }
                    ?>
                  </div>
                </div>
              </div>
            </div>
           
        <?php
          endwhile;
        endif;
        wp_reset_postdata();
        ?>
         <div id ="total_post_count" data-postcount="<?php echo $total_posts; ?>"> </div>
        </div>

      <?php
        exit;
      }

      add_action('wp_ajax_load_more_posts', 'load_more_posts');
      add_action('wp_ajax_nopriv_load_more_posts', 'load_more_posts');



      // Hook to run after Formidable Form entry creation
      add_action('frm_after_create_entry', 'set_global_flag_on_form_submission', 10, 2);

      function set_global_flag_on_form_submission($entry_id, $form_id)
      {
        // Check if the submitted form is the one with ID 7
        if ($form_id == 7) {
          // Set a global flag to indicate a successful form submission
          global $form_submission_success;
          $form_submission_success = true;
        }
      }

      // testimonials load more function

      add_action('wp_ajax_load_more_testimonials', 'load_more_testimonials');
      add_action('wp_ajax_nopriv_load_more_testimonials', 'load_more_testimonials');

      function load_more_testimonials()
      {
        $offset = isset($_POST['offset']) ? intval($_POST['offset']) : 17;
        $search = $_POST['catValue'];

      ?>
        <section class="what-people-section">
          <div class="container">
            <div class="what-people-main">
              <?php
              $args = array(
                'post_type'      => 'testimonial',
                'posts_per_page' => 8,
                'offset'         => $offset,
              );

              if (!empty($search)) {
                $args['tax_query'] = array(
                  array(
                    'taxonomy' => 'testimonials_category',
                    'field'    => 'slug',
                    'terms'    => $search,
                  ),
                );
              }

              $testimonial = new WP_Query($args);
              $post_count = $testimonial->post_count;
              $i = 1;
              $count = 1;
              if ($testimonial->have_posts()) {
                while ($testimonial->have_posts()) {
                  $testimonial->the_post();
                  $testimonial_post_review = get_field('testimonial_post_review', $testimonial->ID);
                  $testimonial_post_profile_image = get_field('testimonial_post_profile_image', $testimonial->ID);
                  $testimonial_post_name = get_field('testimonial_post_name', $testimonial->ID);
                  $testimonial_post_position = get_field('testimonial_post_position', $testimonial->ID);
                  $testimonial_post_video_type = get_field('testimonial_post_video_type', $testimonial->ID);
                  $testimonial_post_vimeo_id = get_field('testimonial_post_vimeo_id', $testimonial->ID);
                  $testimonial_post_youtube_id = get_field('testimonial_post_youtube_id', $testimonial->ID);
                  $testimonial_post_microsoft_stream_iframe = get_field('testimonial_post_microsoft_stream_iframe', $testimonial->ID);
                  $testimonial_post_video_mobile_thumbnail = get_field('testimonial_post_video_mobile_thumbnail', $testimonial->ID);
                  $testimonial_post_video_desktop_thumbnail = get_field('testimonial_post_video_desktop_thumbnail', $testimonial->ID);
                  if ($i == 1) {
                    echo '<div class="what-people-grids flex">';
                  }
                  if ($i <= 3) {
              ?>
                    <div class="what-people-grid fs-16 bg-elevated">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" data-animation="ui-svg-dot">
                        <path d="M2 17.5C2 18.5609 2.42143 19.5783 3.17157 20.3284C3.92172 21.0786 4.93913 21.5 6 21.5C7.06087 21.5 8.07828 21.0786 8.82843 20.3284C9.57857 19.5783 10 18.5609 10 17.5C10 16.4391 9.57857 15.4217 8.82843 14.6716C8.07828 13.9214 7.06087 13.5 6 13.5C4.93913 13.5 3.92172 13.9214 3.17157 14.6716C2.42143 15.4217 2 16.4391 2 17.5Z" fill="#71A341" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                        <path d="M14 17.5C14 18.5609 14.4214 19.5783 15.1716 20.3284C15.9217 21.0786 16.9391 21.5 18 21.5C19.0609 21.5 20.0783 21.0786 20.8284 20.3284C21.5786 19.5783 22 18.5609 22 17.5C22 16.4391 21.5786 15.4217 20.8284 14.6716C20.0783 13.9214 19.0609 13.5 18 13.5C16.9391 13.5 15.9217 13.9214 15.1716 14.6716C14.4214 15.4217 14 16.4391 14 17.5Z" fill="#71A341" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                        <path d="M2 17.5V8.5C2 6.9087 2.63214 5.38258 3.75736 4.25736C4.88258 3.13214 6.4087 2.5 8 2.5M14 17.5V8.5C14 6.9087 14.6321 5.38258 15.7574 4.25736C16.8826 3.13214 18.4087 2.5 20 2.5" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                      </svg>
                      <?php if (!empty($testimonial_post_review)) { ?>
                        <div class="post_count_testimonials">
                          <?php echo $testimonial_post_review; ?>
                        </div>
                      <?php } ?>

                      <?php if (!empty($testimonial_post_profile_image['url'])) { ?>
                        <div class="avatar-main flex flex-vcenter">
                          <figure class="avatar-img object-fit-img radius-img-50">
                            <img src="<?php echo $testimonial_post_profile_image['url']; ?>" alt="<?php echo $testimonial_post_profile_image['alt']; ?>" data-animation="fade-circle">
                          </figure>
                          <div class="avatar-text fs-14">
                            <?php if (!empty($testimonial_post_name)) { ?>
                              <span class="optional-text dark no_margin"><?php echo $testimonial_post_name; ?></span>
                            <?php } ?>
                            <?php if (!empty($testimonial_post_position)) { ?>
                              <?php echo $testimonial_post_position; ?>
                            <?php } ?>
                          </div>
                        </div>
                      <?php } ?>
                    </div>

                  <?php
                  }
                  if ($i == 3) {
                    echo '</div>';
                  }
                  // Validate and assign video source based on video type
                  if ($testimonial_post_video_type === 'vimeo') {
                    $video_source = 'https://player.vimeo.com/video/' . $testimonial_post_vimeo_id;
                  } elseif ($testimonial_post_video_type === 'youtube') {
                    $video_source = 'https://www.youtube.com/embed/' . $testimonial_post_youtube_id;
                  } elseif ($testimonial_post_video_type === 'microsoft_stream') {
                    $video_source = $testimonial_post_microsoft_stream_iframe;
                  }
                  ?>
                  <?php if ($i == 4) { ?>
                    <div class="what-people-quote flex flex-vcenter">
                      <div class="what-quote-image relative">
                        <?php if ((!empty($video_source)) && ((!empty($testimonial_post_video_mobile_thumbnail)) || (!empty($testimonial_post_video_desktop_thumbnail)))) { ?>
                          <picture class="object-fit">
                            <?php if (!empty($testimonial_post_video_mobile_thumbnail)) { ?>
                              <source srcset="<?php echo $testimonial_post_video_mobile_thumbnail['url']; ?>" media="(max-width: 739px)">
                            <?php } ?>
                            <?php if (!empty($testimonial_post_video_desktop_thumbnail)) { ?>
                              <source srcset="<?php echo $testimonial_post_video_desktop_thumbnail['url']; ?>" media="(min-width: 740px)">
                            <?php } ?>
                            <img src="<?php echo (!empty($testimonial_post_video_mobile_thumbnail)) ? $testimonial_post_video_mobile_thumbnail['url'] : $testimonial_post_video_desktop_thumbnail['url']; ?>" alt="">
                          </picture>
                          <div class="play-btn-main flex flex-center">
                            <div class="play-btn relative">
                              <a href="https://www.youtube.com/watch?v=m4UDncEqwjg" class="popup-youtube play-btn-bg flex flex-center">
                                <span class="btn-circle"></span>
                                <span></span>
                                <span></span>
                                video
                              </a>
                            </div>
                          </div>
                        <?php } ?>
                      </div>
                      <div class="what-quote-text">
                        <?php if (!empty($testimonial_post_review)) { ?>
                          <div class="post_count_testimonials">
                            <h2 class="h4"><?php echo $testimonial_post_review; ?></h2>
                          </div>
                        <?php } ?>
                        <div class="what-quote-desc fs-14">
                          <?php if (!empty($testimonial_post_name)) { ?>
                            <span class="optional-text green"><?php echo $testimonial_post_name; ?></span>
                          <?php } ?>
                          <?php if (!empty($testimonial_post_position)) { ?>
                            <?php echo $testimonial_post_position; ?>
                          <?php } ?>
                        </div>
                      </div>
                    </div>
              <?php
                  }
                  $i++;

                  if ($i == 5) {
                    $i = 1;
                    $count++;
                  }
                  if ($count == 3) {
                    break;
                  }
                }
                wp_reset_postdata();
              }
              ?>

            </div>
          </div>
        </section>



        <?php
        $args = array(
          'post_type' => 'testimonial',
          'posts_per_page' => 1,
          'offset'         => $offset + 8,
        );
        if (!empty($search)) {
          $args['tax_query'] = array(
            array(
              'taxonomy' => 'testimonials_category',
              'field'    => 'slug',
              'terms'    => $search,
            ),
          );
        }

        $testimonial = new WP_Query($args);
        $i = 1;
        $count = 1;
        if ($testimonial->have_posts()) {
          while ($testimonial->have_posts()) {
            $testimonial->the_post();
            $testimonial_post_review = get_field('testimonial_post_review', $testimonial->ID);
            $testimonial_post_profile_image = get_field('testimonial_post_profile_image', $testimonial->ID);
            $testimonial_post_name = get_field('testimonial_post_name', $testimonial->ID);
            $testimonial_post_position = get_field('testimonial_post_position', $testimonial->ID);
            $testimonial_post_video_type = get_field('testimonial_post_video_type', $testimonial->ID);
            $testimonial_post_vimeo_id = get_field('testimonial_post_vimeo_id', $testimonial->ID);
            $testimonial_post_youtube_id = get_field('testimonial_post_youtube_id', $testimonial->ID);
            $testimonial_post_microsoft_stream_iframe = get_field('testimonial_post_microsoft_stream_iframe', $testimonial->ID);
            $testimonial_post_video_mobile_thumbnail = get_field('testimonial_post_video_mobile_thumbnail', $testimonial->ID);
            $testimonial_post_video_desktop_thumbnail = get_field('testimonial_post_video_desktop_thumbnail', $testimonial->ID);
        ?>

            <section class="blockquote-section relative">
              <div class="background-bg blockquote-bg parallax-bg"></div>
              <div class="blockquote-overlay background-bg bg-navy"></div>
              <div class="container">
                <div class="blockquote-main flex flex-center relative">
                  <div class="blockquote-text inverted">
                  <div class="blockquote-text-icon relative">
                    <h2>
                      <?php if (!empty($testimonial_post_review)) { ?>
                        <div class="post_count_testimonials">
                          <?php echo $testimonial_post_review; ?>
                        </div>
                      <?php } ?>
                    </h2>
                      </div>
                    <?php if (!empty($testimonial_post_profile_image['url'])) { ?>
                      <div class="quote-avatar-main flex flex-center">
                        <figure class="quote-avatar-img object-fit-img radius-img-50">
                          <img src="<?php echo $testimonial_post_profile_image['url']; ?>" alt="<?php echo $testimonial_post_profile_image['alt']; ?>">
                        </figure>
                        <div class="quote-avatar-text fs-14">
                          <?php if (!empty($testimonial_post_name)) { ?>
                            <span class="optional-text no_margin"><?php echo $testimonial_post_name; ?></span>
                          <?php } ?>
                          <?php if (!empty($testimonial_post_position)) { ?>
                            <p><?php echo $testimonial_post_position; ?></p>
                          <?php } ?>
                        </div>
                      </div>
                    <?php } ?>
                  </div>
                </div>
              </div>
            </section>
        <?php
          }
          wp_reset_postdata();
        }
        ?>
        <section class="what-people-section what-people-second">
          <div class="container">
            <div class="what-people-main">
              <?php
              $args = array(
                'post_type' => 'testimonial',
                'posts_per_page' => 8,
                'offset'         => $offset + 9,
              );
              if (!empty($search)) {
                $args['tax_query'] = array(
                  array(
                    'taxonomy' => 'testimonials_category',
                    'field'    => 'slug',
                    'terms'    => $search,
                  ),
                );
              }

              $testimonial = new WP_Query($args);
              $i = 1;
              $count = 1;
              if ($testimonial->have_posts()) {
                while ($testimonial->have_posts()) {
                  $testimonial->the_post();
                  $testimonial_post_review = get_field('testimonial_post_review', $testimonial->ID);
                  $testimonial_post_profile_image = get_field('testimonial_post_profile_image', $testimonial->ID);
                  $testimonial_post_name = get_field('testimonial_post_name', $testimonial->ID);
                  $testimonial_post_position = get_field('testimonial_post_position', $testimonial->ID);
                  $testimonial_post_video_type = get_field('testimonial_post_video_type', $testimonial->ID);
                  $testimonial_post_vimeo_id = get_field('testimonial_post_vimeo_id', $testimonial->ID);
                  $testimonial_post_youtube_id = get_field('testimonial_post_youtube_id', $testimonial->ID);
                  $testimonial_post_microsoft_stream_iframe = get_field('testimonial_post_microsoft_stream_iframe', $testimonial->ID);
                  $testimonial_post_video_mobile_thumbnail = get_field('testimonial_post_video_mobile_thumbnail', $testimonial->ID);
                  $testimonial_post_video_desktop_thumbnail = get_field('testimonial_post_video_desktop_thumbnail', $testimonial->ID);
                  if ($i == 2) {
                    echo '<div class="what-people-grids flex">';
                  }
                  if ($i <= 4 && $i > 1) {
              ?>
                    <div class="what-people-grid fs-16 bg-elevated">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" data-animation="ui-svg-dot">
                        <path d="M2 17.5C2 18.5609 2.42143 19.5783 3.17157 20.3284C3.92172 21.0786 4.93913 21.5 6 21.5C7.06087 21.5 8.07828 21.0786 8.82843 20.3284C9.57857 19.5783 10 18.5609 10 17.5C10 16.4391 9.57857 15.4217 8.82843 14.6716C8.07828 13.9214 7.06087 13.5 6 13.5C4.93913 13.5 3.92172 13.9214 3.17157 14.6716C2.42143 15.4217 2 16.4391 2 17.5Z" fill="#71A341" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                        <path d="M14 17.5C14 18.5609 14.4214 19.5783 15.1716 20.3284C15.9217 21.0786 16.9391 21.5 18 21.5C19.0609 21.5 20.0783 21.0786 20.8284 20.3284C21.5786 19.5783 22 18.5609 22 17.5C22 16.4391 21.5786 15.4217 20.8284 14.6716C20.0783 13.9214 19.0609 13.5 18 13.5C16.9391 13.5 15.9217 13.9214 15.1716 14.6716C14.4214 15.4217 14 16.4391 14 17.5Z" fill="#71A341" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                        <path d="M2 17.5V8.5C2 6.9087 2.63214 5.38258 3.75736 4.25736C4.88258 3.13214 6.4087 2.5 8 2.5M14 17.5V8.5C14 6.9087 14.6321 5.38258 15.7574 4.25736C16.8826 3.13214 18.4087 2.5 20 2.5" stroke="#71A341" stroke-width="2.5" stroke-linejoin="round" />
                      </svg>
                      <?php if (!empty($testimonial_post_review)) { ?>
                        <div class="post_count_testimonials">
                          <?php echo $testimonial_post_review; ?>
                        </div>
                      <?php } ?>

                      <?php if (!empty($testimonial_post_profile_image['url'])) { ?>
                        <div class="avatar-main flex flex-vcenter">
                          <figure class="avatar-img object-fit-img radius-img-50">
                            <img src="<?php echo $testimonial_post_profile_image['url']; ?>" alt="<?php echo $testimonial_post_profile_image['alt']; ?>" data-animation="fade-circle">
                          </figure>
                          <div class="avatar-text fs-14">
                            <?php if (!empty($testimonial_post_name)) { ?>
                              <span class="optional-text dark no_margin"><?php echo $testimonial_post_name; ?></span>
                            <?php } ?>
                            <?php if (!empty($testimonial_post_position)) { ?>
                              <?php echo $testimonial_post_position; ?>
                            <?php } ?>
                          </div>
                        </div>
                      <?php } ?>
                    </div>

                  <?php
                  }
                  if ($i == 4) {
                    echo '</div>';
                  }


                  // Validate and assign video source based on video type
                  if ($testimonial_post_video_type === 'vimeo') {
                    $video_source = 'https://player.vimeo.com/video/' . $testimonial_post_vimeo_id;
                  } elseif ($testimonial_post_video_type === 'youtube') {
                    $video_source = 'https://www.youtube.com/embed/' . $testimonial_post_youtube_id;
                  } elseif ($testimonial_post_video_type === 'microsoft_stream') {
                    $video_source = $testimonial_post_microsoft_stream_iframe;
                  }
                  ?>
                  <?php if ($i == 1) { ?>
                    <div class="what-people-quote flex flex-vcenter">
                      <div class="what-quote-image relative">
                        <?php if ((!empty($video_source)) && ((!empty($testimonial_post_video_mobile_thumbnail)) || (!empty($testimonial_post_video_desktop_thumbnail)))) { ?>
                          <picture class="object-fit">
                            <?php if (!empty($testimonial_post_video_mobile_thumbnail)) { ?>
                              <source srcset="<?php echo $testimonial_post_video_mobile_thumbnail['url']; ?>" media="(max-width: 739px)">
                            <?php } ?>
                            <?php if (!empty($testimonial_post_video_desktop_thumbnail)) { ?>
                              <source srcset="<?php echo $testimonial_post_video_desktop_thumbnail['url']; ?>" media="(min-width: 740px)">
                            <?php } ?>
                            <img src="<?php echo (!empty($testimonial_post_video_mobile_thumbnail)) ? $testimonial_post_video_mobile_thumbnail['url'] : $testimonial_post_video_desktop_thumbnail['url']; ?>" alt="">
                          </picture>
                          <div class="play-btn-main flex flex-center">
                            <div class="play-btn relative">
                              <a href="https://www.youtube.com/watch?v=m4UDncEqwjg" class="popup-youtube play-btn-bg flex flex-center">
                                <span class="btn-circle"></span>
                                <span></span>
                                <span></span>
                                video
                              </a>
                            </div>
                          </div>
                        <?php } ?>
                      </div>
                      <div class="what-quote-text">
                        <?php if (!empty($testimonial_post_review)) { ?>
                          <div class="post_count_testimonials">
                            <h2 class="h4"><?php echo $testimonial_post_review; ?></h2>
                          </div>
                        <?php } ?>
                        <div class="what-quote-desc fs-14">
                          <?php if (!empty($testimonial_post_name)) { ?>
                            <span class="optional-text green"><?php echo $testimonial_post_name; ?></span>
                          <?php } ?>
                          <?php if (!empty($testimonial_post_position)) { ?>
                            <?php echo $testimonial_post_position; ?>
                          <?php } ?>
                        </div>
                      </div>
                    </div>
              <?php
                  }
                  $i++;

                  if ($i == 5) {
                    $i = 1;
                    $count++;
                  }
                  if ($count == 3) {
                    break;
                  }
                }
                wp_reset_postdata();
              }
              ?>
            </div>
          </div>
        </section>
        <?php
        wp_die();
      }



      add_action('frm_after_create_entry', 'process_testimonial_submission', 30, 2);

      function process_testimonial_submission($entry_id, $form_id)
      {
        if ($form_id == 9) {
          create_testimonial_post($entry_id);
        }
      }

      function create_testimonial_post($entry_id)
      {
        // Get form entry data


        $form_data = FrmEntry::getOne($entry_id);


        // Verify that form_data is not empty
        if (empty($form_data)) {
          error_log('Error: Form data not found for entry ID ' . $entry_id);
          return;
        }

        // Extract relevant form fields
        $testimonial_title = $form_data->name;

        // Create testimonial post
        $testimonial_post = array(
          'post_title'    => $testimonial_title,
          'post_status'   => 'draft',
          'post_type'     => 'testimonial',
        );

        $post_id = wp_insert_post($testimonial_post);

        $field_id = 83;
        $testimonial_review = FrmEntryMeta::get_entry_meta_by_field($entry_id, $field_id);
        $field_id = 84;
        $testimonial_profile_image = FrmEntryMeta::get_entry_meta_by_field($entry_id, $field_id);
        $field_id = 80;
        $testimonial_customer_type = FrmEntryMeta::get_entry_meta_by_field($entry_id, $field_id);
        $field_id = 78;
        $testimonial_email = FrmEntryMeta::get_entry_meta_by_field($entry_id, $field_id);

        // Update ACF fields for the testimonial post
        update_field('testimonial_post_name', $testimonial_title, $post_id);
        update_field('testimonial_post_review', $testimonial_review, $post_id);
        update_field('testimonial_post_profile_image', $testimonial_profile_image, $post_id);
        update_field('testimonial_post_customer_type', $testimonial_customer_type, $post_id);
        update_field('testimonial_post_email', $testimonial_email, $post_id);
      }

      function get_categoryicon($custom_categories)
      {
if($custom_categories) {
        foreach ($custom_categories as $category) {
          $category_class = '';
          $icon_class = '';
          $category_name = trim(html_entity_decode($category->name));
          switch ($category_name) {
            case 'Solar':
              $category_class = 'solar';
              $icon_class = 'fa-brightness';
              break;
            case 'EV Charging':
              $category_class = 'ev-charging';
              $icon_class = 'fa-car';
              break;
            case 'Heating & Cooling':
              $category_class = 'heating';
              $icon_class = 'fa-fan';
              break;
            case 'Battery Storage':
              $category_class = 'battery-storage';
              $icon_class = 'fa-battery-bolt';
              break;
            default:
              // Set default values
              $category_class = '';
              $icon_class = '';
              break;
          }

          echo '<li class = "' . $category_class . '"><span class="fa-solid ' . $icon_class . '" aria-hidden="true"></span>' . $category->name . '</li>';
        } }
      }


      //Projects load more Ajax Function

      function load_more_projects()
      {
        $page = $_POST['page'];
        $search = $_POST['catValue'];
        $args = array(
          'post_type'      => 'project',
          'posts_per_page' => 17, // Adjust the number of posts per page
          'paged'          => $page,
        );

        if (!empty($search)) {
          $args['tax_query'] = array(
            array(
              'taxonomy' => 'project_category',
              'field'    => 'slug',
              'terms'    => $search,
            ),
          );
        }
        $project_query = new WP_Query($args);

        $i = 1;
        if ($project_query->have_posts()) {
          while ($project_query->have_posts()) {
            $project_query->the_post();

            $post_id            = get_the_ID();
            $post_title         = get_the_title();
            $post_thumbnail     = get_the_post_thumbnail_url();
            $post_permalink     = get_permalink();
            $custom_categories  = get_the_terms($post_id, 'project_category');
            $partner_description = get_field('projects_post_short_description', $post_id);
        ?>
            <?php if ($i == 1) { ?>
              <section class="project-repeater-one bg-elevated">
                <div class="container">
                  <div class="card-module-main">
                    <div class="card-row-of-3 flex">
                    <?php }
                  if ($i <= 3) { ?>

                      <div class="card1-of-3 fs-16">
                        <div class="card-main bg-white">
                          <div class="card-image relative">
                            <figure class="card-thumb object-fit">
                              <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                            </figure>
                          </div>
                          <div class="card-text">
                            <ul class="post-cat-btns flex">
                              <?php
                              get_categoryicon($custom_categories);
                              ?>
                            </ul>
                            <h3 class="h4"><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h3>
                            <div class="line-clamp clamp-3">
                              <p><?php echo $partner_description; ?></p>
                            </div>
                          </div>
                        </div>
                      </div>

                    <?php }
                  if ($i == 3) { ?>

                    </div>
                  </div>
                </div>
              </section>
            <?php }
                  if ($i == 4) { ?>

              <div class="fluid-container relative">
                <section class="custom-solar-section bg-white">
                  <div class="custom-solar-main flex">
                    <div class="custom-solar-text flex flex-center">
                      <div class="custom-solar-desc fs-16">
                        <ul class="post-cat-btns flex">
                          <?php
                          get_categoryicon($custom_categories);
                          ?>
                        </ul>
                        <h2 class="h1"><?php echo $post_title; ?></h2>
                        <hr>
                        <p><?php echo $partner_description; ?></p>
                        <div class="custom-solar-btns flex">
                          <a href="<?php echo $post_permalink; ?>" class="button bgn-md">Learn more</a>
                          <a href="<?php echo $post_permalink; ?>" class="button btn-gray btn-md">More about Battery Storage</a>
                        </div>
                      </div>
                    </div>
                    <div class="custom-solar-image relative">
                      <div class="battery-solar absolute" data-animation="battery-solar-anim">
                        <div class="battery battery-1"></div>
                        <div class="battery battery-2"></div>
                        <div class="battery battery-3"></div>
                        <div class="battery battery-4"></div>
                        <div class="battery battery-5"></div>
                      </div>
                      <picture class="object-fit">
                        <source srcset="<?php echo get_template_directory_uri(); ?>/images/battery-store@2x.jpg" media="(min-width:768px)">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/battery-store-mobile@2x.jpg" alt="battery-store-mobile">

                      </picture>
                    </div>
                  </div>
                </section>
              </div>

              <?php }

                  if ($i >= 5 && $i <= 7) {
                    if ($i == 5) { ?>
                <section class="project-repeater-two bg-elevated">
                  <div class="container">
                    <div class="card-module-main">
                      <div class="card-row-of-3 flex">

                      <?php } ?>

                      <div class="card1-of-3 fs-16">
                        <div class="card-main bg-white">
                          <div class="card-image relative">
                            <figure class="card-thumb object-fit">
                              <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                            </figure>
                          </div>
                          <div class="card-text">
                            <ul class="res-categories flex">
                              <?php
                              get_categoryicon($custom_categories);
                              ?>
                            </ul>
                            <h3 class="h4"><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h3>
                            <div class="line-clamp clamp-3">
                              <p><?php echo $partner_description; ?></p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <?php if ($i == 7) { ?>

                      </div>
                    </div>
                  </div>
                </section>
            <?php  }
                    } ?>

            <?php if ($i >= 7 && $i <= 10) {
              if ($i == 7) { ?>
                <section class="featured-projects-section bg-elevated">
                  <div class="container">
                    <div class="featured-projects-main">
                      <div class="featured-projects-row flex">
                      <?php } ?>

                      <?php if ($i == 7) { ?>
                        <div class="featured-projects-left">
                          <div class="featured-projects-image">
                            <figure class="featured-projects-thumb object-fit">
                              <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                            </figure>
                          </div>
                          <div class="featured-projects-text fs-16 relative">
                            <ul class="cat-links post-cat-btns flex">
                              <?php
                              get_categoryicon($custom_categories);
                              ?>
                            </ul>
                            <h2><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                            <div class="line-clamp clamp-3">
                              <p><?php echo $partner_description; ?></p>
                            </div>
                          </div>
                        </div>
                      <?php } ?>
                      <?php if ($i == 8) { ?>
                        <div class="featured-projects-right flex">
                        <?php }
                      if ($i == 8) { ?>
                          <div class="featured-full-post right-image flex bg-white">
                            <div class="featured-post-image">
                              <figure class="object-fit-img">
                                <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                              </figure>
                            </div>
                            <div class="featured-post-text fs-16 relative">
                              <ul class="post-cat-btns flex">
                                <?php
                                get_categoryicon($custom_categories);
                                ?>
                              </ul>
                              <h2 class="h4"><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                              <div class="line-clamp clamp-3">
                                <p><?php echo $partner_description; ?></p>
                              </div>
                            </div>
                          </div>
                        <?php } ?>
                        <?php if ($i == 9) { ?>
                          <div class="featured-full-post right-image flex bg-white">
                            <div class="featured-post-image">
                              <figure class="object-fit-img">
                                <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                              </figure>
                            </div>
                            <div class="featured-post-text fs-16 relative">
                              <ul class="post-cat-btns flex">
                                <?php
                                get_categoryicon($custom_categories);
                                ?>
                              </ul>
                              <h2 class="h4"><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                              <div class="line-clamp clamp-3">
                                <p><?php echo $partner_description; ?></p>
                              </div>
                            </div>
                          </div>
                        <?php } ?>
                        <?php if ($i == 9) { ?>
                        </div>
                      <?php } ?>



                      <?php if ($i == 10) { ?>
                      </div>
                    </div>
                  </div>
                </section>
            <?php }
                    } ?>




            <?php if ($i == 11) { ?>
              <div class="fluid-container relative">
                <section class="custom-solar-section bg-white">
                  <div class="custom-solar-main flex">
                    <div class="custom-solar-text flex flex-center">
                      <div class="custom-solar-desc fs-16">
                        <ul class="post-cat-btns flex">
                          <?php
                          get_categoryicon($custom_categories);
                          ?>
                        </ul>
                        <h2 class="h1"><?php echo $post_title; ?></h2>
                        <p><?php echo $partner_description; ?></p>
                        <div class="custom-solar-btns flex">
                          <a href="<?php echo $post_permalink; ?>" class="button btn-md">Learn more</a>
                          <a href="<?php echo $post_permalink; ?>" class="button btn-gray btn-md">More about Battery Storage</a>
                        </div>
                      </div>
                    </div>
                    <div class="custom-solar-image relative">
                      <div class="sun-solar absolute" data-animation="solar-up">
                        <div class="sun sun-1"></div>
                        <div class="sun sun-2"></div>
                        <div class="sun sun-3"></div>
                        <div class="sun sun-4"></div>
                        <div class="sun sun-5"></div>
                      </div>
                      <picture class="object-fit">
                        <source srcset="<?php echo get_template_directory_uri(); ?>/images/solar-house@2x.jpg" media="(min-width:768px)">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/solar-house-mobile@2x.jpg" alt="battery-store-mobile">
                      </picture>
                    </div>
                  </div>
                </section>
              </div>
            <?php } ?>

            <?php if ($i >= 11 && $i <= 14) {
              if ($i == 11) { ?>
                <section class="featured-projects-section bg-elevated">
                  <div class="container">
                    <div class="featured-projects-main">
                      <div class="featured-projects-row flex">
                      <?php } ?>

                      <?php if ($i == 11) { ?>
                        <div class="featured-projects-left">
                          <div class="featured-projects-image">
                            <figure class="featured-projects-thumb object-fit">
                              <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                            </figure>
                          </div>
                          <div class="featured-projects-text fs-16 relative">
                            <ul class="cat-links post-cat-btns flex">
                              <?php
                              get_categoryicon($custom_categories);
                              ?>
                            </ul>
                            <h2><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                            <div class="line-clamp clamp-3">
                              <p><?php echo $partner_description; ?></p>
                            </div>
                          </div>
                        </div>
                      <?php } ?>
                      <?php if ($i == 12) { ?>
                        <div class="featured-projects-right flex">
                        <?php }
                      if ($i == 12) { ?>
                          <div class="featured-full-post right-image flex bg-white">
                            <div class="featured-post-image">
                              <figure class="object-fit-img">
                                <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                              </figure>
                            </div>
                            <div class="featured-post-text fs-16 relative">
                              <ul class="post-cat-btns flex">
                                <?php
                                get_categoryicon($custom_categories);
                                ?>
                              </ul>
                              <h2 class="h4"><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                              <div class="line-clamp clamp-3">
                                <p><?php echo $partner_description; ?></p>
                              </div>
                            </div>
                          </div>
                        <?php } ?>
                        <?php if ($i == 13) { ?>
                          <div class="featured-full-post right-image flex bg-white">
                            <div class="featured-post-image">
                              <figure class="object-fit-img">
                                <img src="<?php echo $post_thumbnail; ?>" alt="<?php echo $post_title; ?>">
                              </figure>
                            </div>
                            <div class="featured-post-text fs-16 relative">
                              <ul class="post-cat-btns flex">
                                <?php
                                get_categoryicon($custom_categories);
                                ?>
                              </ul>
                              <h2 class="h4"><a href="<?php echo $post_permalink; ?>"><?php echo $post_title; ?></a></h2>
                              <div class="line-clamp clamp-3">
                                <p><?php echo $partner_description; ?></p>
                              </div>
                            </div>
                          </div>
                        <?php } ?>
                        <?php if ($i == 13) { ?>
                        </div>
                      <?php } ?>
                      <?php if ($i == 14) { ?>
                      </div>
                    </div>
                  </div>
                </section>
            <?php }
                    } ?>
      <?php //Post loop End here
            $i++;
            if ($i == 15) {
              $i = 1;
            }
          }

          wp_reset_postdata();
        } else {
        }

        die(); // Always end with die to prevent extra output
      }

      add_action('wp_ajax_load_more_projects', 'load_more_projects');
      add_action('wp_ajax_nopriv_load_more_projects', 'load_more_projects');

<?php

/**
 * Created by Evgenii Ioffe
 * @author Evgenii Ioffe <ioffe@umispec.ru>
 * @copyright Copyright (c) 2020, Evgenii Ioffe
 */
class OlympicTouchExtension implements IPhpExtension
{
    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return __CLASS__;
    }

    const no_image = '/styles/common/images/no_image.png';

    const assets_field = 'assets/field';
    const assets_field_param_field = 'field';
    const assets_field_param_title = 'title';
    const assets_field_param_placeholder = 'placeholder';
    const assets_field_param_required = 'required';
    const assets_field_param_id = 'id';
    const assets_field_param_input_type = 'input_type';
    const assets_field_param_input_name = 'input_name';
    const assets_field_param_value = 'value';
    const assets_field_param_input_attributes = 'input_attributes';
    const assets_field_param_select_default_text = 'select_default_text';
    const assets_field_param_select_default_attributes = 'select_default_attributes';

    const assets_webforms_system_fields = 'assets/webforms/system_fields';
    const assets_webforms_system_fields_param_form = 'form';
    const assets_webforms_system_fields_param_on_success = 'ref_on_success';

    const assets_numpages = 'layouts/default/assets/numpages/default';
    const assets_numpages_param_total = 'total';
    const assets_numpages_param_per_page = 'per_page';

    const assets_breadcrumbs = 'layouts/default/assets/breadcrumbs';
    const assets_breadcrumbs_param_items = 'items';
    const assets_breadcrumbs_param_last = 'last';

    const assets_errors = 'layouts/default/assets/errors';
    const assets_errors_param_items = 'items';

    const assets_sub_menu = 'layouts/default/assets/sub_menu';
    const assets_sub_menu_param_page_id = 'page_id';

    const common_var_contacts_page_link = 'contacts_page_link';
    const common_var_order_page_link = 'order_page_link';

    const common_var_contacts_address = 'contacts_address';
    const common_var_contacts_working_time = 'contacts_working_time';
    const common_var_contacts_phone = 'contacts_phone';
    const common_var_contacts_email = 'contacts_email';

    const common_var_social_ig = 'social_ig';
    const common_var_social_vk = 'social_vk';

    const link_webforms_dispatch = '/webforms/dispatch/';

    const link_resume_query_vacancy_id = 'vacancy';

    public function formatPrice($price)
    {
        return number_format($price, 0, '', ' ');
    }
}
<?php
/** @var umiTemplaterPHP|BaseExtension|PageExtension|UmiSettingsExtension|OlympicTouchExtension $this */
/** @var array $variables */

$contactsPage = getArrayKey($this->getUmiSettingsValue(SiteUmiSettingsOlympicTouchModel::field_system_contacts_page_id), 0);
if($contactsPage instanceof umiHierarchyElement) {
    $this->setCommonVar(OlympicTouchExtension::common_var_contacts_page_link, $this->getPageLink($contactsPage->getId()));
}

$orderPage = getArrayKey($this->getUmiSettingsValue(SiteUmiSettingsOlympicTouchModel::field_system_order_page_id), 0);
if($orderPage instanceof umiHierarchyElement) {
    $this->setCommonVar(OlympicTouchExtension::common_var_order_page_link, $this->getPageLink($orderPage->getId()));
}

$this->setCommonVar(OlympicTouchExtension::common_var_contacts_address, trim($this->getUmiSettingsValue(SiteUmiSettingsOlympicTouchModel::field_contacts_address)));
$this->setCommonVar(OlympicTouchExtension::common_var_contacts_working_time, trim($this->getUmiSettingsValue(SiteUmiSettingsOlympicTouchModel::field_contacts_working_time)));
$this->setCommonVar(OlympicTouchExtension::common_var_contacts_phone, trim($this->getUmiSettingsValue(SiteUmiSettingsOlympicTouchModel::field_contacts_phone)));
$this->setCommonVar(OlympicTouchExtension::common_var_contacts_email, trim($this->getUmiSettingsValue(SiteUmiSettingsOlympicTouchModel::field_contacts_email)));

$this->setCommonVar(OlympicTouchExtension::common_var_social_ig, trim($this->getUmiSettingsValue(SiteUmiSettingsOlympicTouchModel::field_social_ig)));
$this->setCommonVar(OlympicTouchExtension::common_var_social_vk, trim($this->getUmiSettingsValue(SiteUmiSettingsOlympicTouchModel::field_social_vk)));
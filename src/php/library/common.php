<?php
/** @var umiTemplaterPHP|BaseExtension|PageExtension|UmiSettingsExtension|OlympicTouchExtension $this */
/** @var array $variables */

$templateResources = str_replace(CURRENT_WORKING_DIR, '', dirname(dirname(__DIR__)));

$extensionsDir = '/vendor/UmiSpec/Extensions/';

$this->loadExtension(array(
    $extensionsDir . 'BaseExtension',
    $extensionsDir . 'PageExtension',
    $extensionsDir . 'UmiSettingsExtension',
    $templateResources . '/php/library/extensions/OlympicTouchExtension',
));

$this->setTemplateResources($templateResources);
$this->setTemplateVersion('?v=20200810');

$this->setModule(getArrayKey($variables, 'module'));
$this->setMethod(getArrayKey($variables, 'method'));

$this->parsePage(getArrayKey($variables, 'page'));
$this->setParents(getArrayKey($variables, 'parents'));

$this->setSiteMetaTitle(getArrayKey($variables, 'title'));
$this->siteSiteHeader(getArrayKey($variables, 'header'));
$this->parseMeta(getArrayKey($variables, 'meta'));

$this->loadUmiSettings(SiteUmiSettingsOlympicTouchModel::custom_id);
$this->setRequestUrl(getArrayKey($variables, 'request-url'));

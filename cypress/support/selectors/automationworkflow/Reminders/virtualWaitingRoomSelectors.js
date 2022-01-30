// All the virtual waiting room locators/selectors will exist here

export default {

    waitingRoomScreen: '[data-testid=nav-item-wait-room] > .navigation-link > [data-testid=cru-typography]',
    waitingRoomReminder: ':nth-child(1) > [data-testid=component-touch-point]',  
    waitingRoomScreenText: '.page-header > [data-testid=cru-typography]',  
    validate2HoursReminder: '.touch-point-settings__title',
    disableReminder: '.touch-point-settings__title-container > [data-testid=cru-component-switch] > .cru-switch__slider',     
    saveChanges: '.touch-point-settings__button--save',
    settings: '[data-testid=advanced-settings-button]',
    defaultButton: '.btn',
    confirmDefaultSetting: '[data-testid=button-primary]',
    closeTheDefault: '[data-testid=cru-icon-button]',
    waitingRoomItems: '.left',
    patientArrival: ':nth-child(2) > [data-testid=component-touch-point]',
    practiceReady: ':nth-child(3) > [data-testid=component-touch-point]',
    waitingRoomMessages: '[data-testid=touch-point-side-bar]',
    closeMessage: '[data-testid=touch-point-side-bar] > .cru-side-bar__close-icon',
    editMessageBox: '.editor-sms',
    editMessage: '[data-testid=button-editor-preview]',
    messageText: '.editor-sms__header > [data-testid=cru-typography]',
    previewAndEditEmail: '[for="cru-sliding-tabs-cru-sliding-tabs-100-1"] > span'
}

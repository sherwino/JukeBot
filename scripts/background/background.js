const notifierOptionsVisible = false;

const defaultValues = [
    { key: 'autoDootEnabled', value: false },
    { key: 'notifierEnabled', value: false },
    { key: 'notifierShowAll', value: false },
    { key: 'notifierShowAlerts', value: false },
];

browser.storage.sync.get(defaultValues.map(x => x.key), function (response) {
    for (let i = 0; i < defaultValues.length; i++) {
        const key = defaultValues[i].key;
        if (response[key] == null) {
            browser.storage.sync.set({ key: defaultValues[i].value });
        }
    }
});

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.event == 'message_received') {
        browser.storage.sync.get(['notifierEnabled', 'notifierShowAll', 'notifierShowAlerts'], function (response) {
            if (response && response.notifierEnabled) {
                const userMentioned = request.data.message.html.indexOf('<span class="mention">') > -1;
                const isAlert = request.data.message.isAlert;
                if (userMentioned || (response.notifierShowAlerts && isAlert) || (!isAlert && response.notifierShowAll)) {
                    const notificationObject = {
                        type: 'basic',
                        iconUrl: './icons/icon48.png',
                        message: request.data.message.text,
                        title: isAlert ? "(Alert)" : request.data.message.author
                    };
                    browser.notifications.create('jukebot_notif', notificationObject);
                }
            }
        });
    }
});
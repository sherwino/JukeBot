window.onload = function () {
    var jukeBot = new JukeBot();
    var songWatcher = new SongWatcher(jukeBot);
    var voteWatcher = new VoteWatcher(jukeBot);
    var autoDoot = new AutoDoot(jukeBot);
    var notifier = new Notifier(jukeBot);

    browser.storage.sync.get('autoDootEnabled', function (response) {
        if (response.autoDootEnabled != null) {
            if (response.autoDootEnabled) {
                autoDoot.start();
            }
        }
    });
    
    browser.storage.sync.get('notifierEnabled', function (response) {
        if (response.notifierEnabled != null) {
            if (response.notifierEnabled) {
                notifier.start();
            }
        }
    });

    jukeBot.start();
    songWatcher.start();
    voteWatcher.start();
};
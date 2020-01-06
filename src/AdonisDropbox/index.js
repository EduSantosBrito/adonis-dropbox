/**
 * adonis-dropbox is a provider that uses DropboxAPI
 *
 * @constructor
 * @singleton
 * @uses (['Adonis/Src/Config'])
 *
 * @class AdonisDropbox
 */

class AdonisDropbox {
    constructor({ Config, Dropbox, fetch }) {
        this.Config = Config;
        this.client = new Dropbox({ accessToken: this.Config.get('dropbox.accessToken'), fetch });
    }

    async upload(buffer) {
        const blob = new Blob([buffer]);
        return this.client.filesUpload({ path: `/teste/${new Date().getTime()}.txt`, contents: blob });
    }
}

module.exports = AdonisDropbox;

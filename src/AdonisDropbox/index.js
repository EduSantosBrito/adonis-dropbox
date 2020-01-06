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
    constructor({ Config, Dropbox, fetch, fileType }) {
        this.Config = Config;
        this.client = new Dropbox({ accessToken: this.Config.get('dropbox.accessToken'), fetch });
        this.fileType = fileType;
    }

    async upload(buffer) {
        const rootPath = this.Config.get('dropbox.rootPath') || '/';
        const { ext } = this.fileType(buffer);
        return this.client.filesUpload({ path: `${rootPath}/${new Date().getTime()}.${ext}`, contents: buffer });
    }
}

module.exports = AdonisDropbox;

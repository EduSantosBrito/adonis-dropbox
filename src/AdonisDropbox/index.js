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
    constructor({ Config, Dropbox, fetch, fileType, uuid }) {
        this.Config = Config;
        this.client = new Dropbox({ accessToken: this.Config.get('dropbox.accessToken'), fetch });
        this.fileType = fileType;
        this.uuid = uuid;
    }

    getRootPath() {
        const rootPath = this.Config.get('dropbox.rootPath') || '/';
        return rootPath[rootPath.length - 1] === '/' ? rootPath : `${rootPath}/`;
    }

    async upload(buffer) {
        const { ext } = this.fileType(buffer);
        return this.client.filesUpload({
            path: `${this.getRootPath()}${this.uuid()}.${ext}`,
            contents: buffer,
        });
    }

    async download(name, customPath = null) {
        return this.client.filesDownload({ path: `${customPath || this.getRootPath()}${name}` });
    }
}

module.exports = AdonisDropbox;

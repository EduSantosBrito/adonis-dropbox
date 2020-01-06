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

    getRootPath() {
        const rootPath = this.Config.get('dropbox.rootPath') || '/';
        return rootPath[rootPath.length - 1] === '/' ? rootPath : `${rootPath}/`;
    }

    async upload(buffer) {
        const { ext } = this.fileType(buffer);
        return this.client.filesUpload({
            path: `${this.getRootPath()}${new Date().getTime()}.${ext}`,
            contents: buffer,
        });
    }

    async download(name, customPath = null) {
        return this.client.filesDownload({ path: `${customPath || this.getRootPath()}${name}` });
    }
}

module.exports = AdonisDropbox;

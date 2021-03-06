const { ServiceProvider } = require('@adonisjs/fold');

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('Dropbox', () => {
            const Config = this.app.use('Adonis/Src/Config');
            const fetch = this.app.use('isomorphic-fetch');
            const fileType = this.app.use('file-type');
            const uuid = this.app.use('uuid/v4');
            /** @type {import('dropbox/lib')} */
            const { Dropbox } = this.app.use('dropbox');
            return new (require('../src/AdonisDropbox'))({ Config, Dropbox, fetch, fileType, uuid });
        });
    }
}

module.exports = AdonisMongodbProvider;

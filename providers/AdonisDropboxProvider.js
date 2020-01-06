const { ServiceProvider } = require('@adonisjs/fold');

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('Dropbox', () => {
            const Config = this.app.use('Adonis/Src/Config');
            const fetch = this.app.use('isomorphic-fetch');
            /** @type {import('dropbox/lib')} */
            const { Dropbox } = this.app.use('dropbox');
            return new (require('../src/AdonisDropbox'))({ Config, Dropbox, fetch });
        });
    }
}

module.exports = AdonisMongodbProvider;

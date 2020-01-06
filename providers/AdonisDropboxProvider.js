const { ServiceProvider } = require('@adonisjs/fold');

class AdonisMongodbProvider extends ServiceProvider {
    register() {
        this.app.singleton('Dropbox', () => {
            const Config = this.app.use('Adonis/Src/Config');
            /** @type {import('dropbox/lib')} */
            const { Dropbox } = this.app.use('dropbox');
            return new (require('../src/AdonisDropbox'))({ Config, Dropbox });
        });
    }
}

module.exports = AdonisMongodbProvider;

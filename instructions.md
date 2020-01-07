## Registering provider

Make sure to register the adonis-dropbox provider to make use of `Dropbox`. The providers are registered inside `start/app.js`

```js
const providers = ['adonis-dropbox/providers/AdonisDropboxProvider'];
```

### Dropbox config

the config automatic create to `config/dropbox.js` file

```js
module.exports = {
    // You can use Env.get if your access token is in environment variables
    accessToken: Env.get('ACCESS_TOKEN', '<YOUR_DROPBOX_ACCESS_TOKEN>'),
    // You can define root path for your project inside an Application in Dropbox, default: '/'
    rootPath: '/example/custom/path',
};
```

## Usage

Once done you can access `Dropbox` provider and use it as follows.

```js
/** @type {import('adonis-dropbox/src/AdonisDropbox')} */
const Dropbox = use('Dropbox');
const fs = use('fs');
const path = use('path');

Route.get("/:fileNameWithExtension", async ({ request, response, params }) => {
  const { fileNameWithExtension } = params;
  const { fileBinary } = await Dropbox.download(fileNameWithExtension);
  return fileBinary;
}

Route.get('/delete/:fileNameWithExtension', async ({ params }) => {
    const { fileNameWithExtension } = params;
    return Dropbox.remove(fileNameWithExtension);
});

Route.get('/', async () => {
    const buffer = fs.readFileSync(path.join(__dirname, 'fileName.mp4'));
    return Dropbox.upload(buffer);
});
```

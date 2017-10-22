import Helmet from 'react-helmet';

// Render Initial HTML
const renderFullPage = (html, initialState) => {
        const helmet = Helmet.renderStatic();

        // Import Manifests
        const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
        const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

        return `<!doctype html>
        <html ${helmet.htmlAttributes.toString()}>
            <head>
                ${helmet.base.toString()}
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                ${helmet.script.toString()}

                ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
                <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
                <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
            </head>
            <body>
                <div id="root">${html}</div>
                <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                ${process.env.NODE_ENV === 'production' ?
                `//<![CDATA[
                window.webpackManifest = ${JSON.stringify(chunkManifest)};
                //]]>` : ''}
                </script>
                <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
                <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
            </body>
        </html>`;
};

export default renderFullPage;
// React And Redux Setup
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { configureStore } from '../../client/store';
import IntlWrapper from '../../client/modules/Intl/IntlWrapper';
import routes from '../../client/routes';

import renderFullPage from '../layout/renderFullPage';
import { fetchComponentData } from '../util/fetchData';
import renderError from '../layout/renderError';
import posts from '../post/post.routes';

const router = (app) => {

    app.use('/api', posts);

    // Server Side Rendering based on routes matched by React-router.
    app.use((req, res, next) => {

        const context = {};

        const store = configureStore();
        const html = renderToString(
            <StaticRouter location={req.url} context={context}>
                <Provider store={store}>
                        <IntlWrapper>
                            {routes}
                        </IntlWrapper>
                    </Provider>
            </StaticRouter>
        );

        const finalState = store.getState();
        
        res
            .set('Content-Type', 'text/html')
            .status(200)
            .end(renderFullPage(initialView, finalState));
        // match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        //     if (err) {
        //         return res.status(500).end(renderError(err));
        //     }
        
        //     if (redirectLocation) {
        //         return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        //     }
        
        //     if (!renderProps) {
        //         return next();
        //     }
        
        //     const store = configureStore();
        
        //     return fetchComponentData(store, renderProps.components, renderProps.params)
        //         .then(() => {
        //             const initialView = renderToString(
        //                 <Provider store={store}>
        //                     <IntlWrapper>
        //                         <RouterContext {...renderProps} />
        //                     </IntlWrapper>
        //                 </Provider>
        //             );
        //             const finalState = store.getState();
            
        //             res
        //                 .set('Content-Type', 'text/html')
        //                 .status(200)
        //                 .end(renderFullPage(initialView, finalState));
        //         })
        //         .catch((error) => next(error));
        // });
    });
};

export default router;
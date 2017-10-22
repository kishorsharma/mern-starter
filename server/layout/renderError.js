import renderFullPage from './renderFullPage';

const renderError = err => {
        const softTab = '&#32;&#32;&#32;&#32;';
        const errTrace = process.env.NODE_ENV !== 'production' ?
            `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
    return renderFullPage(`Server Error${errTrace}`, {});
};

export default renderError;

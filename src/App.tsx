import React from 'react';
import '/src/styles.css';
import { Test } from 'components/Test';
import horse from 'images/horse.jpeg';

const App = (): JSX.Element => {
    console.log(process.env.NODE_ENV);
    return (
    <>
        <h1>React TypeScript Webpack project</h1>
        <Test />
        <img src='/images/cat.jpg' alt="Cat" />
        <img src={horse} alt="Horse" />
        {process.env.NODE_ENV}
        <br/>
        {process.env.NODE_ENV == 'development' && process.env.BASE_URL_DEV}
        {process.env.NODE_ENV == 'production' && process.env.BASE_URL_PROD}
    </>
    )
}

export { App }

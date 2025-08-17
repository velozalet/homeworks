import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render( //ReactDOM.createRoot(document.getElementById('root')!).render( ... -> if use JS
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)

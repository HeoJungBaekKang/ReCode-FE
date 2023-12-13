import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
      onScriptLoadError={() => console.log("실패")}
      onScriptLoadSuccess={() => console.log("성공")}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>



);

reportWebVitals();

export {default as MyEditor} from './components/Editor/MyEditor';
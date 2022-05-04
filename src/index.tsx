import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {App} from './components/App';
import './global.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// prevent user from using browser back button to go back and resubmit a score
// window.addEventListener('popstate', (ev) => {
//   ev.state.usr = null;
// });

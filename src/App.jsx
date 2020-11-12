import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Auth from './components/Auth';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <main className="container mx-auto flex flex-col justify-center items-center">
        <Auth />

        <ul className="divide-y-2 divide-red-600 bg-red-200 w-1/4 p-2">
          <li>
            <Contact
              name="Harry Jimenez"
              image="https://randomuser.me/api/portraits/men/41.jpg"
              isOnline
              link="#"
            />
          </li>
          <li>
            <Contact
              name="Kristin Castillo"
              image="https://randomuser.me/api/portraits/women/67.jpg"
              unreadCount={2}
              link="#"
            />
          </li>
        </ul>
      </main>
    </BrowserRouter>
  );
}

export default App;

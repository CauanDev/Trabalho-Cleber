import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComponente from './Componentes/Navbar';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';



createInertiaApp({
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <React.StrictMode>
          <NavBarComponente />
          <App {...props} />
      </React.StrictMode>
    );
  },
});

InertiaProgress.init();

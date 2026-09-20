// Firebase config — estas claves son PÚBLICAS por diseño (van en el frontend)
// Obtené estos valores en: console.firebase.google.com
// → Tu proyecto → ⚙️ Configuración → Tus apps → Web app
//
// PASOS:
//   1. Ir a https://console.firebase.google.com
//   2. Crear proyecto (gratis, plan Spark)
//   3. Agregar app Web → copiar el objeto firebaseConfig de abajo
//   4. Habilitar Authentication → Sign-in method → Google + Email/Password
//   5. Agregar dominio pemfba.com en Authentication → Settings → Authorized domains

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth }        from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey:            'REEMPLAZAR_CON_TU_API_KEY',
  authDomain:        'REEMPLAZAR.firebaseapp.com',
  projectId:         'REEMPLAZAR_CON_TU_PROJECT_ID',
  storageBucket:     'REEMPLAZAR.appspot.com',
  messagingSenderId: 'REEMPLAZAR',
  appId:             'REEMPLAZAR_CON_TU_APP_ID',
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

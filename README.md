# React OAuth & Firebase Push Notifications

A learning project built using React, Vite, Firebase Cloud Messaging (FCM), React Router, React Toastify, and Bootstrap.

## Features

- React-based user interface
- Login and Register pages
- Client-side routing using React Router
- Lazy loading of pages
- Firebase Cloud Messaging integration
- Foreground notifications using React Toastify
- Background notifications using a service worker
- Responsive Bootstrap dashboard
- React Hook Form example for form validation

## Tech Stack

| Technology               | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| React                    | Builds reusable UI components                  |
| React DOM                | Renders React components in the browser        |
| Vite                     | Development server and production build        |
| React Router             | Handles page navigation                        |
| Firebase                 | Provides Firebase services                     |
| Firebase Cloud Messaging | Handles browser push messages                  |
| Service Worker           | Handles background push notifications          |
| React Toastify           | Displays foreground notifications              |
| Bootstrap                | Responsive layouts, cards, buttons, and forms  |
| React Hook Form          | Manages form values and validation in the demo |

## Installation

Install project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Firebase Configuration

1. Create a Firebase project.
2. Register your web application.
3. Configure Firebase Cloud Messaging and your VAPID public key.
4. Place `firebase-messaging-sw.js` in the `public` directory.
5. Configure your Firebase settings in environment variables.
6. Test notifications on localhost or an HTTPS website.

Create a `.env.local` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_VAPID_KEY=your_vapid_public_key
```

Never commit `.env.local`, private keys, or Firebase service-account credentials.

Note: Vite environment variables are included in client-side bundles. They are not suitable for secrets.

## Notification Flow

1. Check browser messaging support.
2. Request notification permission.
3. Register the Firebase messaging service worker.
4. Register for push messaging.
5. Receive foreground messages using `onMessage`.
6. Display foreground messages with React Toastify.
7. Handle background messages in the service worker.

A trusted sender, such as a backend using the Firebase Admin SDK, must send messages to a valid registration token for notifications to arrive.

## React Hook Form Demo

The sample dashboard demonstrates:

- `useForm()`
- `register()`
- `handleSubmit()`
- Required-field validation
- Email validation

The demo form only displays the submitted data locally. It does not save data to a backend.

## Project Structure

```text
src/
├── auth_Components/
│   ├── Login.jsx
│   └── Register.jsx
├── Notification/
│   └── firebase.js
├── dashboard/
│   └── index.jsx
├── App.jsx
└── main.jsx

public/
└── firebase-messaging-sw.js

README.md
package.json
```

## Security

- Do not upload service-account JSON files.
- Protect backend APIs with proper authentication and authorization.
- Configure Firebase security rules where applicable.
- Request notification permission transparently.
- Use HTTPS in production.

## License

Add a license if you plan to distribute this project publicly.
# React_Firebase

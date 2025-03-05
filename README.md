# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve

```

Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.

Code scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

## Setting API URL

Before running the project, make sure to set the API_URL value in the environment files located in src/environments.

For development, update src/environments/environment.ts:

```typescript
export const environment = {
  production: false,
  apiURL: 'http://localhost:3000', // Replace with your development API URL
};
```

For production, update src/environments/environment.prod.ts:

# `@keen.io/embedded-registration`

This package contains Front-end codebase for Keen.io embeddable registration component used for HubSpot integration.
It allows to sign up users for the plans that do not require `credit card` details.

#### configuration

| Argument            | Description                                    |
| ------------------- | ---------------------------------------------- |
| `container`         | HTML Element used to mount registration form   |
| `offerHandle`       | Offer identifier used in registration process. |
| `ctaLabel`          | CTA button label.                              |
| `apiUrl`            | Keen API url.                                  |
| `onSuccess`         | Success callback handler.                      |
| `useOAuthProviders` | Show / hide OAuth providers.                   |
| `oauthConfig`       | OAuth applications configuration               |

#### CDN

```typescript
<script src="https://cdn.jsdelivr.net/npm/@keen.io/embedded-registration@latest/dist/embedded-registration.min.js" type="text javascript"></script>
```

#### example

```typescript
  new KeenEmbeddedRegistration({
    container: '#form',
    ctaLabel: "Get Started for Free",
    onSuccess: function() {},
    offerHandle: 'public-trial-30-days',
    apiUrl: 'https://keen.io',
  }).render();
```

#### npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command | Description                             |
| ------- | --------------------------------------- |
| `start` | run application on `localhost:8080`.    |
| `build` | build the application UMD distribution. |

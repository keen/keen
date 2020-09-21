import { OAuthConfig } from '@keen.io/ui-core';

export type OAuthSignUpConfig = {
  callbackHandlerHost: string;
  requestInitiatorUrl: string;
} & OAuthConfig;

export type Options = {
  container: HTMLElement | string;
  offerHandle: string;
  ctaLabel: string;
  apiUrl: string;
  onSuccess: () => void;
  useOAuthProviders?: boolean;
  utmCookies?: string[];
  oauthConfig?: OAuthSignUpConfig;
};

export type FormValues = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  companyDisclaimer: boolean;
  companyName: string;
};

export type SuccessResponse = {
  email: string;
  organization_id: string;
  project_id: string;
  user_id: string;
};

export type ErrorResponse = {
  field_errors: Record<string, string>;
  status_code: number;
};

export type SignupResponse = SuccessResponse | ErrorResponse;

export type SignupError = {
  status: number;
  message: string;
  data: { errors?: Record<string, string> };
};

export type User = {
  organizationId: string;
};

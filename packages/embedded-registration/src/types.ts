export type Options = {
  container: HTMLElement | string;
  offerHandle: string;
  ctaLabel: string;
  apiUrl: string;
  onSuccess: () => void;
};

export type FormValues = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  companyDisclaimer: boolean;
  companyName: string;
};

export type SignupResponse = {
  email: string;
  organization_id: string;
  project_id: string;
  user_id: string;
};

export type User = {
  organizationId: string;
};

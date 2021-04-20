export interface UpdateUserInputType {
  id: string;
  name?: string;
  email?: string;
  profile_url?: string;
  is_active?: boolean;
  confirmation_email?: boolean;
}

export interface QueryUserConfirmationType {
  id: string;
}

export interface AccountInterface {
  id?: number;
  userId?: number;
  emailMonitored: string;
  nameBreaches?: string;
  title?: string;
  domain?: string;
  logoPath?: string;
  breachDate?: string;
  addedDate?: string;
  modifiedDate?: string;
  description?: string;
  attribution?: string;
  pwnCount?: number;
  dataClasses?: string[];
  verified?: boolean;
  fabricated?: boolean;
  sensitive?: boolean;
  ssensitive?: boolean;
  retired?: boolean;
  spamList?: boolean;
  malware?: boolean;
  subscriptionFree?: boolean;
  stealerLog?: boolean;
}
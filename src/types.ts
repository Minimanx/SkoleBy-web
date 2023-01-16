export type User = {
  name: string;
  class: string;
  school: string;
  funSchoolName: string;
  jobTitle?: string;
};

export type Student = {
  id: number;
  name: string;
  Transaction: Transaction[];
};

export type Transaction = {
  id: number;
  title: string;
  amount: number;
  createdAt: Date;
};

export type Mail = {
  id: number;
  from: string;
  title: string;
  body: string;
  createdAt: Date;
};

export type Business = {
  id: number;
  title: string;
  description: string;
  opensAt: string;
  closesAt: string;
  location: string;
  icon: string;
};

export type NewsPost = {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
};

export type JobListing = {
  id: number;
  title: string;
  body: string;
  business: Business;
};

export type JobApplication = {
  id: number;
  body: string;
};

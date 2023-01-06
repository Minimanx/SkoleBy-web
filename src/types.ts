export type Student = {
  name: string;
  class: string;
  school: string;
  funSchoolName: string;
  jobTitle?: string;
};

export type Transaction = {
  id: number;
  title: string;
  amount: number;
  date: Date;
};

export type Mail = {
  id: number;
  from: string;
  title: string;
  body: string;
  date: Date;
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
  date: Date;
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

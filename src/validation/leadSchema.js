import * as Yup from 'yup';

const jobSchema = Yup.object({
  title: Yup.string().required('Job title is required'),
  type: Yup.string()
    .oneOf(['Full-time', 'Part-time'])
    .required('Job type is required'),
  salaryRange: Yup.string().when('type', {
    is: 'Full-time',
    then: (s) => s.required('Salary range is required for full-time jobs'),
    otherwise: (s) => s.optional(),
  }),
});

export const leadSchema = Yup.object({
  companyName: Yup.string().required('Company name is required'),
  contactPerson: Yup.string().required('Contact person name is required'),
  designation: Yup.string(), 

  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),

  phone: Yup.string()
    .matches(/^\d{11,13}$/, 'Phone must be 11-13 digits')
    .required('Phone number is required'),

  leadSource: Yup.string()
    .oneOf(['Website', 'Referral', 'Cold Call', 'Other'])
    .required('Lead source is required'),

  otherSource: Yup.string().when('leadSource', {
    is: 'Other',
    then: (s) => s.required('Please specify the other source'),
    otherwise: (s) => s.optional(),
  }),

  followUpDate: Yup.date()
    .min(new Date(), 'Follow-up date must be in the future')
    .required('Follow-up date is required'),

  jobs: Yup.array()
    .of(jobSchema)
    .min(1, 'Add at least one job')
    .required('Jobs are required'),
});

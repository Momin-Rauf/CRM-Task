import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import type { FormikErrors } from 'formik';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { leadSchema } from '../validation/leadSchema';
import type { Lead, LeadSource, JobType, Job } from '../types/lead';

interface LeadFormProps {
  onSubmit: (values: Omit<Lead, 'id'>) => void;
  initialValues?: Partial<Lead>;
}

const initialJob = {
  title: '',
  type: 'Full-time' as JobType,
  salaryRange: '',
};

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, initialValues }) => {
  const defaultValues: Omit<Lead, 'id'> = {
    companyName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    leadSource: 'Website' as LeadSource,
    otherSource: '',
    followUpDate: new Date().toISOString(),
    jobs: [initialJob],
    ...initialValues,
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={leadSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange}) => {
        const typedErrors = errors as FormikErrors<Omit<Lead, 'id'>>;
        const jobErrors = typedErrors.jobs as FormikErrors<Job>[] | undefined;
        return (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                name="companyName"
                label="Company Name"
                value={values.companyName}
                onChange={handleChange}
                error={touched.companyName && Boolean(typedErrors.companyName)}
                helperText={touched.companyName && typedErrors.companyName}
              />

              <TextField
                fullWidth
                name="contactPerson"
                label="Contact Person"
                value={values.contactPerson}
                onChange={handleChange}
                error={touched.contactPerson && Boolean(typedErrors.contactPerson)}
                helperText={touched.contactPerson && typedErrors.contactPerson}
              />

              <TextField
                fullWidth
                name="designation"
                label="Designation"
                value={values.designation}
                onChange={handleChange}
                error={touched.designation && Boolean(typedErrors.designation)}
                helperText={touched.designation && typedErrors.designation}
              />

              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(typedErrors.email)}
                helperText={touched.email && typedErrors.email}
              />

              <TextField
                fullWidth
                name="phone"
                label="Phone Number"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(typedErrors.phone)}
                helperText={touched.phone && typedErrors.phone}
              />

              <TextField
                fullWidth
                select
                name="leadSource"
                label="Lead Source"
                value={values.leadSource}
                onChange={handleChange}
                error={touched.leadSource && Boolean(typedErrors.leadSource)}
                helperText={touched.leadSource && typedErrors.leadSource}
              >
                {['Website', 'Referral', 'Cold Call', 'Other'].map((source) => (
                  <MenuItem key={source} value={source}>
                    {source}
                  </MenuItem>
                ))}
              </TextField>

              {values.leadSource === 'Other' && (
                <TextField
                  fullWidth
                  name="otherSource"
                  label="Other Source"
                  value={values.otherSource}
                  onChange={handleChange}
                  error={touched.otherSource && Boolean(typedErrors.otherSource)}
                  helperText={touched.otherSource && typedErrors.otherSource}
                />
              )}

              <TextField
                fullWidth
                type="date"
                name="followUpDate"
                label="Follow-up Date"
                value={values.followUpDate.split('T')[0]}
                onChange={handleChange}
                error={touched.followUpDate && Boolean(typedErrors.followUpDate)}
                helperText={touched.followUpDate && typedErrors.followUpDate}
                InputLabelProps={{ shrink: true }}
              />

              <Typography variant="h6" sx={{ mt: 2 }}>
                Jobs
              </Typography>

              <FieldArray name="jobs">
                {({ push, remove }) => (
                  <Box>
                    {values.jobs.map((_, index) => (
                      <Paper key={index} sx={{ p: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <TextField
                            fullWidth
                            name={`jobs.${index}.title`}
                            label="Job Title"
                            value={values.jobs[index].title}
                            onChange={handleChange}
                            error={
                              touched.jobs?.[index]?.title &&
                              Boolean(jobErrors?.[index]?.title)
                            }
                            helperText={
                              touched.jobs?.[index]?.title && jobErrors?.[index]?.title
                            }
                          />

                          <TextField
                            select
                            fullWidth
                            name={`jobs.${index}.type`}
                            label="Job Type"
                            value={values.jobs[index].type}
                            onChange={handleChange}
                            error={
                              touched.jobs?.[index]?.type &&
                              Boolean(jobErrors?.[index]?.type)
                            }
                            helperText={
                              touched.jobs?.[index]?.type && jobErrors?.[index]?.type
                            }
                          >
                            {['Full-time', 'Part-time'].map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </TextField>

                          {values.jobs[index].type === 'Full-time' && (
                            <TextField
                              fullWidth
                              name={`jobs.${index}.salaryRange`}
                              label="Salary Range"
                              value={values.jobs[index].salaryRange}
                              onChange={handleChange}
                              error={
                                touched.jobs?.[index]?.salaryRange &&
                                Boolean(jobErrors?.[index]?.salaryRange)
                              }
                              helperText={
                                touched.jobs?.[index]?.salaryRange && jobErrors?.[index]?.salaryRange
                              }
                            />
                          )}

                          <IconButton
                            onClick={() => remove(index)}
                            disabled={values.jobs.length === 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))}

                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => push(initialJob)}
                      variant="outlined"
                    >
                      Add Job
                    </Button>
                  </Box>
                )}
              </FieldArray>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}; 
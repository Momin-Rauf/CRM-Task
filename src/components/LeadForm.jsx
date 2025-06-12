import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
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

const initialJob = {
  title: '',
  type: 'Full-time',
  salaryRange: '',
};

export const LeadForm = ({ onSubmit, initialValues }) => {
  const defaultValues = {
    companyName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    leadSource: 'Website',
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
      {({ values, errors, touched, handleChange }) => {
        return (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                name="companyName"
                label="Company Name"
                value={values.companyName}
                onChange={handleChange}
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={touched.companyName && errors.companyName}
              />

              <TextField
                fullWidth
                name="contactPerson"
                label="Contact Person"
                value={values.contactPerson}
                onChange={handleChange}
                error={touched.contactPerson && Boolean(errors.contactPerson)}
                helperText={touched.contactPerson && errors.contactPerson}
              />

              <TextField
                fullWidth
                name="designation"
                label="Designation"
                value={values.designation}
                onChange={handleChange}
                error={touched.designation && Boolean(errors.designation)}
                helperText={touched.designation && errors.designation}
              />

              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                name="phone"
                label="Phone Number"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <TextField
                fullWidth
                select
                name="leadSource"
                label="Lead Source"
                value={values.leadSource}
                onChange={handleChange}
                error={touched.leadSource && Boolean(errors.leadSource)}
                helperText={touched.leadSource && errors.leadSource}
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
                  error={touched.otherSource && Boolean(errors.otherSource)}
                  helperText={touched.otherSource && errors.otherSource}
                />
              )}

              <TextField
                fullWidth
                type="date"
                name="followUpDate"
                label="Follow-up Date"
                value={values.followUpDate.split('T')[0]}
                onChange={handleChange}
                error={touched.followUpDate && Boolean(errors.followUpDate)}
                helperText={touched.followUpDate && errors.followUpDate}
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
                              Boolean(errors.jobs?.[index]?.title)
                            }
                            helperText={
                              touched.jobs?.[index]?.title && errors.jobs?.[index]?.title
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
                              Boolean(errors.jobs?.[index]?.type)
                            }
                            helperText={
                              touched.jobs?.[index]?.type && errors.jobs?.[index]?.type
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
                                Boolean(errors.jobs?.[index]?.salaryRange)
                              }
                              helperText={
                                touched.jobs?.[index]?.salaryRange && errors.jobs?.[index]?.salaryRange
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
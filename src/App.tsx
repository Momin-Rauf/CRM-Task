import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box, Button, Container, Dialog, Snackbar, Alert } from '@mui/material';
import { LeadList } from './components/LeadList';
import { LeadForm } from './components/LeadForm';
import { useLeadStore } from './store/leadStore';
import { useMutation, useQueryClient } from 'react-query';
import { leadService } from './services/leadService';
import type { Lead } from './types/lead';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { isModalOpen, setModalOpen, showToast, toastMessage, hideToast } = useLeadStore();
  const queryClient = useQueryClient();

  const createMutation = useMutation(leadService.createLead, {
    onSuccess: () => {
      queryClient.invalidateQueries('leads');
      setModalOpen(false);
    },
  });

  const handleSubmit = (values: Omit<Lead, 'id'>) => {
    createMutation.mutate(values);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Lead Management</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Add Lead
        </Button>
      </Box>

      <LeadList />

      <Dialog
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <h2>Add New Lead</h2>
          <LeadForm onSubmit={handleSubmit} />
        </Box>
      </Dialog>

      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        onClose={hideToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={hideToast} severity="success" sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;

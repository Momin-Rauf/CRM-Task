import React from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import type { Lead } from '../types/lead';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { leadService } from '../services/leadService';
import { useLeadStore } from '../store/leadStore';
import { IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const LeadList: React.FC = () => {
  const queryClient = useQueryClient();
  const { setModalOpen, setSelectedLeadId, showErrorToast } = useLeadStore();

  const { data: leads = [], isLoading } = useQuery('leads', leadService.getLeads);

  const deleteMutation = useMutation(leadService.deleteLead, {
    onSuccess: () => {
      queryClient.invalidateQueries('leads');
    },
    onError: () => {
      showErrorToast('Failed to delete lead');
    },
  });

  const handleEdit = (lead: Lead) => {
    setSelectedLeadId(lead.id!);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteMutation.mutate(id);
    }
  };

  const columns: MRT_ColumnDef<Lead>[] = [
    {
      accessorKey: 'companyName',
      header: 'Company Name',
    },
    {
      accessorKey: 'contactPerson',
      header: 'Contact Person',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'leadSource',
      header: 'Lead Source',
    },
    {
      accessorKey: 'followUpDate',
      header: 'Follow-up Date',
      Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => handleEdit(row.original)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(row.original.id!)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={leads}
      state={{ isLoading }}
      enableRowSelection
      muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
      enableColumnFilters={false}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
    />
  );
}; 
import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const AccountManagement = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState({
    AccountId: '',
    Username: '',
    Role: ''
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveClickAccount = () => {
    if (isEdit) {
      // Edit account logic here
    } else {
      // Add account logic here
      setRows([...rows, formValues]);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'AccountId', headerName: 'Account ID', width: 150 },
    { field: 'Username', headerName: 'Username', width: 150 },
    { field: 'Role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEditClick = (row) => {
    setFormValues(row);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDeleteClick = (row) => {
    setRows(rows.filter((r) => r.AccountId !== row.AccountId));
  };

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ marginBottom: "10px" }}>
        Account Management
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        loading={loading}
        getRowId={(row) => row.AccountId}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Account' : 'Add Account'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="AccountId"
            label="Account ID"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.AccountId}
            onChange={handleInputChange}
            disabled={isEdit}
          />
          <TextField
            margin="dense"
            name="Username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.Username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Role"
            label="Role"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.Role}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveClickAccount} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountManagement;



  
  
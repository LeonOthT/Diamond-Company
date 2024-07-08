import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const AccountManagement = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState({
    AccountId: '',
    Username: '',
    FirstName: '',
    LastName: '',
    Role: '',
    Gender: '',
    Birthday: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    Ranking: '',
    DiscountRate: '',
    Status: ''
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://localhost:7292/api/Accounts/GetAccountList');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching account list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveClickAccount = () => {
    if (isEdit) {
      // Edit account logic here
      setRows(rows.map(row => row.AccountId === formValues.AccountId ? formValues : row));
    } else {
      // Add account logic here
      setRows([...rows, { ...formValues, AccountId: Date.now().toString() }]);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setFormValues({
      AccountId: '',
      Username: '',
      FirstName: '',
      LastName: '',
      Role: '',
      Gender: '',
      Birthday: '',
      Email: '',
      PhoneNumber: '',
      Address: '',
      Ranking: '',
      DiscountRate: '',
      Status: ''
    });
  };

  const columns = [
    { field: 'AccountId', headerName: 'ID', width: 150 },
    { field: 'UserName', headerName: 'Username', width: 150 },
    { field: 'FirstName', headerName: 'First Name', width: 150 },
    { field: 'LastName', headerName: 'Last Name', width: 150 },
    { field: 'Role', headerName: 'Role', width: 150 },
    { field: 'Gender', headerName: 'Gender', width: 100 },
    { field: 'Birthday', headerName: 'Birthday', width: 150 },
    { field: 'Email', headerName: 'Email', width: 200 },
    { field: 'PhoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'Address', headerName: 'Address', width: 200 },
    { field: 'Ranking', headerName: 'Ranking', width: 100 },
    { field: 'DiscountRate', headerName: 'Discount Rate', width: 150 },
    { field: 'Status', headerName: 'Status', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
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
        Add Account
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
            name="FirstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.FirstName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="LastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.LastName}
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select
              name="Gender"
              value={formValues.Gender}
              onChange={handleInputChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="Birthday"
            label="Birthday"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formValues.Birthday}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formValues.Email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="PhoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.PhoneNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.Address}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Ranking"
            label="Ranking"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.Ranking}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="DiscountRate"
            label="Discount Rate"
            type="number"
            fullWidth
            variant="outlined"
            value={formValues.DiscountRate}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="Status"
              value={formValues.Status}
              onChange={handleInputChange}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
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

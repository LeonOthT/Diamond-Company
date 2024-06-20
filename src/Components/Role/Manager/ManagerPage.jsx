import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, Paper, Switch, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import Chart from 'react-apexcharts';
import { styled } from '@mui/system';
import axios from 'axios';

const Sidebar = styled(Box)(({ theme }) => ({
  width: 250,
  height: '100vh',
  backgroundColor: '#3f51b5',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px 10px',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: '20px',
  backgroundColor: '#f4f6f8',
  marginLeft: 250, // To offset the fixed sidebar width
  overflowY: 'auto',
  height: '100vh',
}));

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
}));

const Card = styled(Paper)(({ theme }) => ({
  padding: '20px',
  textAlign: 'center',
  marginBottom: '20px',
}));

const data = {
  series: [
    {
      name: 'Employees Info',
      data: [10, 15, 9, 20, 25, 20, 30],
    },
  ],
  options: {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: ['0 Jan', '31 Jan', '22 Feb', '15 Mar', '05 Apr', '26 Apr', '17 May'],
    },
  },
};

const ManagerPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [cut, setCut] = useState('');
  const [clarity, setClarity] = useState('');
  const [color, setColor] = useState('');
  const [origin, setOrigin] = useState('');
  const [caratWeightRange, setCaratWeightRange] = useState([0.55, 1.75]);
  const [gemPriceList, setGemPriceList] = useState([]);

  const fetchGemPriceList = async (filters) => {
    try {
      const response = await axios.get('http://localhost:7292/api/GemPriceList/FilterGemPriceList', {
        params: filters,
      });
      setGemPriceList(response.data);
    } catch (error) {
      console.error("There was an error fetching the gem price list!", error);
    }
  };

  useEffect(() => {
    if (selectedMenu === 'Diamond Management') {
      fetchGemPriceList({ cut, clarity, color, origin, minCaratWeight: caratWeightRange[0], maxCaratWeight: caratWeightRange[1] });
    }
  }, [selectedMenu, cut, clarity, color, origin, caratWeightRange]);

  const handleCutChange = (event) => {
    setCut(event.target.value);
  };

  const handleClarityChange = (event) => {
    setClarity(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleCaratWeightChange = (event, newValue) => {
    setCaratWeightRange(newValue);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <Typography variant="h6">Employees Info</Typography>
                <Chart options={data.options} series={data.series} type="line" />
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <Typography variant="h6">Total Employees</Typography>
                <Typography variant="h4">423</Typography>
                <Chart
                  options={{
                    chart: {
                      type: 'donut',
                    },
                    labels: ['Man', 'Women'],
                  }}
                  series={[60, 40]}
                  type="donut"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <Typography variant="h6">Applications</Typography>
                <Typography variant="h4">1546</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <Typography variant="h6">Employees Availability</Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Attendance" />
                    <Typography variant="body2">400</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Late Coming" />
                    <Typography variant="body2">17</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Absent" />
                    <Typography variant="body2">6</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Leave Apply" />
                    <Typography variant="body2">14</Typography>
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <Typography variant="h6">Top Hiring Sources</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <Typography variant="h6">Upcoming Interviews</Typography>
                <List>
                  <ListItem>
                    <Avatar src="/broken-image.jpg" />
                    <ListItemText primary="Natalie Gibson" secondary="1.30 - 1.30 (Ui/UX Designer)" />
                  </ListItem>
                  <ListItem>
                    <Avatar src="/broken-image.jpg" />
                    <ListItemText primary="Peter Piperg" secondary="9.00 - 1.30 (Web Design)" />
                  </ListItem>
                  <ListItem>
                    <Avatar src="/broken-image.jpg" />
                    <ListItemText primary="Robert Young" secondary="1.30 - 2.30" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        );
      case 'Diamond Management':
        return (
          <div>
            <h1 style={{color: '#333'}}>Gem Price List</h1>
            <FormControl fullWidth margin="normal">
              <InputLabel>Cut</InputLabel>
              <Select value={cut} onChange={handleCutChange}>
                <MenuItem value="Excellent">Excellent</MenuItem>
                <MenuItem value="Very Good">Very Good</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Clarity</InputLabel>
              <Select value={clarity} onChange={handleClarityChange}>
                <MenuItem value="IF">IF</MenuItem>
                <MenuItem value="VVS1">VVS1</MenuItem>
                <MenuItem value="VVS2">VVS2</MenuItem>
                <MenuItem value="VS1">VS1</MenuItem>
                <MenuItem value="VS2">VS2</MenuItem>
                <MenuItem value="SI1">SI1</MenuItem>
                <MenuItem value="SI2">SI2</MenuItem>
                <MenuItem value="I1">I1</MenuItem>
                <MenuItem value="I2">I2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Color</InputLabel>
              <Select value={color} onChange={handleColorChange}>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="E">E</MenuItem>
                <MenuItem value="F">F</MenuItem>
                <MenuItem value="G">G</MenuItem>
                <MenuItem value="H">H</MenuItem>
                <MenuItem value="I">I</MenuItem>
                <MenuItem value="J">J</MenuItem>
                <MenuItem value="K">K</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="M">M</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Origin</InputLabel>
              <Select value={origin} onChange={handleOriginChange}>
                <MenuItem value="Synthetic">Synthetic</MenuItem>
                <MenuItem value="Natural">Natural</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ width: '30%', marginTop: '16px' }}>
              <Typography id="range-slider" gutterBottom sx={{color: '#333'}}>
                Carat Weight Range
              </Typography>
              <Slider
                value={caratWeightRange}
                onChange={handleCaratWeightChange}
                valueLabelDisplay="auto"
                min={0.55}
                max={1.75}
                step={0.01}
              />
            </Box>
            <Grid container spacing={3}>
              {gemPriceList.map((gem, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card>
                    <Typography variant="h6">{`ID: ${gem.Id}`}</Typography>
                    <Typography variant="body1">{`Origin: ${gem.Origin}`}</Typography>
                    <Typography variant="body1">{`Carat Weight: ${gem.CaratWeight}`}</Typography>
                    <Typography variant="body1">{`Color: ${gem.Color}`}</Typography>
                    <Typography variant="body1">{`Cut: ${gem.Cut}`}</Typography>
                    <Typography variant="body1">{`Clarity: ${gem.Clarity}`}</Typography>
                    <Typography variant="body1">{`Price: $${gem.Price}`}</Typography>
                    <Typography variant="body1">{`Effective Date: ${new Date(gem.EffDate).toLocaleDateString()}`}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Box display="flex">
      <Sidebar>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="div">
              My-Task
            </Typography>
          </Box>
          <List>
            <ListItem button onClick={() => setSelectedMenu('Dashboard')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => setSelectedMenu('Diamond Management')}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Diamond Management" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: '#fff' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Material Management" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: '#fff' }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Our Clients" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: '#fff' }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: '#fff' }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: '#fff' }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Payroll" />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Enable Dark Mode!
          </Typography>
          <Switch />
          <Typography variant="body2" sx={{ mb: 1 }}>
            Enable RTL Mode!
          </Typography>
          <Switch />
        </Box>
      </Sidebar>
      <Content>
        <SearchBar>
        </SearchBar>
        {renderContent()}
      </Content>
    </Box>
  );
};

export default ManagerPage;

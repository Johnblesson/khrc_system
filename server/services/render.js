import axios from 'axios';

export const homeRoute =  async (req, res) => {
  try {
    const apiResponse = await axios.get('http://localhost:5000/api/storages');
    const storage = apiResponse.data; // Assuming your API returns an array named 'storage'
    // res.json(storage);
    res.render('index', { storage });
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const update = async (req, res) => {
  try {
    const apiResponse = await axios.get('http://localhost:5000/api/storages');
    const storage = apiResponse.data; // Assuming your API returns an array named 'storage'
    // res.json(storage);
    res.render('update', { storage });
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Internal Server Error');
  }
};
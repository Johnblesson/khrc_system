import RECEPTION from '../models/reception.js';

// Render the form for Cross-sectional Survey-CSS
export const renderCssForm = async (req, res) => {
    try {
      // Fetch all sampleId values from the database
      const sampleIds = await RECEPTION.distinct('sampleId');
  
      const user = req.isAuthenticated() ? req.user : null;
  
      // Render the form with the sampleId options
      res.render('css', { sampleIds, user });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

// Render the form for Longitudinal Survey 1-LS1
export const renderLs1Form = async (req, res) => {
    try {
      // Fetch all sampleId values from the database
      const sampleIds = await RECEPTION.distinct('sampleId');
  
      const user = req.isAuthenticated() ? req.user : null;
  
      // Render the form with the sampleId options
      res.render('ls1', { sampleIds, user });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  // Render the form for Longitudinal Survey 1-2-LS1-2
export const renderLs12Form = async (req, res) => {
    try {
      // Fetch all sampleId values from the database
      const sampleIds = await RECEPTION.distinct('sampleId');
  
      const user = req.isAuthenticated() ? req.user : null;
  
      // Render the form with the sampleId options
      res.render('ls1-2', { sampleIds, user });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  // Render the form for Longitudinal Survey 2-LS2
export const renderLs2Form = async (req, res) => {
    try {
      // Fetch all sampleId values from the database
      const sampleIds = await RECEPTION.distinct('sampleId');
  
      const user = req.isAuthenticated() ? req.user : null;
  
      // Render the form with the sampleId options
      res.render('ls2', { sampleIds, user });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
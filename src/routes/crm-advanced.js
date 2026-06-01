import express from 'express';
import Contact from '../models/Contact.js';
import Pipeline from '../models/Pipeline.js';
import logger from '../utils/logger.js';

const router = express.Router();

// CONTACTS
router.get('/contacts/:userId', async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, contacts, total: contacts.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/contacts', async (req, res) => {
  try {
    const { userId, email, name, phone, company, source } = req.body;
    const contact = await Contact.create({
      userId,
      email,
      name,
      phone,
      company,
      source,
      status: 'lead'
    });
    logger.info(`✅ Contact created: ${email}`);
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/contacts/:contactId', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.contactId);
    await contact.update(req.body);
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PIPELINE
router.get('/pipeline/:userId', async (req, res) => {
  try {
    const pipeline = await Pipeline.findAll({
      where: { userId: req.params.userId },
      attributes: ['stage'],
      raw: true
    });
    const stages = {};
    ['lead', 'prospect', 'proposal', 'negotiation', 'closed-won', 'closed-lost'].forEach(stage => {
      stages[stage] = pipeline.filter(p => p.stage === stage).length;
    });
    res.json({ success: true, pipeline: stages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/pipeline', async (req, res) => {
  try {
    const opportunity = await Pipeline.create(req.body);
    logger.info(`📊 Opportunity created: ${opportunity.opportunity}`);
    res.json({ success: true, opportunity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
import { Router } from 'express';
import { FormResponsesController } from '../controllers/FormResponseController';

const router = Router();

router.get('/:formId/filteredResponses', FormResponsesController.getFilteredResponses);

export default router;
import { Router } from 'express';
import { FormResponsesController } from '../controllers/FormResponseController';

const router = Router();

router.get('/:formId/filteredResponses', FormResponsesController.getFilteredResponses);
router.get('/', FormResponsesController.getMainPage);

export default router;
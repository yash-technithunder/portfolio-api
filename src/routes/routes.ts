import express from 'express';
import uploadController from '../controllers/uploadController';
import adminController from '../controllers/adminController';
import caseStudyController from '../controllers/caseStudyController';
import categoryController from '../controllers/categoryController';
import {isAdmin, isAdminOrWriter} from '../utility/middleware';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 50 * 1024 * 1024}
});

router.post('/imageUpload', uploadController.imageUpload);
router.get('/welcome', uploadController.welcome);
router.post('/login', adminController.login);
router.post('/register', adminController.register);
router.post(
    '/addCaseStudy',
    upload.fields([
        {name: 'coverImage', maxCount: 1},
        {name: 'backstory[image]', maxCount: 1},
        {name: 'challenge[image]', maxCount: 1},
        {name: 'introduction[image]', maxCount: 1},
        {name: 'result[image]', maxCount: 1},
        {name: 'solution[image]', maxCount: 1}
    ]),
    caseStudyController.createCaseStudy
);
router.get('/getAllCaseStudies', caseStudyController.getAllCaseStudies);
router.get('/getCaseStudy/:id', caseStudyController.getCaseStudy);
router.put(
    '/updateCaseStudy/:id',
    upload.fields([
        {name: 'coverImage', maxCount: 1},
        {name: 'backstory[image]', maxCount: 1},
        {name: 'challenge[image]', maxCount: 1},
        {name: 'introduction[image]', maxCount: 1},
        {name: 'result[image]', maxCount: 1},
        {name: 'solution[image]', maxCount: 1}
    ]),
    caseStudyController.updateCaseStudy
);
router.delete('/deleteCaseStudy/:id', caseStudyController.deleteCaseStudy);
router.post('/add-category', categoryController.createCategory);
router.get('/get-categories', categoryController.getAllCategories);
router.get('/get-category/:id', categoryController.getCategory);
router.put('/edit-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);
router.get('/getSuggestedCaseStudy/:category', caseStudyController.suggestedCaseStudy);
router.get('/getCaseStudyByIntroductionTitle/:title', caseStudyController.getCaseStudyByTitle);
router.get('/getCaseStudyByName/:name', caseStudyController.getCaseStudyByName);

export default router;

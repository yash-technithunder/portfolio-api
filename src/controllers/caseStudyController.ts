import {Request, Response} from 'express';
import CaseStudy from '../models/caseStudy';
import mongoose from 'mongoose';
import {uploadImageToCloudinary} from '../utility/helper';
import {CaseStudyDocument} from '../utility/interface';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const createCaseStudy = async (req: Request, res: Response) => {
    try {
        const files = req?.files as {[fieldname: string]: Express.Multer.File[]} | undefined;
        const findFileByFieldname = (fieldname: string): Express.Multer.File | undefined => (files ? files[fieldname]?.[0] : undefined);
        const images = [
            findFileByFieldname('backstory[image]'),
            findFileByFieldname('challenge[image]'),
            findFileByFieldname('introduction[image]'),
            findFileByFieldname('result[image]'),
            findFileByFieldname('solution[image]')
        ];

        const introductionDesc = req.body['introduction[descriptions]'];
        const techStack = req.body['techStack'];

        const isMulterFile = (file: any): file is Express.Multer.File => {
            return file && typeof file === 'object' && 'fieldname' in file && 'buffer' in file;
        };

        const filteredImages: Express.Multer.File[] = (images ?? []).filter(isMulterFile) as Express.Multer.File[];

        const imageUrls = await Promise.all(
            filteredImages.map(async image => ({
                imgUrl: await uploadImageToCloudinary(image),
                fieldname: image.fieldname
            }))
        );

        const getImgUrl = (field: string) => {
            return imageUrls.find(i => i.fieldname === field)?.imgUrl || '';
        };

        const caseStudyData = {
            category: req.body['category'],
            techStack: techStack,
            name: req.body.name,
            introduction: {
                descriptions: req.body.introduction.descriptions,
                image: getImgUrl('introduction[image]'),
                industry: req.body.introduction.industry || '',
                platform: req.body.introduction.platform || '',
                title: req.body.introduction.title || ''
            },
            backstory: {
                descriptions: req.body.backstory.descriptions,
                image: getImgUrl('backstory[image]')
            },
            challenge: {
                descriptions: req.body.challenge.descriptions,
                image: getImgUrl('challenge[image]')
            },
            solution: {
                descriptions: req.body.solution.descriptions,
                image: getImgUrl('solution[image]')
            },
            result: {
                descriptions: req.body.result.descriptions,
                image: getImgUrl('result[image]')
            }
        };

        const newCaseStudy = new CaseStudy(caseStudyData);
        await newCaseStudy.save();

        return res.status(201).json({
            success: true,
            message: 'CaseStudy created successfully',
            data: newCaseStudy
        });
    } catch (err: any) {
        console.error('Error occurred while creating CaseStudy:', err.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating CaseStudy'
        });
    }
};

const updateCaseStudy = async (req: Request, res: Response) => {
    try {
        const caseStudyId = req?.params?.id;
        const existingCaseStudy = await CaseStudy.findById(caseStudyId).exec();

        if (!existingCaseStudy) {
            return res.status(404).json({
                success: false,
                message: 'CaseStudy not found'
            });
        }
        const files = req?.files as Express.Multer.File[];
        const findFileByFieldname = (fieldname: string): Express.Multer.File | undefined => {
            const fileArray = Object.values(files).flat();
            return fileArray.find((file: Express.Multer.File) => file.fieldname === fieldname);
        };

        const images = [
            findFileByFieldname('backstory[image]'),
            findFileByFieldname('challenge[image]'),
            findFileByFieldname('introduction[image]'),
            findFileByFieldname('result[image]'),
            findFileByFieldname('solution[image]')
        ];

        const imageKeys: Array<keyof CaseStudyDocument> = ['backstory', 'challenge', 'introduction', 'result', 'solution'];

        const introductionDesc = req?.body?.introduction?.descriptions || existingCaseStudy.introduction.descriptions;
        const backstoryDesc = req?.body?.backstory?.descriptions || existingCaseStudy?.backstory?.descriptions;
        const challengeDesc = req?.body?.challenge?.descriptions || existingCaseStudy?.challenge?.descriptions;
        const solutionDesc = req?.body?.solution?.descriptions || existingCaseStudy?.solution?.descriptions;
        const resultDesc = req?.body?.result?.descriptions || existingCaseStudy?.result?.descriptions;
        const techStack = req?.body?.techStack || existingCaseStudy.techStack;
        const category = req?.body?.category || existingCaseStudy.category;

        const imageUrls = await Promise.all(
            images?.map(async (image, index) => {
                const key = imageKeys[index];
                if (image) {
                    try {
                        const filePath = await uploadImageToCloudinary(image);
                        return `${filePath}`;
                    } catch (err) {
                        console.error('Error uploading image:', err);
                        return (existingCaseStudy as any)[key]?.image || '';
                    }
                } else {
                    return (existingCaseStudy as any)[key]?.image || '';
                }
            })
        );
        const updatedCaseStudyData = {
            category: category,
            techStack: techStack,
            name: req.body.name,
            introduction: {
                descriptions: introductionDesc,
                image: imageUrls[2] || existingCaseStudy?.introduction?.image,
                industry: req?.body?.introduction?.industry || existingCaseStudy?.introduction?.industry,
                platform: req?.body?.introduction?.platform || existingCaseStudy?.introduction?.platform,
                title: req?.body?.introduction?.title || existingCaseStudy?.introduction?.title
            },
            backstory: {
                descriptions: backstoryDesc,
                image: imageUrls[0] || existingCaseStudy?.backstory?.image
            },
            challenge: {
                descriptions: challengeDesc,
                image: imageUrls[1] || existingCaseStudy?.challenge?.image
            },
            solution: {
                descriptions: solutionDesc,
                image: imageUrls[4] || existingCaseStudy?.solution?.image
            },
            result: {
                descriptions: resultDesc,
                image: imageUrls[3] || existingCaseStudy?.result?.image
            }
        };

        const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(caseStudyId, updatedCaseStudyData, {new: true}).exec();

        if (!updatedCaseStudy) {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while updating CaseStudy'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'CaseStudy updated successfully',
            data: updatedCaseStudy
        });
    } catch (err: any) {
        console.error('Error occurred while updating CaseStudy:', err.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating CaseStudy'
        });
    }
};

const getAllCaseStudies = async (req: Request, res: Response) => {
    try {
        const caseStudies = await CaseStudy.find();
        return res.status(200).json({
            success: true,
            message: 'caseStudies fetched successfully',
            data: caseStudies
        });
    } catch (err: any) {
        console.error('Error occurred while fetching all CaseStudies:', err.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching all CaseStudies'
        });
    }
};

const getCaseStudy = async (req: Request, res: Response) => {
    try {
        const isIdValid = mongoose.isValidObjectId(req.params.id);
        if (!isIdValid) {
            return res.status(500).json({
                success: false,
                message: 'invalid id passed'
            });
        }

        const caseStudies = await CaseStudy.findById({
            _id: req.params.id
        });
        return res.status(200).json({
            success: true,
            message: 'caseStudies fetched successfully',
            data: caseStudies
        });
    } catch (err: any) {
        console.error('Error occurred while fectching CaseStudy:', err.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fectching CaseStudy'
        });
    }
};

const deleteCaseStudy = async (req: Request, res: Response) => {
    try {
        const isIdValid = mongoose.isValidObjectId(req.params.id);
        if (!isIdValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID passed'
            });
        }
        const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);
        if (caseStudy) {
            return res.status(200).json({
                success: true,
                message: 'caseStudy deleted successfully'
            });
        }
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting caseStudy'
        });
    }
};

const suggestedCaseStudy = async (req: Request, res: Response) => {
    try {
        const {category} = req.params;
        const suggestedCaseStudies = await CaseStudy.find(
            {category: category},
            {
                category: 1,
                techStack: 1,
                introduction: 1,
                backstory: 1,
                challenge: 1,
                solution: 1,
                result: 1
            }
        )
            .sort({createdAt: -1})
            .limit(3);
        return res.status(200).json({
            success: true,
            message: 'suggested caseStudies fetched successfully',
            data: suggestedCaseStudies
        });
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while  fetching suggested caseStudy'
        });
    }
};

const getCaseStudyByTitle = async (req: Request, res: Response) => {
    try {
        const {title} = req.params;
        const caseStudy = await CaseStudy.findOne({'introduction.title': title});
        if (caseStudy) {
            return res.status(200).json({
                success: true,
                data: caseStudy,
                message: 'caseStudy fetched by introduction title '
            });
        } else {
            return res.status(404).json({message: 'caseStudy not found'});
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error occured while fetching caseStudy by introduction title'
        });
    }
};
const getCaseStudyByName = async (req: Request, res: Response) => {
    try {
        const {name} = req.params;
        const caseStudy = await CaseStudy.findOne({name: name});
        if (caseStudy) {
            return res.status(200).json({
                success: true,
                data: caseStudy,
                message: 'caseStudy fetched by name successfully '
            });
        } else {
            return res.status(404).json({message: 'caseStudy not found by name'});
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error occured while fetching caseStudy by name'
        });
    }
};
const caseStudyController = {
    createCaseStudy,
    getAllCaseStudies,
    getCaseStudy,
    deleteCaseStudy,
    updateCaseStudy,
    suggestedCaseStudy,
    getCaseStudyByTitle,
    getCaseStudyByName
};
export default caseStudyController;

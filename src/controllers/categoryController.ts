import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CategoryDto, UpdateCategoryDto } from '../utility/dto';
import Category from '../models/category';
import mongoose from 'mongoose';

const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryDto = plainToClass(CategoryDto, req.body);
    const errors = await validate(categoryDto);
    if (errors.length > 0) {
      const validationErrors = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }
    const transformedTitle = categoryDto.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '-')
      .replace(/\s+/g, '-');

    const newCategory = new Category({
      title: transformedTitle,
    });
    const response = await newCategory.save();
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: response,
    });
  } catch (err: any) {
    console.error('Error occurred while creating Category:', err.message);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating category',
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const category = await Category.find();
    return res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: category,
    });
  } catch (err: any) {
    console.log('error occured while retrieving  blogs');
    return res.status(500).json({
      success: false,
      message: 'error occured while retrieving  blogs',
    });
  }
};

const getCategory = async (req: Request, res: Response) => {
  try {
    const isIdValid = mongoose.isValidObjectId(req.params.id);
    if (!isIdValid) {
      return res.status(500).json({
        success: false,
        message: 'invalid id passed',
      });
    }
    const category = await Category.findById({
      _id: req.params.id,
    });
    if (category) {
      return res.status(200).json({
        success: true,
        message: 'Category fetched successfully',
        data: category,
      });
    }
  } catch (err: any) {
    console.log('error occured while retrieving  category');
    return res.status(500).json({
      success: false,
      message: 'error occured while retrieving  category',
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const isIdValid = mongoose.isValidObjectId(req.params.id);
    if (!isIdValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID passed',
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      return res.status(200).json({
        success: true,
        message: 'category deleted successfully',
      });
    }
  } catch (err: any) {
    console.log('Error occurred while deleting category:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Error occurred while deleting category',
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const isIdValid = mongoose.isValidObjectId(req.params.id);
    if (!isIdValid) {
      return res.status(500).json({
        success: false,
        message: 'invalid id passed',
      });
    }
    const updateCategoryDto = plainToClass(UpdateCategoryDto, req.body);
    const errors = await validate(updateCategoryDto);
    if (errors.length > 0) {
      const validationErrors = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }
    const transformedTitle = updateCategoryDto.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
    await Category.findByIdAndUpdate(req.params.id, {
      title: transformedTitle,
    });

    return res.status(200).json({
      success: true,
      message: 'category updated successfully',
    });
  } catch (err: any) {
    console.log('error occured while updating category');
    return res.status(500).json({
      success: false,
      message: 'error occured while updating category',
    });
  }
};

const categoryController = {
  createCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
export default categoryController;

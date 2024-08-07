import { IsDefined, Matches, IsEmail, IsDateString } from 'class-validator';
import { Expose } from 'class-transformer';

export class BlogDto {
  @IsDefined()
  @Expose()
  category: string;

  @IsDefined()
  @Expose()
  content: string;

  @IsDefined()
  @Expose()
  title: string;

  constructor() {
    this.category = '';
    this.content = '';
    this.title = '';
  }
}

export class UpdateBlogDto {
  @IsDefined()
  @Expose()
  content: string;

  @IsDefined()
  @Expose()
  title: string;

  @IsDefined()
  @Expose()
  category: string;

  constructor() {
    this.content = '';
    this.title = '';
    this.category = '';
  }
}

export class AdminLoginDto {
  @IsDefined()
  @Expose()
  email: string;

  @IsDefined()
  @Expose()
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export class AdminRegisterDto {
  @IsDefined()
  @Expose()
  email: string;

  @IsDefined()
  @Expose()
  username: string;

  @IsDefined()
  @Expose()
  role: string;

  @IsDefined()
  @Expose()
  password: string;

  constructor() {
    this.email = '';
    this.username = '';
    this.role = '';
    this.password = '';
  }
}

export class KeywordDto {
  @IsDefined()
  @Expose()
  keyword: string;

  constructor() {
    this.keyword = '';
  }
}

export class ContactDto {
  @IsDefined()
  @Expose()
  name: string;

  @IsDefined()
  @Expose()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsDefined()
  @Expose()
  description: string;

  @IsDefined()
  @Expose()
  mobileNo: number;

  constructor() {
    this.name = '';
    this.description = '';
    this.email = '';
    this.mobileNo = 0;
  }
}

export class CategoryDto {
  @IsDefined()
  @Expose()
  title: string;

  constructor() {
    this.title = '';
  }
}

export class UpdateCategoryDto {
  @IsDefined()
  @Expose()
  title: string;

  constructor() {
    this.title = '';
  }
}

export class ReviewDto {
  @IsDefined()
  @Expose()
  clientName: string;

  @IsDefined()
  @Expose()
  review: string;

  constructor() {
    this.clientName = '';
    this.review = '';
  }
}

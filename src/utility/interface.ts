// import mongoose from 'mongoose';

// export interface IBlog {
//     id: string;
//     title: string;
//     content: string;
//     category: string;
// }

// export interface IAdmin {
//     id: string;
//     email: string;
//     password: string;
// }

// export interface ISubscriber {
//     id: string;
//     email: string;
// }

// export interface IAdminRegister {
//   id: string;
//   email: string;
//   username: string;
//   role: 'Admin' | 'Writer';
//   password: string;
// }
// export interface IKeyword {
//     id: string;
//     keyword: string;
// }
// export interface IContact {
//     id: string;
//     name: string;
//     email: string;
//     mobileNo: number;
//     description: string;
// }

// export interface ICategory {
//     id: string;
//     title: string;
// }

// export interface IReview {
//     id: string;
//     clientLogo: string;
//     clientName?: string;
//     review: string;
//     designation: string;
// }

// export interface CaseStudyDocument extends mongoose.Document {
//     category: string;
//     techStack: string[];
//     backstory?: {
//         descriptions: string[];
//         image?: string;
//     };
//     challenge?: {
//         descriptions: string[];
//         image?: string;
//     };
//     introduction?: {
//         descriptions: string[];
//         image?: string;
//         industry?: string;
//         platform?: string;
//         title?: string;
//     };
//     result?: {
//         descriptions: string[];
//         image?: string;
//     };
//     solution?: {
//         descriptions: string[];
//         image?: string;
//     };
// }

// interface Section {
//     descriptions: string[];
//     image: string;
// }

// interface BackStory {
//     descriptions: string[];
//     image: string;
// }

// interface Challenge {
//     descriptions: string[];
//     image: string;
// }

// interface Solution {
//     descriptions: string[];
//     image: string;
// }

// interface Result {
//     descriptions: string[];
//     image: string;
// }
// interface Introduction extends Section {
//     industry: string;
//     platform: string;
//     title: string;
// }

// export interface ICaseStudy extends Document {
//     category: string;
//     techStack: string;
//     introduction: Introduction;
//     backstory: BackStory;
//     challenge: Challenge;
//     solution: Solution;
//     result: Result;
// }

// export interface IBlogData {
//     id: string;
//     title: string;
//     content: string;
//     category: string;
// }

// export interface MulterFile {
//     fieldname: string;
//     originalname: string;
//     encoding: string;
//     mimetype: string;
//     size: number;
//     buffer: Buffer;
// }

// export interface MulterFiles {
//     [fieldname: string]: MulterFile[];
// }

import mongoose, {Document} from 'mongoose';

export interface IBlog {
    id: string;
    title: string;
    content: string;
    category: string;
}

export interface IAdmin {
    id: string;
    email: string;
    password: string;
}

export interface ISubscriber {
    id: string;
    email: string;
    isSubscribed: boolean;
}

export interface IAdminRegister {
    id: string;
    email: string;
    username: string;
    role: 'Admin' | 'Writer';
    password: string;
}

export interface IKeyword {
    id: string;
    keyword: string;
}

export interface IContact {
    id: string;
    name: string;
    email: string;
    mobileNo: number;
    description: string;
}

export interface ICategory {
    id: string;
    title: string;
}

export interface IReview {
    id: string;
    clientLogo: string;
    clientName?: string;
    review: string;
    designation: string;
}

export interface CaseStudyDocument extends Document {
    category: string;
    name: string;
    techStack: string[];
    introduction: {
        descriptions: string[];
        image?: string;
        industry?: string;
        platform?: string;
        title?: string;
    };
    backstory?: {
        descriptions: string[];
        image?: string;
    };
    challenge?: {
        descriptions: string[];
        image?: string;
    };
    solution?: {
        descriptions: string[];
        image?: string;
    };
    result?: {
        descriptions: string[];
        image?: string;
    };
}

export interface IBlogData {
    id: string;
    title: string;
    content: string;
    category: string;
}

export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}

export interface MulterFiles {
    [fieldname: string]: MulterFile[];
}

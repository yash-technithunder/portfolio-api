import mongoose from 'mongoose';
import {CaseStudyDocument} from '../utility/interface';

const caseStudySchema = new mongoose.Schema<CaseStudyDocument>(
    {
        category: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
            required: true
        },
        techStack: {
            type: [String],
            required: true
        },
        introduction: {
            descriptions: {
                type: [String],
                required: true
            },
            image: {
                type: String,
                required: false
            },
            industry: {
                type: String,
                required: false
            },
            platform: {
                type: String,
                required: false
            },
            title: {
                type: String,
                required: false
            }
        },
        backstory: {
            descriptions: {
                type: [String],
                required: false
            },
            image: {
                type: String,
                required: false
            }
        },
        challenge: {
            descriptions: {
                type: [String],
                required: false
            },
            image: {
                type: String,
                required: false
            }
        },
        solution: {
            descriptions: {
                type: [String],
                required: false
            },
            image: {
                type: String,
                required: false
            }
        },
        result: {
            descriptions: {
                type: [String],
                required: false
            },
            image: {
                type: String,
                required: false
            }
        },
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const CaseStudy = mongoose.model<CaseStudyDocument>('CaseStudy', caseStudySchema);
export default CaseStudy;

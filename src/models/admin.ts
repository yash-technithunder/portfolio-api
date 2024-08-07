import mongoose from 'mongoose';
import {IAdminRegister} from '../utility/interface';

const adminSchema = new mongoose.Schema<IAdminRegister>({
    id: {
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        enuwm: ['Admin', 'Writer']
    },
    password: {
        required: true,
        type: String
    }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

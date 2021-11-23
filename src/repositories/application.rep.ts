import { createApplicationReq } from '../types/Requests/application.requests';
import { applicationSchema } from '../models/application.model';


export class MainApplication {
    constructor() { }

    createApplication(application: createApplicationReq) {
        return new applicationSchema(application).save();
    };

    getAllApplication() {

        return applicationSchema.find().populate('creatorId', 'email');
    }

}
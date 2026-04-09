import {BaseRepository }from "./base.repo.js";
import {User} from "../models/index.js";

class UserRepository extends BaseRepository {
    constructor() {
        super(User); 
    }
    async findByEmail(email,select={}) {
        return await this._model.findOne(email).select(select);
    }

  
    async findByIdWithMessages(_id) {
        return await this._model.findById(_id).populate("Messages");
    }
}

export default new UserRepository();
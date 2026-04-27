 export class BaseRepository {
     constructor(model) {
         this._model = model;
     }

     async createDocument(data) {

         return await this._model.create(data);
     }

     async findById(id, select = {}) {
         return await this._model.findById(id).select(select);
     }
     async findOne(filter, select = {}) {
         return await this._model.findOne(filter).select(select);
     }
     async findAll(filter, select = {}) {
         return await this._model.find(filter).select(select);
     }
     async findAndUpdateDocument(id, data, options = {
         new: true
     }) {
         return await this._model.findByIdAndUpdate(id, data, options);
     }
     async deleteDocument(id, options = {
         new: true
     }) {
         return await this._model.findByIdAndDelete(id, options);
     }

     async deleteMany(filter) {
         return await this._model.deleteMany(filter);

     }

     async softDeleteDocument(id){
        return await this._model.findByIdAndUpdate(id,{
            isDeleted: true,
            deletedAt : new Date()
        })
     }

     async restoreDeletedDocument(id){
        return await this._model.findByIdAndUpdate(id,{
            isDeleted: false,
            deletedAt : null
        })
     }
 }
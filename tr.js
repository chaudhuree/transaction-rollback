const mongoose= require("mongoose")

const CreateParentChildService = async (ParentModel,ChildModel) => {
    const session = await mongoose.startSession();
    

    try {
        session.startTransaction();
        // Create the parent data first
        const parentData = await ParentModel.create({ name: 'Parent' }, { session });

        // Create the child data using the parent's ID
        const childData = await ChildModel.create({ name: 'Child', parent: parentData._id }, { session });

        // Commit the transaction if no error occurs
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        // Rollback the transaction if an error occurs
        await session.abortTransaction();
        session.endSession();
        console.error(error.toString());
   }
}

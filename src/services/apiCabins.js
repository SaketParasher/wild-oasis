import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {

    let { data: cabins, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error('Error while loading the cabins');
    }

    return cabins;
}

export async function deleteCabin(id) {

    const { error, data } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Cabin Could not be deleted")
    }

    return data;
}

// this method will be used to create a new cabin or edit an existing cabin
export async function insertUpdateCabin(cabinData, cabinId) {

    console.log("cabindata", cabinData);
    console.log("cabinid ", cabinId)

    // either in update or create if image is uploaded from UI then cabinData.image type will not be
    // string , it will be of type object. In Edit mode if user does not choose different image then
    // it will be string
    const shouldUploadImage = typeof cabinData.image !== "string";

    // create image name and image url 
    const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll("/", "");
    const imageUrl = shouldUploadImage ?
        `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}` : cabinData.image;

    let query = supabase.from('cabins');

    // if cabinId is not there then it is a create/insert cabin operation
    if (!cabinId) {
        query = query.insert([
            { ...cabinData, image: imageUrl },
        ])
    } else {
        // else it is update cabin operation
        query = query.update({ ...cabinData, image: imageUrl })
            .eq('id', cabinId)
    }

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error);
        throw new Error("Error While Creating the Cabin !")
    }

    if (shouldUploadImage) {

        // upload the image once the cabin data is created
        const { error: imageUploadError } = await supabase
            .storage
            .from('cabin-images')
            .upload(imageName, cabinData.image)

        // if there is an error while uploading the image then delete the cabin and throw the error

        if (imageUploadError) {
            deleteCabin(cabinData.id);
            console.log(`[imageUploadError]: ${imageUploadError}`);
            throw new Error('Error while creating the cabin, since image was not uploaded!')
        }

    }

}
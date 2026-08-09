import supabase from "./supabase";

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
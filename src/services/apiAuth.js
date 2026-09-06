import supabase, { supabaseUrl } from "./supabase"

export const LoginUser = async ({ email, password }) => {

    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        console.error("Error while login ", error);
        throw new Error(error.message)
    }

    return data;
}

export const getCurrentUser = async () => {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return user;

}

export const Logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message)
    }
}

export const Signup = async ({ fullName, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: ''
            }
        }
    })

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export const updateUser = async ({ fullName, password, avatar }) => {

    // 1. update user fullName and password , at one time only one will be update
    let updateData;
    if (password) updateData = { password }
    if (fullName) updateData = { data: { fullName } }

    const { data, error } = await supabase.auth.updateUser(updateData)

    if (error) throw new Error(error.message);
    if (!avatar) return data;

    // 2. If avatar is passed then upload it
    const fileName = `avatar-${data.user.id}-${Math.random()}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, avatar);

    if (uploadError) throw new Error(uploadError.message)

    // 3. update the user again with avatar url
    const { data: updatedUser, error: updatedUserError } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
    })

    if (updatedUserError) throw new Error(updatedUserError.message);
    return updatedUser
}
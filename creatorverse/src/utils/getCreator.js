import { supabase } from "../api/client";

const getCreator = async (creatorId) => {
    const { data: creator, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", creatorId);

    if (error) {
        console.log(error);
        return {}
    }
    return creator[0];
};

export { getCreator };

import DeleteRecipeSuccess from "@components/DeleteRecipeSuccess"

const DeleteRecipeSuccessPage = async({params})=>{
    const {id} = await params
        return (
            <DeleteRecipeSuccess id={id}/>
        )
}

export default DeleteRecipeSuccessPage
import EditRecipeForm from "@components/EditRecipeForm"

const EditRecipePage = async({params})=>{
     const {id,recipeID} = await params
    return(
        <div>
            EditRecipePage
            <EditRecipeForm id={recipeID} userID={id}/>
        </div>
    )
}

export default EditRecipePage
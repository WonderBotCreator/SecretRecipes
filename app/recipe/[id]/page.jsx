import RecipeDetail from "@components/RecipeDetail"

const RecipeDetailPage = async({params})=>{
    const param = await params
    return(
        <div>
            <RecipeDetail id={param.id}/>
        </div>
    )
}

export default RecipeDetailPage
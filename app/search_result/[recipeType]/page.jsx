import SearchResult from "@components/SearchResult"

const SearchResultPage = async({params})=>{
    const {recipeType} = await params
    

    return(
       <SearchResult query={''} recipesType={recipeType === 'main_dish'? 'main dish': recipeType=== ''? 'all':recipeType}/>
    )
}

export default SearchResultPage
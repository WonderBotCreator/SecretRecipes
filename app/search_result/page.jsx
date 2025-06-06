import SearchResult from "@components/SearchResult"

const SearchResultPage = async({params})=>{
    const {recipeType} = await params
    
    if(recipeType === undefined)
    {
        return(
            <SearchResult query={''} recipesType={'all'}/>
        )
    }
    
    return(
       <SearchResult query={''} recipesType={recipeType === 'main_dish'? 'main dish': recipeType}/>
    )
}

export default SearchResultPage
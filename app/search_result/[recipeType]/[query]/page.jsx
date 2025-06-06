import SearchResult from "@components/SearchResult"

const SearchResultPage = async({params})=>{
    const {query,recipeType} = await params
    

    return(
       <SearchResult query={query} recipesType={recipeType === 'main_dish'? 'main dish': recipeType}/>
    )
}

export default SearchResultPage
import AllRecipe from "@components/AllRecipe"
import Footer from "@components/Footer"
import Nav from "@components/Nav"
import Promotion from "@components/Promotion"

const Home = ()=>{
    return(
        <div className="bg-[#e3b986]">
            
            <Promotion/>
            <AllRecipe/>
            
        </div>
    )
}

export default Home


const IngredientForm = ({ ingredient, handleIngredientName, handleIngredientAmount,  handleDelete})=>{
  
    return(
        <div className="flex flex-col sm:flex-row gap-3">
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Ingredient name</legend>
                                <input onChange={handleIngredientName} value={ingredient.name} type="text" className="input w-full" placeholder="Ingredient name" />
                            </fieldset>
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Amount</legend>
                                <input onChange={handleIngredientAmount} value={ingredient.amount} type="text" className="input w-full" placeholder="Amount" />
                               <button onClick={handleDelete} className="btn btn-outline btn-error">Remove</button>
                            </fieldset>
                             
                        </div>
    )
}

export default IngredientForm
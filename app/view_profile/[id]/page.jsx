import ViewProfile from "@components/ViewProfile"



const ViewProfilePage = async({params})=>{
    const {id} = await params

    return(
        <div>
            <ViewProfile id={id} />
        </div>
    )
}

export default ViewProfilePage
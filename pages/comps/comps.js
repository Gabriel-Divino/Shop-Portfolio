
export  function Spinner({visible}){

    if(visible == true){
        return(
            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>
        )
    }else{
        return(
            <div>

            </div>
        )
    }

}


export  function Alert({type="primary",text=""}){

    return(
        <div class={`alert alert-${type}`} role="alert" id="alert" style={{fontSize:"120%"}}>
            {text}
        </div>
    )




}



export default function Comps(){

    return(
        <div>

        </div>
    )

}
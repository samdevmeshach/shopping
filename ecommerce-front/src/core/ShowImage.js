import React from "react";
import API from "../config";

const ShowImage = ({item,url}) => {
    return (
        <div className="product-img">
            <img
                src={`${API}/${url}/photo/${item._id}`}
                alt={item.name}
                className="img-thumbnail mb-3"
                style={{maxHeight:"200px",maxWidth:"200px",width:"200px",height:"200px"}}
            />
        </div>
    )
}

export default ShowImage
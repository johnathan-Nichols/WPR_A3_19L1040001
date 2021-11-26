import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Transfer(props){
  const navigate = useNavigate();

  useEffect(()=>{
    if(props===undefined){
      navigate("/");
    }
  
    if(props.loc===undefined){
      navigate("/");
    }
  
    try{
      navigate(props.loc);
    }catch(err){
      navigate("/");
    }
  },[navigate, props])

  return null;
}

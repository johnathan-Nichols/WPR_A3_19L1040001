import {useNavigate} from "react-router-dom";

export default function Transfer(props){
  const navigate = useNavigate();

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
  return null;
}

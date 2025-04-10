import React,{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link,useNavigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage = (event) => {

    const [email,loginEmail]=useState('');
    const [password,loginPassword]=useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    const handleSearch=async(event)=>{
      event.preventDefault();

      try{
        const response = await api.post('/user/login',{email, password}); //req.body에 넣으려면 post 사용용
        if(response.status===200){
          setUser(response.data.user)
          sessionStorage.setItem("token",response.data.token);
          api.defaults.headers['authorization']="Bearer "+response.data.token;//headers에 토큰 넣고 백엔드에 보내기
          setError("");
          navigate("/");
        }
        throw new Error(response.message);

      }catch(error){
        setError(error.message);
    
      }
  }
  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleSearch}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email}
          onChange={(event)=>loginEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password}
          onChange={(event)=>loginPassword(event.target.value)}/>
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;


//토큰 저장
//Local storage : 영구적 데이터 저장소, 사용자가 일부로 브라우저 정보를 삭제하지 않는 이상 계속 유지, 특정도메인에서 저장한 데이터는 다른 도메인과 공유 x
// session storage : 세션이 유지되는 동안에만 유효한 저장소(세션 유지란, 브라우저가 닫히거나 중료되는것) 같은 도메인내에 모든 페이지에서 데이터 공유유

//쉡게 창 닫으면 끝 = session storage, 닫아도 유지 : local storage
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Login.css'; // 스타일 파일 경로
import '../Css/Common.css'; // 스타일 파일 경로
import API from '../API/axios';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        id: id, // 사용자로부터 입력받은 id 값
        password: password // 사용자로부터 입력받은 password 값
      };
      console.log(userData); 
      const response = await API.post('/auth/login', userData);
    
      if (response.code === 200) {
        console.log('로그인 성공:', response.data);
    
        // 액세스 토큰을 localStorage에 저장
        const authorizationHeader = response.headers['authorization'];
        localStorage.setItem('access', authorizationHeader);
    
        // 사용자 데이터를 localStorage에 저장 (필요한 경우)
        localStorage.setItem('data', response.data);
    
        alert('로그인에 성공했습니다.');
        navigate('/myigloo');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  };


  return (
    <div className='full_container'>
      <div className='background_f'>
        <div className='window'>
          <div className='logo'>
            <img
              src={require('../Image/Login/Title.png')}
              alt="IGLOO"
              style={{ width: '80%' }}
            />
          </div>
          <form className='input_container' onSubmit={handleLogin}>
            <input type='text' name='id' placeholder='아이디를 입력해주세요' value={id} onChange={(e) => setId(e.target.value)} required />
            <input type='password' name='password' placeholder='비밀번호를 입력해주세요' value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" className='google_button'>
              로그인
            </button>

            <div className='find_last_login_do_it'>
              <Link to='/joinmembership' >회원가입</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

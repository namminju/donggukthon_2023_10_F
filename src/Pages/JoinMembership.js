import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css'; // 스타일 파일 경로
import '../Css/Common.css'; // 스타일 파일 경로
import API from '../API/axios';

function Login() {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // ... (unchanged code for handling login)

    // Additional logic if needed after successful login

    // Reset form fields
    setId('');
    setUsername('');
    setNickname('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleDuplicateCheck = (id) => {
    // Logic for checking duplicate ID
    // You can make an API call or implement your own logic here
    console.log(`Checking duplicate for ID: ${id}`);
  };

  return (
    <div className='full_container'>
      <form onSubmit={handleLogin}>
        <div style={{ width: '100%', aspectRatio: '7 / 1', display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', textAlign: "center", alignItems: 'center' }}>
          <img
            src={require('../Image/JoinMember/ESC.png')}
            alt="edit"
            style={{ width: '20%' }}
          />
          <div>회원가입</div>
        </div>

        <hr />
        <label htmlFor="username">이름</label>
        <br />
        <input type="text" id="username" value={username} placeholder="이름를 입력하세요" className="ip" onChange={(e) => setUsername(e.target.value)} required />
        <br/>
        <label htmlFor="nickname">닉네임</label>
        <br />
        <input type="text" id="nickname" value={nickname} placeholder="닉네임을 입력하세요" className="ip" onChange={(e) => setNickname(e.target.value)} required />
        <br/>
        <label htmlFor="userid">아이디</label>
        <br />
        <input type="text" id="userid" value={id} placeholder="아이디를 입력하세요" className="ip" onChange={(e) => setId(e.target.value)} required />
        <button type="button" onClick={() => handleDuplicateCheck(id)}>중복확인</button>
        <br/>
        <label htmlFor="password">비밀번호</label>
        <br />
        <input type="password" id="password" value={password} placeholder="영문+숫자 조합 8자리 이상 입력해주세요." className="ip" onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" id="confirmPassword" value={confirmPassword} placeholder="비밀번호 확인" className="ip" onChange={(e) => setConfirmPassword(e.target.value)} required />
        <br/>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css';
import '../Css/Common.css';
import API from '../API/axios';

function Login() {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(false);
    const navigate = useNavigate();
    const handleBackClick = () => {
      // Use navigate to go back
      navigate(-1);
    };
    const handleLogin = async (e) => {
      e.preventDefault();
      const user = {
        id: id,
        password: password,
        korName: username,
        nickname: nickname
      };
      
      if (isDuplicate) {
        alert('중복된 아이디입니다. 다른 아이디를 선택해주세요.');
        return;
      }
  
      try {
        
        await API.post('/auth/login', user)
        .then((response) => {
          if (response.status === 201) {
            alert("회원가입에 성공했습니다.");
              navigate('/login');
          }
        
      })
        await API.registerUser(user);
  
        // Additional logic if needed after successful registration
  
        // Reset form fields
        setId('');
        setUsername('');
        setNickname('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error, show alert or redirect to an error page
      }
    };
  
    const handleDuplicateCheck = async (id) => {
      try {
        const response = await API.post('/auth/check', { id });
        const canMake = response.data.canMake;
    
        if (canMake === 'True') {
          alert('사용 가능한 아이디입니다.');
          setIsDuplicate(true);
        } else {
          alert('중복된 아이디입니다. 다른 아이디를 선택해주세요.');
          setIsDuplicate(false); // 중복 풀기
        }
      } catch (error) {
        console.error('Error checking duplicate ID:', error);
      }
    };
    
    

  return (
    <div className="full_container">
      <form onSubmit={handleLogin} style={{ margin: '0 10%' }}>
        <div style={{ margin: '5% 0', width: '100%', aspectRatio: '7 / 1', display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', textAlign: "center", alignItems: 'end' }}>
          <img
            src={require('../Image/JoinMember/ESC.png')}
            alt="edit"
            style={{ width: '20%' }}
            onClick={handleBackClick}
          />
          <div className='join_title'>회원가입</div>
        </div>

        <hr color='#D9D9D9' />
        <br />
        <div>
          <label htmlFor="username">이름</label>
          <br /><br />
          <input type="text" id="username" value={username} placeholder="이름(실명)을 입력해주세요" className="ip" onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <br />
        <div>
          <label htmlFor="nickname">닉네임</label>
          <br /><br />
          <input type="text" id="nickname" value={nickname} placeholder="닉네임을 입력해주세요" className="ip" onChange={(e) => setNickname(e.target.value)} required />
        </div>
        <br />
        <label htmlFor="userid">아이디</label>
        <br /><br />
        <div style={{ display: 'grid', width: '100%', gap: '10px', gridTemplateColumns: '3fr 0.78fr' }}>
          <input type="text" id="userid" style={{ width: "100%", aspectRatio: '6 / 1' }} value={id} placeholder="아이디를 입력해주세요" className="ip" onChange={(e) => setId(e.target.value)} required />
          <button type="button" className="double_check" onClick={() => handleDuplicateCheck(id)}>중복확인</button>
          <div></div>
        </div>
        <br />
        <label htmlFor="password">비밀번호</label>
        <br /><br />
        <input style={{ width: "100%", aspectRatio: '9 / 1' }} type="password" id="password" value={password} placeholder="영문+숫자 조합 8자리 이상 입력해주세요." className="ip" onChange={(e) => setPassword(e.target.value)} required />
        <input style={{ width: "100%", aspectRatio: '9 / 1' }} type="password" id="confirmPassword" value={confirmPassword} placeholder="비밀번호 확인" className="ip" onChange={(e) => setConfirmPassword(e.target.value)} required />
        <br /><br />
        {isDuplicate ? (
          <button className='double_check' style={{ width: "100%", aspectRatio: '7 / 1' }} type="submit">
          가입하기
          </button>
        ) : (
           <button className='double_check' style={{ width: "100%", aspectRatio: '7 / 1' }} type="button" onClick={() => alert("중복확인이 필요합니다!")}>
                    가입하기
            </button>
        )}
      </form>
    </div>
  );
}

export default Login;

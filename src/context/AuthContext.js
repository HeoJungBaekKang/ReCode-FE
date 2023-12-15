import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');


    let initialAuthData = storedAuthData ? JSON.parse(storedAuthData) : {   // 변경한 부분 
      id: null,
      username: null,
      nickname: null,
      createdAt: null,
      role: null, // minhee 추가한 부분 : 사용자의 역할 정보 추가
      token: localStorage.getItem("token") || null,
    };

    // 관리자 여부 확인 
    initialAuthData = {
      ...initialAuthData,
      isAdmin: initialAuthData.role === 'ADMIN',
    }
    return initialAuthData;

  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

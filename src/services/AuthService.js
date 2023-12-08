import axios from "axios";

const AuthService = {
  signup: async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/join",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      throw new Error("회원가입 실패: " + error.message);
    }
  },
};

export default AuthService;

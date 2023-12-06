import './FindIdForm.css';

const FindIdForm = () => {
  return (
<div className="relative bg-white w-full h-[1052px] overflow-hidden text-black font-itim">
  <div className="flex flex-col items-center justify-center h-full">
    {/* Header with back button and title */}
    <div className="flex items-center space-x-3 mb-6">
      <img
        className="w-[36px] h-[45px] object-cover"
        alt="뒤로가기"
        src="./right-arrow1.png"
      />
      <h1 className="text-[29xl] text-center">아이디 찾기</h1>
    </div>

    {/* Form container */}
    <div className="w-[730px] bg-white p-6 shadow rounded-lg">
      <p className="text-sm text-gray-700 mb-4">
        회원 가입 시 입력한 이메일을 입력하세요
      </p>

      {/* Nickname input */}
      <div className="mb-4">
        <label htmlFor="nickname" className="block text-gray-700 mb-2">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          className="w-full h-[50px] border border-black px-3 rounded"
          placeholder="닉네임을 입력하세요"
        />
      </div>

      {/* Email input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          이메일
        </label>
        <input
          type="email"
          id="email"
          className="w-full h-[50px] border border-black px-3 rounded"
          placeholder="이메일 주소를 입력하세요"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="w-[75px] h-[27px] text-xl text-blue-600 border border-blue-600 rounded-full"
        >
          취소
        </button>
        <button
          type="submit"
          className="w-[77px] h-[27px] bg-blue-600 text-xl text-black rounded-full"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default FindIdForm;

import axios from "axios";


const CreateNotice = async(noticeData) => {
  try {
    const response = await axios.post('http://localhost:8081/api/admin/v1/create-notice', noticeData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('공지사항 생성 중 오류 발생', error);
  }
}

export default CreateNotice;



// export default function CreateNotice() {
//   const { authData } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   console.log(authData);

//   // 초기값 세팅 부분
//   const [write, setWrite] = useState({
//     title: "",
//     content: "",
//     userId: "",
//   });

//   const handleCustomSelectChange = (selectedOptions) => {
//     // selectedOptions는 선택된 옵션 객체들의 배열
//     setSelectedSkills(selectedOptions.map(option => option.value));
//     console.log(selectedSkills);
//   };

//   // 단일 select skill handler

  
//   const submitWrite = async (e) => {
//     e.preventDefault();

//     const combinedSkills = [...selectedSkills, write.skills].filter(Boolean);

//     const formData = {
//       ...write,
//       skills: combinedSkills,
//     };

//     fetch(`http://localhost:8081/api/v1/study`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         Authorization: `Bearer ${authData.token}`,
//       },
//       // javascript 오브젝트를 json으로 변경해서 전송한다는 의미
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json(data))
//       .then((res) => {

//         console.log(res.data);
//       });
//   };

//   return (
//     <form onSubmit={submitWrite} className="mx-auto mt-16 max-w-xl sm:mt-20">
//       <div className="flex gap-x-3">
//         <div className="sm:col-span-2">
//           <div className="w-48">
//             <label
//               htmlFor="skills"
//               className="block text-sm font-semibold leading-6 text-gray-900"
//             >
//               모집구분
//             </label>

//             <select
//               id="skills"
//               name="skills"
//               value={write.skills}
//               onChange={(e) => setWrite({...write, skills: e.target.value})}
//               className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-"
//             >
//               <option>선택</option>
//               <option value="frontEnd">frontend</option>
//               <option value="backEnd">backEnd</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div>
//         <label
//           htmlFor="startDate"
//           className="block text-sm font-semibold leading-6 text-gray-900"
//         >
//           스터디 시작 날짜
//         </label>
//         <div className="mt-1">
//           <input
//             value={write.startDate}
//             onChange={(e) => setWrite({...write, startDate: e.target.value})}
//             type="date"
//             name="startDate"
//             id="startDate"
//             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//         </div>
//       </div>
//       <div>
//         <label
//           htmlFor="endDate"
//           className="block text-sm font-semibold leading-6 text-gray-900"
//         >
//           스터디 종료 날짜
//         </label>
//         <div className="mt-1">
//           <input
//             value={write.endDate}
//             onChange={(e) => setWrite({...write, endDate: e.target.value})}
//             type="date"
//             name="endDate"
//             id="endDate"
//             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//         </div>
//       </div>

//       <label
//         htmlFor="startDate"
//         className="block text-sm font-semibold leading-6 text-gray-900"
//       >
//         출석 인정 시작 시간
//       </label>
//       <div className="mt-1">
//         <DateTimePicker onChange={(e) => setWrite({...write, startTime: e.target.value})}/>
//       </div>

//       <label
//         htmlFor="startDate"
//         className="block text-sm font-semibold leading-6 text-gray-900"
//       >
//         출석 인정 마지막 시간
//       </label>
//       <div className="mt-1">
//       <DateTimePicker onChange={(e) => setWrite({...write, skills: e.target.value})} />
//       </div>

//       <div className="sm:col-span-2">
//         <label
//           htmlFor="studyName"
//           className="block text-sm font-semibold leading-2 text-gray-900"
//         >
//           스터디 이름
//         </label>
//         <div className="mt-2.5 mb-4">
//           <input
//             value={write.studyName}
//             onChange={(e) => setWrite({...write, studyName: e.target.value})}
//             type="text"
//             name="studyName"
//             id="studyName"
//             autoComplete="studyName"
//             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//         </div>
//       </div>

//       {/* <MultiSelect name="skills" onChange={handleCustomSelectChange} /> */}
//       <div className="sm:col-span-2 mt-2.5">
//         <label
//           htmlFor="title"
//           className="block text-sm font-semibold leading-3 text-gray-900"
//         >
//           제목
//         </label>
//         <div className="mt-2.5">
//           <input
//             value={write.title}
//             onChange={(e) => setWrite({...write, title: e.target.value})}
//             type="text"
//             name="title"
//             id="title"
//             autoComplete="title"
//             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//         </div>
//       </div>
//       <div className="sm:col-span-2">
//         <div className="mt-2.5">
//           <textarea
//             value={write.description}
//             onChange={(e) => setWrite({...write, description: e.target.value})}
//             name="description"
//             id="description"
//             rows={11}
//             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             defaultValue={""}
//           />
//         </div>
//       </div>

//       <div className="mt-10">
//         <div className="flex gap-x-3">
//           <button
//             type="reset"
//             onClick={() => navigate("/")}
//             className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             작성완료
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }


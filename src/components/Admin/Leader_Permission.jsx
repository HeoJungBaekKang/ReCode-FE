import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from "./AdminSidebar";
import Pagination from "../Fix/Pagination";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import Search from "../Fix/Search";
import axios from "axios";

export default function Member_list() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('카테고리')

  const { authData } = useContext(AuthContext);
  const { study_id } = useParams();

  const [keyword, setKeyword] = useState("");
  const [studymember, setPost] = useState([]);

  const handleGet = async () => {
      try {

        let url = `http://localhost:8081/api/v1/study-member/${study_id}/list`;

        if(keyword){
          url += `?keyword=${keyword}`;
        }
        if(category !== null){
          const seperator = keyword ? '&' : '?';
          url += `${seperator}category=${category}`;
        }
        
        await axios.get( url , {
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${authData.token}`
          }
        })
            .then(response => {
              console.log(response.data);

              setPost(response.data.data || []);

              const code = response.data.code;

              if(code === 1){
                console.log("멤버 목록 조회 성공");
              }else{
                console.log("멤버 목록 조회 실패");
              }
            })
      } catch (error) {
        console.error("스터디 멤버 조회 중 오류 발생 : ",error);
        console.log(error.response);
      }
  }

  const handleCategoryChange = (category) => {
    setCurrentCategory(category || '카테고리');
    let categoryNumber;
    switch (category) {
        case '공지사항':
            categoryNumber = 0;
            break;
        case '회고록':
            categoryNumber = 1;
            break;
        case '자료공유':
            categoryNumber = 2;
            break;
        default:
            categoryNumber = null;
    }
    setCategory(categoryNumber);
    handleGet(); // 카테고리가 변경될 때마다 handleGet 호출
}

const chunkedPosts = chunk(posts,10);

useEffect( () => {
  handleGet(); // 페이지 처음 Rendering시 얘 실행
},   [keyword]);

//=====

  return (
    <>
      <AdminSidebar />

      <div className="ml-56 mt-12">
        <Card className="h-full w-auto mx-4">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  스터디 권한 관리
                </Typography>
                <br />
                <Typography variant="h6" color="blue-gray">
                  스터디 멤버 목록
                </Typography>
              </div>
≈
            </div>
            <div className="col-span-2 ">
              <Search></Search>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-4 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-4 py-4">
                            사용자 번호
                          </th>
                          <th scope="col" className="px-4 py-4">
                            사용자 이름
                          </th>
                          <th scope="col" className="px-4 py-4">
                            역할
                          </th>
                          <th scope="col" className="px-4 py-4">
                            계정관리
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        { chunkedPosts && chunkedPosts[currentPage] && chunkedPosts[currentPage].map( (post,index) => (
                          <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 pt-10">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {studymember.id}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                                {studymember.id}
                            </td>

                          <td className="whitespace-nowrap px-6 py-4">팀장</td>

                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs w-20 rounded">
                            {" "}
                            역할변경{" "}
                          </button>

                          </tr>
                        ) ) }
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 pt-10">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            1
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            minhee
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">팀장</td>
                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs w-20 rounded">
                            {" "}
                            역할변경{" "}
                          </button>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Pagination />
      </div>
    </>
  );
}

function chunk(array,size) {
  const chunked_arr = []
  let copied = [...array]

  while(copied.length > 0){
    chunked_arr.push(copied.splice(0,size))
  }

  return chunked_arr
}

function SearchBox( {keyword, setKeyword} ){

}

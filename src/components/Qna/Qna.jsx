import React, { useState, useEffect } from "react";
import QnaSidebar from "./QnaSidebar";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { fetchQnaList } from "../../services/QnaService";
import { format } from 'date-fns';




export default function Qna() {
    const navigate = useNavigate();
    const [qnaList, setQnaList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지


    // const pageSize = 10; // 페이지당 아이템 수

    // const PaginationComponent = ({ qnaList, handleQnaClick }) => {
    //     const [currentPage, setCurrentPage] = useState(1);

    //     // qnaList로 이름 변경, 전체 페이지 수 계산
    //     const data = qnaList.data || []; // qnaList 안에 있는 data 배열을 사용
    //     const totalPages = Math.ceil(data.length / pageSize);

    //     // 페이지 변경 함수
    //     const handleChangePage = (page) => {
    //         setCurrentPage(page);
    //     };

    //     // 다음 페이지로 이동 함수
    //     const handleNextPage = () => {
    //         if (currentPage < totalPages) {
    //             setCurrentPage(currentPage + 1);
    //         }
    //     };

    //     // 이전 페이지로 이동 함수
    //     const handlePrevPage = () => {
    //         if (currentPage > 1) {
    //             setCurrentPage(currentPage - 1);
    //         }
    //     };





        //Qna 목록 조회
        async function fetchData() {
            try {
                const response = await fetchQnaList(currentPage);
                console.log("data안에는 무엇이 있나요", response.data);
                setQnaList(response.data); // 가져온 데이터를 상태에 설정


            } catch (error) {
            }
        }
        useEffect(() => {
            fetchData();
        }, []);

        //Qna 단일 조회 핸들러
        const handleRowClick = (qnaId) => {
            navigate(`/qna/${qnaId}`);
        }

       
      
       

        return (
            <>
                <Layout sidebar={<QnaSidebar />} >
                    <div className="ml-56 mt-12">
                        <Card className="h-full w-auto mx-4">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-8 flex items-center justify-between gap-8">
                                    <div>
                                        <Typography variant="h5" color="blue-gray">
                                            QnA
                                        </Typography>
                                    </div>
                                </div>
                            </CardHeader>
                            <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                    currentPage === 0 ? "text-neutral-500" : "text-neutral-600"
                  } transition-all duration-300 dark:text-neutral-400`}
                >
                  Previous
                </button>
                            <CardBody className="px-0">
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full text-left text-sm font-light">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4 ">#</th>
                                                            <th scope="col" className="px-6 py-4">제목</th>
                                                            <th scope="col" className="px-6 py-4">작성자</th>
                                                            <th scope="col" className="px-6 py-4">작성일</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {qnaList.map((qna, index) => (
                                                            <tr
                                                                onClick={() => handleRowClick(qna.id)}
                                                                key={[qna.id, index]}
                                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                                            >
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    {qna.title}
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    {qna.nickname}
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    {/* {qna.createdAt} */}
                                                                    {format(new Date(qna.createdAt), 'yyyy-MM-dd HH:mm')}
                                                                    {/* {format(parseISO(qna.createdAt), 'yyyy-MM-dd HH:mm')} */}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        </div>
                        </Layout>
                       <div>
                        <Link to={"/qna/post"}>
                                        <button className="text-gray-900 bg-white border border-gray-300 border-5 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-20 px-3 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 whitespace-nowrap">
                                            글 작성
                                        </button>
                                    </Link>
                                  
                                    </div>
            </>
        );
    }

                                  

                                   


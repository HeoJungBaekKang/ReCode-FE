import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import {
    IconButton,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import axios from "axios";

export default function MyStudyList() {

    const navigate = useNavigate();

    const { authData } = useContext(AuthContext);
    const { user_id } = useParams();

    const [currentPage, setCurrentPage] = useState(0)

    const [posts, setPost] = useState([]);

    const handleGet = async () => {
        try {
            await axios.get(`/api/v1/users/${user_id}/study-applications`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {
                    console.log("리데타", response.data);

                    setPost(response.data.data || []);

                    const code = response.data.code;

                    const sutdyId = response.data.data[0];

                    if (code === 1) {
                        console.log("가입한 스터디 목록 불러오기 성공");
                    } else {
                        console.log("가입한 스터디 목록 불러오기 실패")
                    }
                });
        } catch (error) {
            console.error("참가 중인 스터디 목록 조회 중 오류 : ", error);
            console.log(error.response);
        }
    }

    const modalPosition = {
        width: "70%",
        maxWidth: "38rem",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const [showModal, setShowModal] = useState(false);

    const TABLE_ROWS = [
        {
            name: (
                <>
                    1. 스터디 탈퇴 시, 해당 스터디 룸에서 제공되는 서비스에 접근하실 수
                    없습니다.
                    <br />
                    2. 탈퇴timers 시, 해당 스터디 룸에서의 모든 권한이 해제됩니다.
                    <br />
                    3. 탈퇴 후 동일한 스터디로 재가입이 가능하나 기존의 데이터와 연동되지
                    않습니다.
                    <br />
                    4. 탈퇴 버튼을 통해 탈퇴가 완료됩니다.
                </>
            ),
        },
    ];

    const [selectedPost, setSelectedPost] = useState(null);

    const handleWithdrawStudy = async (post) => {
        try {
            const response = await axios.post(
                `/api/v1/study/${post.id}/withdraw`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });

            const code = response.data.code;

            if (code === 1) {
                setShowModal(false);
                navigate(`/mypage/${authData.id}`, { replace: true });
            } else {
                alert("탈퇴 실패", response);
            }
        } catch (error) {
            console.log("탈퇴중 오류 발생", error);
        }
    }

    const chunkedPosts = chunk(posts, 9)

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className="bg-white py-24 sm:py-5">
            <div className="mx-auto max-w-9xl px-6 lg:px-8">
                <div className="mx-auto mt-10m gap-y-4 gap-x-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-3 grid-flow-row-dense">
                    {chunkedPosts && chunkedPosts[currentPage] && chunkedPosts[currentPage].map((post, index) => (
                        <article key={index} className="flex max-w-xl flex-col items-start justify-between border-2 border-gray-200 p-4 rounded-md">
                            <div className="flex items-center gap-x-4 text-xs">
                                <div className="text-gray-500">
                                    {post.study_name}
                                </div>
                                <div className={`text-xs px-2 py-1 rounded-full ${post.status === '거절됨' ? 'bg-red-400 text-white' :
                                    post.status === '대기중' ? 'bg-gray-400 text-white' :
                                        'bg-green-400 text-white'
                                    }`}>
                                    {post.status}
                                </div>
                                {post.status === '거절됨' && (
                                    <div className="flex justify-end flex-grow">
                                        <Tooltip content="Remove">
                                            <IconButton variant="text" onClick={() => {
                                                setSelectedPost(post);
                                                setShowModal(true);
                                            }}>
                                                <UserMinusIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-start text-sm">
                                {post.skillNames.map((skill, index) => (
                                    <span key={index} style={{ marginRight: '10px' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="group relative">
                                <h3 className={`mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 ${post.status === '거절됨' || post.status === '대기중' ? 'pointer-events-none' : ''}`}>
                                    {
                                        // 링크 활성화 여부를 status에 따라 결정
                                        post.status === '거절됨' || post.status === '대기중' ?
                                            (
                                                <span>{post.title}</span> // 클릭 불가능한 상태
                                            ) :
                                            (
                                                <a href={`/studyroom/${post.id}`}>
                                                    <span className="absolute inset-0" />
                                                    {post.title}
                                                </a>
                                            )
                                    }
                                </h3>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <nav aria-label="Page navigation example">
                        <ul className="list-style-none flex">
                            <li key="previous-button">
                                <button
                                    disabled={currentPage === 0}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === 0 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                                >
                                    Previous
                                </button>
                            </li>
                            {chunkedPosts.map((_, index) => (
                                <li key={`page-button-${index}`}>
                                    <button
                                        onClick={() => setCurrentPage(index)}
                                        className={`relative block rounded px-3 py-1.5 text-sm ${index === currentPage ? 'text-neutral-50 bg-blue-200' : 'text-neutral-600'} transition-all duration-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li key="next-button">
                                <button
                                    disabled={currentPage === chunkedPosts.length - 1}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === chunkedPosts.length - 1 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Modal */}
                <TEModal show={showModal} setShow={setShowModal}>
                    <TEModalDialog style={modalPosition}>
                        <TEModalContent>
                            <TEModalHeader>
                                <div>
                                    <Typography variant="h5" color="blue-gray">
                                        탈퇴 안내
                                    </Typography>
                                    <Typography color="gray" className="mt-2 w-80 font-normal">
                                        스터디 탈퇴에 대한 안내 사항입니다.
                                    </Typography>
                                </div>
                                <button
                                    type="button"
                                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    onClick={() => setShowModal(true)}
                                    aria-label="Close"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </TEModalHeader>
                            <TEModalBody>
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <tbody>
                                        {TABLE_ROWS.map(({ name }, index) => {
                                            const classes =
                                                index === TABLE_ROWS.length - 1
                                                    ? "p-4"
                                                    : "p-4 border-b border-blue-gray-50";
                                            return (
                                                <tr key={index}>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center">
                                                                    <hr className="flex-grow border-t border-gray-300" />
                                                                    <span className="px-3 text-gray-500">
                                                                        유의 사항
                                                                    </span>
                                                                    <hr className="flex-grow border-t border-gray-300" />
                                                                </div>
                                                                <br />
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {name}
                                                                </Typography>
                                                                <br />
                                                                <div className="flex items-center">
                                                                    <hr className="flex-grow border-t border-gray-300" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </TEModalBody>
                            <TEModalFooter>
                                <TERipple
                                    rippleColor="light"
                                    style={{ display: "flex", justifyContent: "flex-end" }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 whitespace-nowrap mr-2"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                        onClick={() => handleWithdrawStudy(selectedPost)}
                                    >
                                        탈퇴
                                    </button>
                                </TERipple>
                            </TEModalFooter>
                        </TEModalContent>
                    </TEModalDialog>
                </TEModal>
            </div>
        </div>
    )
}

function chunk(array, size) {
    const chunked_arr = []
    let copied = [...array]

    while (copied.length > 0) {
        chunked_arr.push(copied.splice(0, size))
    }

    return chunked_arr
}

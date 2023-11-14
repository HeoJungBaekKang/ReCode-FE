import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../Study/MultiSelect";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";

export default function StudyModify() {

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false); // 수정 모드를 위한 상태

    const handleEdit = () => {
        setIsEditing(true); // 수정 버튼 클릭 시 수정 모드로 전환
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: 수정된 데이터를 서버에 전송하는 코드 작성
        setIsEditing(false); // 수정 완료 후 수정 모드 종료
    };

    return (
        <>
            <StudyRoom_Sidebar />
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                </div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        스터디 기본 정보
                    </h2>
                </div>
                <form
                    action="#"
                    method="POST"
                    className="mx-auto mt-16 max-w-xl sm:mt-20"
                    onSubmit={handleSubmit}
                >
                    <div className="flex gap-x-3">
                        <div className="sm:col-span-2">
                            <div class="w-48">
                                <label
                                    htmlFor="max-num"
                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                >
                                    모집인원
                                </label>
                                {isEditing ? (
                                    <select
                                        id="max-num"
                                        name="max-num"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="1">1명</option>
                                        <option value="2">2명</option>
                                        <option value="3">3명</option>
                                        <option value="4">4명</option>
                                        <option value="5">5명</option>
                                        <option value="6">6명</option>
                                        <option value="7">7명</option>
                                        <option value="8">8명</option>
                                        <option value="9">9명</option>
                                        <option value="10">10명 이상</option>
                                    </select>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete="title"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            disabled={!isEditing}
                                            placeholder="1명"
                                        />
                                    </form>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="w-48">
                                <label
                                    htmlFor="skill"
                                    className="block text-sm font-semibold leading-6 text-gray-900"
                                >
                                    모집구분
                                </label>
                                {isEditing ? (
                                    <select
                                        id="skill"
                                        name="skill"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-"
                                    >
                                        <option value="1">백엔드</option>
                                        <option value="2">프론트엔드</option>
                                    </select>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete="title"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            disabled={!isEditing}
                                            placeholder="백엔드"
                                        />
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            스터디 시작 날짜
                        </label>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="date"
                                    name="start-date"
                                    id="start-date"
                                    autoComplete="start-date"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </form>
                        ) : (
                            <div className="mt-1">
                                <input
                                    type="title"
                                    name="title"
                                    id="title"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    disabled={!isEditing}
                                    placeholder="2023-08-25"
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="end-date"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            스터디 종료 날짜
                        </label>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="date"
                                    name="end-date"
                                    id="end-date"
                                    autoComplete="end-date"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </form>
                        ) : (
                            <div className="mt-1">
                                <input
                                    type="title"
                                    name="end-title"
                                    id="title"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    disabled={!isEditing}
                                    placeholder="2023-12-26"
                                />
                            </div>
                        )}
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="title"
                            className="block text-sm font-semibold leading-2 text-gray-900"
                        >
                            스터디 이름
                        </label>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </form>
                        ) : (
                            <div className="mt-2.5 mb-4">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    disabled={!isEditing}
                                    placeholder="Recode"
                                />
                            </div>
                        )}
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <MultiSelect></MultiSelect>
                            </form>
                        ) : (
                            <div className="mt-2">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        disabled={!isEditing}
                                        placeholder="Java SpringBoot Jpa"
                                    />
                                </form>
                            </div>
                        )}
                    </div>

                    <div className="sm:col-span-2 mt-2.5">
                        <label
                            htmlFor="title"
                            className="block text-sm font-semibold leading-3 text-gray-900"
                        >
                            제목
                        </label>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="카카오톡 클론 코딩 스터디"
                                />
                            </form>
                        ) : (
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    disabled={!isEditing}
                                    placeholder="카카오톡 클론 코딩 스터디"
                                />
                            </div>
                        )}
                    </div>
                    <div className="sm:col-span-2">
                        <div className="mt-2.5">
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <textarea
                                        name="discription"
                                        id="discription"
                                        rows={11}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={""}
                                        placeholder="카카오톡 클론 코딩으로 실력 함께 키우실 분 구합니다. MSA 전문가 적극 환영"
                                    />
                                </form>
                            ) : (
                                <textarea
                                    name="discription"
                                    id="discription"
                                    rows={11}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                    disabled={!isEditing}
                                    placeholder="카카오톡 클론 코딩으로 실력 함께 키우실 분 구합니다. MSA 전문가 적극 환영"
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flex gap-x-3">
                            <button
                                type="reset"
                                onClick={() => navigate('/studyroom/manage')}
                                className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                취소
                            </button>
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <button
                                        type="submit"
                                        className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        수정 완료
                                    </button>
                                </form>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    수정
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
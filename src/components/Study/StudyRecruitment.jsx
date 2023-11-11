import { useState } from "react";
import MultiSelect from "./MultiSelect";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StudyRecruitment() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          스터디 기본 정보를 입력해주세요
        </h2>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
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

              <select
                id="skill"
                name="skill"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-"
              >
                <option value="1">백엔드</option>
                <option value="2">프론트엔드</option>
              </select>
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
          <div className="mt-1">
            <input
              type="date"
              name="start-date"
              id="start-date"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            스터디 종료 날짜
          </label>
          <div className="mt-1">
            <input
              type="date"
              name="end-date"
              id="end-date"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-semibold leading-2 text-gray-900"
          >
            스터디 이름
          </label>
          <div className="mt-2.5 mb-4">
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <MultiSelect></MultiSelect>
        </div>

        <div className="sm:col-span-2 mt-2.5">
          <label
            htmlFor="title"
            className="block text-sm font-semibold leading-3 text-gray-900"
          >
            제목
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="mt-2.5">
            <textarea
              name="discription"
              id="discription"
              rows={11}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="flex gap-x-3">
            <button
              type="reset"
              className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              작성완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

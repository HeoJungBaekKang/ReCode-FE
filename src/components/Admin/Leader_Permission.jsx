import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import Pagination from "../Fix/Pagination";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import Search from "../Fix/Search";

export default function User_list() {
  const [isOpen, setIsOpen] = useState(false);

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
                          <button class="bg-red-500 hover:bg-red-700 text-white font-bold text-xs w-20 rounded">
                            {" "}
                            방출{" "}
                          </button>
                        </tr>

                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 pt-10">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">asdf</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            스터디원
                          </td>
                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs w-20 rounded">
                            {" "}
                            역할변경{" "}
                          </button>
                          <button class="bg-red-500 hover:bg-red-700 text-white font-bold text-xs w-20 rounded">
                            {" "}
                            방출{" "}
                          </button>
                        </tr>
                        <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 pt-10">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            3
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">dfhg</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            스터디원
                          </td>
                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs w-20 rounded">
                            {" "}
                            역할변경{" "}
                          </button>
                          <button class="bg-red-500 hover:bg-red-700 text-white font-bold text-xs w-20 rounded">
                            {" "}
                            방출{" "}
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

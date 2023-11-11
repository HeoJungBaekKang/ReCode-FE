import React from "react";
import QnaSidebar from "./QnaSidebar";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";


export default function Qna() {
    return (
        <>
            <QnaSidebar />
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
                    <CardBody className="px-0">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4">#</th>
                                                    <th scope="col" className="px-6 py-4">제목</th>
                                                    <th scope="col" className="px-6 py-4">작성자</th>
                                                    <th scope="col" className="px-6 py-4">작성일</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                                    <td className="whitespace-nowrap px-6 py-4">강의 자료 문의</td>
                                                    <td className="whitespace-nowrap px-6 py-4">ys**</td>
                                                    <td className="whitespace-nowrap px-6 py-4">2023-11-03</td>
                                                </tr>
                                                <tr
                                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                                    <td className="whitespace-nowrap px-6 py-4">SNOMED CT 매핑자료 스키마 제공 문의</td>
                                                    <td className="whitespace-nowrap px-6 py-4">m**</td>
                                                    <td className="whitespace-nowrap px-6 py-4">2023-10-31</td>
                                                </tr>
                                                <tr
                                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                                    <td className="whitespace-nowrap px-6 py-4">POSTOM ver.7.0 AFP에 관해 질문이 있습니다.</td>
                                                    <td className="whitespace-nowrap px-6 py-4">김**</td>
                                                    <td className="whitespace-nowrap px-6 py-4">2023-10-27</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
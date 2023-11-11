import React from "react";
import QnaSidebar from "./QnaSidebar";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";

export default function QnaPost() {
    return (
        <>
            <QnaSidebar />
            <div className="ml-56">
                <div className="ml-3 text-7xl">QnA</div>
                <br />
                <Card className="h-full w-auto mx-4">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div className="flex items-center gap-4 w-full">
                                <Typography variant="h5" color="blue-gray">
                                    제목
                                </Typography>
                                <input type="text" className="border-2 border-gray-300 p-2 rounded-md flex-grow" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <Typography color="gray" className="ml-5 mt-1 font-normal">
                                내용
                            </Typography>
                            <tbody>
                                <div className="ml-5 mr-5 sm:col-span-2">
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
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4 mr-5 space-x-4">
                            <button className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                            <button className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">등록</button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
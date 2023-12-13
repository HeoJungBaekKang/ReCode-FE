import React from "react";
import QnaSidebar from "../Qna/QnaSidebar";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";


export default function FaqPage() {
    return (

        <div className="ml-56 mt-12">
            <div className="lg:w-1/4 hidden lg:block">
                <QnaSidebar />
            </div>
            <Card className="h-full w-auto mx-4">

                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                FAQ - 자주 묻는 질문
                            </Typography>
                        </div>
                    </div>
                </CardHeader>

                <CardBody className="px-0">
                    <div className="flex flex-col">
                        <details className="p-4 rounded-lg">
                            <summary className="font-semibold">How to create Accordion (FAQ) in react ?</summary>
                            <div className="mt-3">
                                <p className="text-sm leading-6 text-gray-600">
                                    질문을 정해야한다.
                                </p>
                            </div>
                        </details>
                        <details className="p-4 rounded-lg">
                            <summary className="font-semibold">
                                How to use tailwind css 3 in react
                            </summary>
                            <div className="mt-3">
                                <p className="text-sm leading-6 text-gray-600">
                                    React with Tailwind CSS Faq Accordion 2
                                </p>
                            </div>
                        </details>
                        <details className="p-4 rounded-lg">
                            <summary className="font-semibold">
                                How to install Tailwind CSS 3 ?
                            </summary>
                            <div className="mt-3">
                                <p className="text-sm leading-6 text-gray-600">
                                    React with Tailwind CSS Faq Accordion 3
                                </p>
                            </div>
                        </details>
                        <details className="p-4 rounded-lg">
                            <summary className="font-semibold">
                                How to send feedback ?
                            </summary>
                            <div className="mt-3">
                                <p className="text-sm leading-6 text-gray-600">
                                    React with Tailwind CSS Faq Accordion 4
                                </p>
                            </div>
                        </details>
                    </div>
                </CardBody>


            </Card>

        </div>



    );
}
import React from "react";
import QnaSidebar from "../Qna/QnaSidebar";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


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
                    <summary className="font-semibold">사용하고자하는 기술스택이 목록에 없을 때에는 어떻게 해야할까요?</summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            Q&A 탭에서 기술 스택 추가 관련 문의글을 올려주시면 1~2일 안에 추가가될 수 있도록 하겠습니다.
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">
                        스터디 조장님이 활동을 하지 않으셔서 인원 관리가 되지 않을 때에는 어떻게 해야할까요?
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            관리자에게 채팅으로 문의 부탁드립니다.
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">
                        뱃지 등급을 올리려면 어떻게 해야할까요?
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            뱃지 등급에 대한 점수는 참여중인 스터디의 마지막날 스터디 참여인원에 대한 평가를 통해 반영됩니다.
                            0   ~ 200 : 씨앗 등급<br />
                            201 ~ 400 : 새싹 등급<br />
                            401 ~ 600 : 떡잎 등급<br />
                            601 ~ 800 : 꽃봉오리 등급<br />
                            801 ~ 1000: 만개한 꽃 등급
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">
                        참여할 수 있는 스터디 수의 제한이 있을까요?
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                        참여할 수 있는 스터디 수의 대한 제한사항은 없습니다. 하지만 스터디원을 생각하며 활동이 가능한 범위로 활동해주는 에티켓을 지켜주세요.
                        </p>
                    </div>
                </details>
            </div>
            </CardBody>
   

        </Card>
     
    </div>


  
    );
}
import React from "react";
import { useNavigate } from 'react-router-dom';
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import MypageSidebar from "./MypageSidebar";


const TABLE_ROWS = [
    {
        name: "아이디",
        data: "username",
    },
    {
        name: "닉네임",
        data: "nickname",
    },
    {
        name: "이메일",
        data: "email",
    },
    {
        hasTooltip: true, // 툴팁을 추가할 요소에 대한 플래그
    },
];

const TABLE_ROWS2 = [
    {
        name: "자소서",
        hasTooltip: true,
    },
];

const TABLE_ROWS3 = [
    {
        name: "*********",
        hasTooltip: true,
    },
];

const TABLE_ROWS4 = [
    {
        name: "탈퇴",
        hasTooltip: true,
    },
];

const Mypage_Myprofile = () => {

    const navigate = useNavigate();

    return (
        <>
            <MypageSidebar />
            <div className="ml-56 mt-12">
                <Card className="h-full w-auto mx-4">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    개인 정보
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    일부 정보가 서비스를 사용하는 다른 사용자에게 표시될 수 있습니다
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <tbody>
                                {TABLE_ROWS.map(({ name, data, hasTooltip }, index) => {
                                    const classes = index === TABLE_ROWS.length - 1
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {data}
                                                        </Typography>
                                                    </div>
                                                    {hasTooltip && (
                                                        <div className="flex items-center">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                개인정보 수정
                                                            </Typography>
                                                            <Tooltip content="Edit User">
                                                                <IconButton variant="text" onClick={() => navigate('/mypage/myprofile/modifyProfile')}>
                                                                    <PencilIcon className="h-4 w-4 " />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
                <br />
                <Card className="h-full w-auto mx-4">
                    <CardBody className="px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <tbody>
                                {TABLE_ROWS2.map(({ name }, index) => {
                                    const classes = index === TABLE_ROWS2.length - 1
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Write Essay">
                                                    <IconButton variant="text" onClick={() => navigate('/mypage/myprofile/essay')}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
                <br />
                <div className="flex gap-4 mx-4">
                    <div className="w-1/2">
                        <Card className="h-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-8 flex items-center justify-between gap-8">
                                    <div>
                                        <Typography variant="h5" color="blue-gray">
                                            보안 설정
                                        </Typography>
                                        <Typography variant="h6" color="gray" className="mt-1 font-normal">
                                            비밀번호
                                        </Typography>
                                        <Typography color="gray" className="mt-1 font-normal">
                                            일부 정보가 서비스를 사용하는 다른 사용자에게 표시될 수 있습니다
                                        </Typography>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-0">
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <tbody>
                                        {TABLE_ROWS3.map(({ name }, index) => {
                                            const classes = index === TABLE_ROWS3.length - 1
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";
                                            return (
                                                <tr key={index}>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {name}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Tooltip content="Edit Password">
                                                            <IconButton variant="text" onClick={() => navigate('/mypage/myprofile/changePassword')}>
                                                                <PencilIcon className="h-4 w-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="w-1/2 ">
                        <Card className="h-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-8 flex items-center justify-between gap-8">
                                    <div>
                                        <Typography variant="h5" color="blue-gray">
                                            계정 탈퇴
                                        </Typography>
                                        <Typography color="gray" className="mt-1 font-normal">
                                            Recode 사이트에 대한 탈퇴를 진행합니다.
                                        </Typography>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-0">
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <tbody>
                                        {TABLE_ROWS4.map(({ name }, index) => {
                                            const classes = index === TABLE_ROWS4.length - 1
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";
                                            return (
                                                <tr key={index}>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {name}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Tooltip content="Withdraw">
                                                            <IconButton variant="text" onClick={() => navigate('/mypage/myprofile/Withdraw')}>
                                                                <PencilIcon className="h-4 w-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Mypage_Myprofile;

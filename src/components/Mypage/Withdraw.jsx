import React, { useState } from "react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";

const TABLE_ROWS = [
    {
        name:
            <>
                1. 계정 탈퇴 시, ReCode 의 모든 서비스에서 탈퇴됩니다.<br />
                2. 탈퇴 시, ReCode 에서의 모든 권한이 해제됩니다.<br />
                3. 탈퇴 후 동일한 이메일로 재가입이 가능하나 기존의 데이터와 연동되지 않습니다.<br />
                4. 탈퇴 후 연동된 소셜 계정 정보도 사라지며 소셜 계정 로그인으로도 기존 계정 이용이 불가합니다.<br />
                5. 다음 버튼을 통해 탈퇴를 진행합니다.
            </>
    },
];

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
    justifyContent: "center"
}

const Withdraw = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex justify-center items-center mt-12">
                <Card className="h-full w-auto mx-4">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    탈퇴
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    스터디 탈퇴에 대한 안내 사항입니다.
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <tbody>
                                {TABLE_ROWS.map(({ name, hasTooltip, tooltipContent }, index) => {
                                    const classes = index === TABLE_ROWS.length - 1
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
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 w-20 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                취소
                            </button>
                            <TERipple rippleColor="white">
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-20 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue mr-2"
                                    onClick={() => setShowModal(true)}
                                >
                                    탈퇴
                                </button>
                            </TERipple>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Modal */}
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog style={modalPosition}>
                    <TEModalContent>
                        <TEModalHeader>
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                Recode
                            </h5>
                        </TEModalHeader>
                        <div className="mt-10 mb-10">
                        <TEModalBody>그동안 Recode 서비스를 이용해주셔서 감사드립니다.</TEModalBody>
                        </div>
                        <TEModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
                            <TERipple rippleColor="light">
                                <button
                                    type="button"
                                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    onClick={() => setShowModal(false)}
                                >
                                    확인
                                </button>
                            </TERipple>
                        </TEModalFooter>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </>
    );
};

export default Withdraw;

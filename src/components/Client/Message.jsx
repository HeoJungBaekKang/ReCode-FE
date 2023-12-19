import React, { useCallback } from "react";
import axios from "axios";

export default function Message() {

    const handleSendMessage = useCallback(async () => {
        try {
            const response = await axios.post("/api/send-sms", {
                phoneNumber: "+8201058802941",
                message: "Recode 스터디 신청에 승인되셨습니다. :)"
            });
        } catch (error) {
        }
    }, []);

    return (
        <button onClick={handleSendMessage}>메시지 보내기</button>
    );
}

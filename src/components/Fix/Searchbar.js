import React from 'react';
import { TEInput } from 'tw-elements-react';

export default function Searchbar() {
    return (
            <div className="relative mb-3 md:w-96 mx-auto">
                <TEInput
                    type="search"
                    label="검색어를 입력해주세요."
                ></TEInput>
            </div>
    );
}
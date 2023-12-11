
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="bg-white">
      <div className="flex items-center p-4 border-b">
        <ArrowLeftIcon className="text-gray-600" />
        <h1 className="flex-1 text-center font-semibold">대화상대 초대</h1>
        <span className="text-blue-600">3</span>
        <Button className="ml-2" variant="ghost">
          다음
        </Button>
      </div>
      <div className="flex items-center p-4 space-x-2 overflow-x-auto">
        <Avatar alt="코알라" src="/placeholder.svg?height=40&width=40" />
        <Avatar alt="강시규" src="/placeholder.svg?height=40&width=40" />
        <Avatar alt="강민혁" src="/placeholder.svg?height=40&width=40" />
      </div>
      <div className="p-4">
        <Input placeholder="이름(초성), 전화번호 검색" />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="강민혁" src="/placeholder.svg?height=40&width=40" />
            <span>강민혁</span>
          </div>
          <CheckIcon className="text-yellow-500" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="강시규" src="/placeholder.svg?height=40&width=40" />
            <span>강시규</span>
          </div>
          <CheckIcon className="text-yellow-500" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="코알라" src="/placeholder.svg?height=40&width=40" />
            <span>코알라처럼일잘하는 담당자 상호형</span>
          </div>
          <CheckIcon className="text-yellow-500" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="권소재" src="/placeholder.svg?height=40&width=40" />
            <span>권소재</span>
          </div>
          <CircleIcon className="text-gray-400" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="김광일" src="/placeholder.svg?height=40&width=40" />
            <span>김광일</span>
          </div>
          <CircleIcon className="text-gray-400" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="김기환" src="/placeholder.svg?height=40&width=40" />
            <span>김기환</span>
          </div>
          <CircleIcon className="text-gray-400" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="김민우" src="/placeholder.svg?height=40&width=40" />
            <span>김민우</span>
          </div>
          <CircleIcon className="text-gray-400" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="김민찬" src="/placeholder.svg?height=40&width=40" />
            <span>김민찬</span>
          </div>
          <CircleIcon className="text-gray-400" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar alt="김선우" src="/placeholder.svg?height=40&width=40" />
            <span>김선우</span>
          </div>
          <CircleIcon className="text-gray-400" />
        </div>
      </div>
    </div>
  )
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}


function CircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}
